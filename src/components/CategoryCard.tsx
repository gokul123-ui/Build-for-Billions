import React from 'react';
import { CategoryInfo, Language } from '../types';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  lang: Language;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, lang, onClick }) => {
  // Dynamically resolve icon component
  const IconComponent = (LucideIcons as any)[category.iconName] || LucideIcons.HelpCircle;

  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 hover:bg-slate-850 transition-all duration-300 shadow-md group cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
          <IconComponent className="w-6 h-6 stroke-[2]" />
        </div>
        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
          {category.name[lang] || category.name.en}
        </h4>
        <p className="text-xs text-amber-500/90 font-medium mb-3">
          {category.department[lang] || category.department.en}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {category.description[lang] || category.description.en}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-amber-400 font-semibold">
        <span>File Grievance</span>
        <LucideIcons.ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
