import React from 'react';
import { Briefcase, MapPin, Building2 } from 'lucide-react';

const JobTicker: React.FC = () => {
  const jobs = [
    { title: 'Aşpaz', company: 'Hilton Baku', location: 'Bakı', salary: '1500 AZN' },
    { title: 'Barista', company: 'Starbucks', location: 'Bakı', salary: '900 AZN' },
    { title: 'Şef Köməkçisi', company: 'JW Marriott', location: 'Bakı', salary: '1200 AZN' },
    { title: 'Restoran Meneceri', company: 'Fairmont Baku', location: 'Bakı', salary: '2000 AZN' },
    { title: 'Konditer', company: 'Four Seasons', location: 'Bakı', salary: '1300 AZN' },
    { title: 'Aşpaz', company: 'Sheraton', location: 'Bakı', salary: '1400 AZN' },
    { title: 'F&B Supervisor', company: 'Hyatt Regency', location: 'Bakı', salary: '1800 AZN' },
    { title: 'Sous Chef', company: 'InterContinental', location: 'Bakı', salary: '2200 AZN' },
  ];

  // Double the jobs array for seamless loop
  const allJobs = [...jobs, ...jobs];

  return (
    <div className="bg-[#0A192F] py-4 overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 bg-[#C5A022] text-white text-xs font-bold px-4 py-2 flex items-center gap-2 z-10">
          <Briefcase size={14} />
          <span>AÇIQ VAKANSİYALAR</span>
        </div>

        {/* Ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee flex whitespace-nowrap">
            {allJobs.map((job, index) => (
              <div 
                key={index}
                className="inline-flex items-center gap-4 px-6 text-white/90 text-sm border-r border-white/10"
              >
                <span className="font-semibold text-[#C5A022]">{job.title}</span>
                <span className="flex items-center gap-1 text-white/60">
                  <Building2 size={12} />
                  {job.company}
                </span>
                <span className="flex items-center gap-1 text-white/60">
                  <MapPin size={12} />
                  {job.location}
                </span>
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-medium">
                  {job.salary}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default JobTicker;
