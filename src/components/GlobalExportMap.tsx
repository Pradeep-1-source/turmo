'use client';

import React from 'react';
import { Globe2, Navigation, Ship, Plane } from 'lucide-react';

interface GlobalExportMapProps {
  title?: string;
  description?: string;
}

export default function GlobalExportMap({
  title = 'From India to Global Markets',
  description = 'Connecting fertile Indian agricultural regions to international distributors, food manufacturers, and cosmetic formulators across the globe.',
}: GlobalExportMapProps) {
  const hubs = [
    { name: 'India (Origin / Hub)', coords: 'Erode, Tamil Nadu', role: 'Farm Harvest & Processing HQ', isOrigin: true },
    { name: 'Middle East & GCC', coords: 'Dubai & Jebel Ali Ports', role: 'Commercial Food & Spices Import' },
    { name: 'Southeast Asia', coords: 'Singapore & Port Klang', role: 'Culinary & Superfood Blending' },
    { name: 'Europe & UK', coords: 'Rotterdam & Felixstowe', role: 'Clean-Label Organic Formulations' },
    { name: 'Americas', coords: 'East & West Coast Gateways', role: 'Nutraceutical & Bulk Ingredients' },
  ];

  return (
    <section className="py-24 bg-navy-deep relative overflow-hidden border-t border-navy-border/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-green/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Globe2 className="w-3.5 h-3.5 text-brand-green" />
            Global Trade Corridors
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Global Connection Visualization */}
        <div className="relative rounded-3xl bg-white border border-stone-200 p-6 sm:p-12 overflow-hidden shadow-md">
          {/* SVG Trade Route Canvas */}
          <div className="relative w-full aspect-[2/1] min-h-[300px] sm:min-h-[420px] rounded-2xl bg-[#FAF8F5] border border-stone-200 p-6 flex flex-col justify-between overflow-hidden">
            {/* World Grid Lines */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B05D41_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* SVG Connecting Curves */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Origin Point: India (approx center right: 580, 260) */}
              <circle cx="580" cy="260" r="8" fill="#B05D41" className="animate-ping" opacity="0.4" />
              <circle cx="580" cy="260" r="5" fill="#B05D41" />

              {/* Route to Middle East (460, 220) */}
              <path
                d="M580 260 Q 510 200 460 220"
                stroke="#B05D41"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-connection-line"
                opacity="0.8"
              />
              <circle cx="460" cy="220" r="4" fill="#B05D41" />

              {/* Route to Europe (360, 150) */}
              <path
                d="M580 260 Q 450 120 360 150"
                stroke="#B05D41"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-connection-line"
                opacity="0.7"
              />
              <circle cx="360" cy="150" r="4" fill="#B05D41" />

              {/* Route to Southeast Asia (720, 290) */}
              <path
                d="M580 260 Q 650 310 720 290"
                stroke="#B05D41"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-connection-line"
                opacity="0.8"
              />
              <circle cx="720" cy="290" r="4" fill="#B05D41" />

              {/* Route to Americas (180, 200) */}
              <path
                d="M580 260 Q 320 80 180 200"
                stroke="#B05D41"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="animate-connection-line"
                opacity="0.6"
              />
              <circle cx="180" cy="200" r="4" fill="#B05D41" />
            </svg>

            {/* Top Status */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Active Ocean & Air Corridors
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5 text-brand-green" /> FCL & LCL Ocean
                </span>
                <span className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-brand-green" /> Air Cargo Samples
                </span>
              </div>
            </div>

            {/* Origin Callout */}
            <div className="relative z-10 self-center my-4 sm:my-auto p-4 rounded-2xl bg-white/95 border border-stone-200 shadow-md max-w-sm text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-green block">
                Primary Origin & Port Dispatch
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-stone-900 mt-0.5">
                Erode, Tamil Nadu ➔ Chennai / Tuticorin Ports
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1">
                Phytosanitary inspection, customs clearance, and global bill of lading logistics.
              </p>
            </div>

            {/* Hubs Grid Footer */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-4 border-t border-stone-200">
              {hubs.slice(1).map((hub, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm">
                  <p className="text-xs font-bold text-stone-900 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-brand-green shrink-0" />
                    <span>{hub.name}</span>
                  </p>
                  <p className="text-[11px] text-stone-500 truncate">{hub.coords}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
