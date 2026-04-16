/**
 * Multi-backend storage abstraction for the Attestation Registry.
 *
 * All four backends implement the same interface:
 *   get(key) -> value or null
 *   put(key, value) -> boolean
 *   list(prefix) -> string[]
 *   delete(key) -> boolean
 *
 * Key structure:
 *   registry/{ecosystem}/{name}/{version}/attestation.yaml
 *   registry/{ecosystem}/{name}/{version}/attestation.scanner.yaml
 *   registry/{ecosystem}/{name}/latest.yaml
 *   registry/{ecosystem}/{name}/index.yaml
 */

const fs = require('fs');
const path = require('path');

// ---- Cloud Storage Backend ----
class CloudStorageBackend {
  constructor() {
    this.bucket = process.env.STORAGE_BUCKET || 'korext-oss-registry';
  }

  async get(key) {
    try {
      const { Storage } = require('@google-cloud/storage');
      const storage = new Storage();
      const file = storage.bucket(this.bucket).file(key);
      const [exists] = await file.exists();
      if (!exists) return null;
      const [content] = await file.download();
      return content.toString('utf8');
    } catch (e) {
      return null;
    }
  }

  async put(key, value) {
    try {
      const { Storage } = require('@google-cloud/storage');
      const storage = new Storage();
      const file = storage.bucket(this.bucket).file(key);
      await file.save(value, { contentType: 'text/yaml' });
      return true;
    } catch (e) {
      return false;
    }
  }

  async list(prefix) {
    try {
      const { Storage } = require('@google-cloud/storage');
      const storage = new Storage();
      const [files] = await storage.bucket(this.bucket).getFiles({ prefix });
      return files.map(f => f.name);
    } catch (e) {
      return [];
    }
  }

  async delete(key) {
    try {
      const { Storage } = require('@google-cloud/storage');
      const storage = new Storage();
      await storage.bucket(this.bucket).file(key).delete();
      return true;
    } catch (e) {
      return false;
    }
  }
}

// ---- S3 Backend ----
class S3Backend {
  constructor() {
    this.bucket = process.env.STORAGE_BUCKET || 'korext-oss-registry';
    this.region = process.env.AWS_REGION || 'us-east-1';
  }

  _getClient() {
    const { S3Client } = require('@aws-sdk/client-s3');
    return new S3Client({ region: this.region });
  }

  async get(key) {
    try {
      const { GetObjectCommand } = require('@aws-sdk/client-s3');
      const client = this._getClient();
      const res = await client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
      return await res.Body.transformToString('utf-8');
    } catch (e) {
      return null;
    }
  }

  async put(key, value) {
    try {
      const { PutObjectCommand } = require('@aws-sdk/client-s3');
      const client = this._getClient();
      await client.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: value, ContentType: 'text/yaml' }));
      return true;
    } catch (e) {
      return false;
    }
  }

  async list(prefix) {
    try {
      const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
      const client = this._getClient();
      const res = await client.send(new ListObjectsV2Command({ Bucket: this.bucket, Prefix: prefix }));
      return (res.Contents || []).map(obj => obj.Key);
    } catch (e) {
      return [];
    }
  }

  async delete(key) {
    try {
      const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
      const client = this._getClient();
      await client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
      return true;
    } catch (e) {
      return false;
    }
  }
}

// ---- Azure Blob Backend ----
class AzureBackend {
  constructor() {
    this.containerName = process.env.STORAGE_BUCKET || 'korext-oss-registry';
    this.connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
  }

  _getContainer() {
    const { BlobServiceClient } = require('@azure/storage-blob');
    const blobService = BlobServiceClient.fromConnectionString(this.connectionString);
    return blobService.getContainerClient(this.containerName);
  }

  async get(key) {
    try {
      const container = this._getContainer();
      const blob = container.getBlobClient(key);
      const buffer = await blob.downloadToBuffer();
      return buffer.toString('utf8');
    } catch (e) {
      return null;
    }
  }

  async put(key, value) {
    try {
      const container = this._getContainer();
      const blockBlob = container.getBlockBlobClient(key);
      await blockBlob.upload(value, Buffer.byteLength(value), {
        blobHTTPHeaders: { blobContentType: 'text/yaml' }
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async list(prefix) {
    try {
      const container = this._getContainer();
      const results = [];
      for await (const blob of container.listBlobsFlat({ prefix })) {
        results.push(blob.name);
      }
      return results;
    } catch (e) {
      return [];
    }
  }

  async delete(key) {
    try {
      const container = this._getContainer();
      await container.deleteBlob(key);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// ---- Local File Backend ----
class LocalFileBackend {
  constructor() {
    this.basePath = process.env.STORAGE_BUCKET || path.join(process.cwd(), '.registry-data');
  }

  _resolvePath(key) {
    return path.join(this.basePath, ...key.split('/'));
  }

  async get(key) {
    try {
      const filePath = this._resolvePath(key);
      if (!fs.existsSync(filePath)) return null;
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      return null;
    }
  }

  async put(key, value) {
    try {
      const filePath = this._resolvePath(key);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  async list(prefix) {
    try {
      const dirPath = this._resolvePath(prefix);
      if (!fs.existsSync(dirPath)) return [];
      const results = [];
      const walk = (dir, base) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const rel = path.join(base, entry.name);
          if (entry.isDirectory()) walk(path.join(dir, entry.name), rel);
          else results.push(prefix + '/' + rel);
        }
      };
      walk(dirPath, '');
      return results;
    } catch (e) {
      return [];
    }
  }

  async delete(key) {
    try {
      const filePath = this._resolvePath(key);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return true;
    } catch (e) {
      return false;
    }
  }
}

function getStorageBackend() {
  switch (process.env.STORAGE_BACKEND) {
    case 's3': return new S3Backend();
    case 'azure': return new AzureBackend();
    case 'local': return new LocalFileBackend();
    default: return new CloudStorageBackend();
  }
}

module.exports = {
  CloudStorageBackend,
  S3Backend,
  AzureBackend,
  LocalFileBackend,
  getStorageBackend
};
