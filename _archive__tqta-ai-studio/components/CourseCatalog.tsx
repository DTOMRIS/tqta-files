
import React, { useState } from 'react';
import { Clock, Award, ChevronRight, Filter } from 'lucide-react';
import { COURSES, GOLD, TEAL_BG } from '../constants';

const CourseCatalog: React.FC = () => {
  const [filter, setFilter] = useState<string>('Hamısı');
  const categories = ['Hamısı', 'Kulinariya', 'Turizm', 'İdarəetmə'];

  const filteredCourses = filter === 'Hamısı' 
    ? COURSES 
    : COURSES.filter(c => c.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#0A192F] mb-4">TQTA Təhsil Proqramları</h2>
        <div className="w-24 h-1 bg-[#C5A022] mx-auto mb-8"></div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${filter === cat ? 'bg-[#0A192F] text-white border-[#0A192F]' : 'bg-white text-slate-500 border-slate-200 hover:border-[#C5A022]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 flex flex-col">
            <div className="relative h-60 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className={`absolute top-4 left-4 ${TEAL_BG} text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
                {course.category}
              </div>
            </div>

            <div className="p-8 flex-grow">
              <h3 className="text-xl font-bold text-[#0A192F] mb-3 group-hover:text-[#C5A022] transition-colors min-h-[3rem]">
                {course.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between text-slate-400 text-xs mb-8 pt-6 border-t border-slate-50">
                <div className="flex items-center"><Clock size={16} className="mr-2 text-[#C5A022]" /><span>{course.duration}</span></div>
                <div className="flex items-center"><Award size={16} className="mr-2 text-[#0097A7]" /><span>{course.certification}</span></div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-[#0A192F] text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center">
                  Qeydiyyatdan Keç <ChevronRight size={18} className="ml-1" />
                </button>
                <button className="w-full py-2.5 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:border-[#C5A022] hover:text-[#C5A022] transition-all">
                  Syllabus Yüklə
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
