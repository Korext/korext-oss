export default async function RadarEmbedPage({ params }) {
  const { chart } = await params;
  const title = chart.replace(/-/g, ' ');

  return (
    <div className="w-full h-screen flex flex-col bg-[#0d0e1a] font-sans">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h3 className="text-lg font-bold mb-4 capitalize text-white/80">{title}</h3>
        <div className="w-full h-full flex items-center justify-center border border-white/5 rounded-lg border-dashed text-white/30 text-sm">
          Chart: {title}
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-3 border-t border-white/[0.06] text-[11px] text-white/50">
        <span>Source: <a href="https://oss.korext.com/radar" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">AI Code Radar, Korext Open Source</a></span>
        <span>Data: CC BY 4.0</span>
      </div>
    </div>
  );
}
