import React from 'react';

const Card = ({ title, children, className }) => (
    <div className={`p-5 glass-panel h-full flex flex-col hover:border-white/20 transition-colors ${className}`}>
        {title && <h3 className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider pl-1">{title}</h3>}
        <div className="flex-1 min-h-0 relative z-10">{children}</div>
    </div>
);

export const MapView = () => (
    <Card className="col-span-2 row-span-2 min-h-[300px] overflow-hidden !p-0 relative group border-0">
        <div className="absolute inset-0 bg-[#0f1014] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            {/* Pseudo Map Grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.2 }}></div>
            <span className="text-zinc-500 font-light tracking-widest uppercase text-sm border border-zinc-700 px-4 py-2 rounded-full backdrop-blur-md">Bali, Indonesia</span>
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-lg shadow-lg text-xs space-y-1 z-20">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-zinc-300">Traffic: Smooth</span>
            </div>
        </div>
    </Card>
);

export const BudgetBreakdown = () => (
    <Card title="Trip Budget">
        <div className="flex items-center justify-center h-full relative">
            <div className="w-32 h-32 rounded-full border-[12px] border-white/5 border-t-indigo-500 border-r-indigo-400 rotate-45 relative shadow-inner">
                <div className="absolute inset-0 flex flex-col items-center justify-center -rotate-45">
                    <span className="text-2xl font-bold text-white">$1.2k</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Total Est.</span>
                </div>
            </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-500">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Flights</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-white/20"></div> Hotel</div>
        </div>
    </Card>
);

export const WeatherWidget = () => (
    <Card title="Bali Weather">
        <div className="flex items-center justify-between h-full px-2">
            <div className="flex flex-col">
                <span className="text-4xl font-light text-white">82°</span>
                <span className="text-sm text-zinc-400">Partly Cloudy</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            </div>
        </div>
        <div className="mt-4 flex justify-between text-[10px] text-zinc-500 uppercase tracking-wider">
            <div>Hum: 65%</div>
            <div>UV: High</div>
            <div>Wind: 10mph</div>
        </div>
    </Card>
);

export const HotelCards = () => (
    <Card title="Suggested Stays" className="col-span-2">
        <div className="grid grid-cols-2 gap-3 h-full">
            {['Amankila Resort', 'Potato Head Suites'].map((hotel, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-zinc-800 rounded-lg flex-shrink-0"></div>
                    <div>
                        <h4 className="font-medium text-sm text-zinc-200 group-hover:text-white transition-colors">{hotel}</h4>
                        <div className="flex text-yellow-500/80 text-[10px] gap-0.5 mt-1">★★★★★</div>
                        <p className="text-[10px] text-zinc-500 mt-1">$240 / night</p>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

export const FlightOptions = () => (
    <Card title="Best Flights">
        <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer">
                <div className="flex flex-col">
                    <span className="font-bold text-white">10:45 AM</span>
                    <span className="text-xs text-zinc-500">JFK → DPS</span>
                </div>
                <div className="h-[1px] flex-1 bg-white/10 mx-4 relative top-1">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#141419] px-2 text-[10px] text-zinc-500 rounded-full border border-white/5">19h 20m</div>
                </div>
                <span className="font-semibold text-indigo-400">$850</span>
            </div>
        </div>
    </Card>
);
