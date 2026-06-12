import { useState } from 'react';

const categories = [
  { id: 'semua', label: 'Semua', icon: 'fa-th-large', color: 'gray' },
  { id: 'pengembangan-diri', label: 'Pengembangan Diri', icon: 'fa-brain', color: 'amber' },
  { id: 'keterampilan', label: 'Keterampilan Kerja', icon: 'fa-tools', color: 'blue' },
  { id: 'hukum', label: 'Hukum & Hak', icon: 'fa-gavel', color: 'emerald' },
  { id: 'kesehatan', label: 'Kesehatan Mental', icon: 'fa-heart', color: 'rose' },
  { id: 'wirausaha', label: 'Wirausaha', icon: 'fa-rocket', color: 'violet' },
  { id: 'pendidikan', label: 'Pendidikan', icon: 'fa-graduation-cap', color: 'sky' },
  { id: 'kisah-inspiratif', label: 'Kisah Inspiratif', icon: 'fa-book-open', color: 'orange' },
];

export default function SearchFilter({ onSearch, onCategoryChange }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('semua');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    onCategoryChange?.(catId);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul buku, penulis, atau topik..."
          className="w-full pl-14 pr-14 py-4 rounded-2xl border-2 border-brand-100
                     bg-white text-gray-900 text-base shadow-sm
                     focus:border-brand-400 focus:ring-4 focus:ring-brand-100 outline-none
                     placeholder:text-gray-400 transition-all"
        />
        <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-brand-400 text-lg"></i>
        <button type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-brand-600 text-white rounded-xl font-semibold text-sm
                     hover:bg-brand-700 transition-colors">
          Cari
        </button>
      </form>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const colorMap = {
            gray: isActive ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50',
            amber: isActive ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:border-amber-300 hover:bg-amber-50',
            blue: isActive ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50',
            emerald: isActive ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50',
            rose: isActive ? 'bg-rose-500 text-white' : 'bg-white text-rose-700 border border-rose-200 hover:border-rose-300 hover:bg-rose-50',
            violet: isActive ? 'bg-violet-600 text-white' : 'bg-white text-violet-700 border border-violet-200 hover:border-violet-300 hover:bg-violet-50',
            sky: isActive ? 'bg-sky-600 text-white' : 'bg-white text-sky-700 border border-sky-200 hover:border-sky-300 hover:bg-sky-50',
            orange: isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-700 border border-orange-200 hover:border-orange-300 hover:bg-orange-50',
          };
          return (
            <button key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${colorMap[cat.color]}`}>
              <i className={`fas ${cat.icon} text-xs`}></i>
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}