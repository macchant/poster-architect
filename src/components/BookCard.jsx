import { useState } from 'react';

const COVER_COLORS = [
  'from-amber-500 to-orange-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-orange-500 to-red-600',
  'from-lime-500 to-green-600',
];

const CATEGORY_COLORS = {
  'pengembangan-diri': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  'keterampilan': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'hukum': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'kesehatan': { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
  'wirausaha': { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
  'pendidikan': { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200' },
  'kisah-inspiratif': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
};

const CATEGORY_LABELS = {
  'pengembangan-diri': 'Pengembangan Diri',
  'keterampilan': 'Keterampilan Kerja',
  'hukum': 'Hukum & Hak',
  'kesehatan': 'Kesehatan Mental',
  'wirausaha': 'Wirausaha',
  'pendidikan': 'Pendidikan',
  'kisah-inspiratif': 'Kisah Inspiratif',
};

export default function BookCard({ book, index }) {
  const [imgError, setImgError] = useState(false);
  const [saved, setSaved] = useState(false);

  const colorClass = COVER_COLORS[index % COVER_COLORS.length];
  const cat = book.category ? CATEGORY_COLORS[book.category] : null;
  const catLabel = book.category ? (CATEGORY_LABELS[book.category] || book.category) : null;

  const coverUrl = !imgError && book.cover
    ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`
    : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm
                    hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

      {/* Cover */}
      <div className={`relative h-48 bg-gradient-to-br ${colorClass} flex items-center justify-center overflow-hidden flex-shrink-0`}>
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="text-center p-4">
            <i className="fas fa-book text-white/80 text-4xl mb-2 block"></i>
            <p className="text-white/80 text-xs font-medium text-center leading-tight">{book.title}</p>
          </div>
        )}

        {/* Category badge */}
        {catLabel && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text} border ${cat.border}`}>
            {catLabel}
          </div>
        )}

        {/* Save button */}
        <button
          onClick={() => setSaved(!saved)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all
            ${saved ? 'bg-rose-500 text-white' : 'bg-black/30 text-white hover:bg-rose-500'}`}
          aria-label="Simpan buku">
          <i className={`${saved ? 'fas' : 'far'} fa-heart text-xs`}></i>
        </button>

        {/* Read badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-brand-700">
            <i className="fas fa-eye mr-1"></i> Baca Gratis
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-brand-700 transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm mb-1">{book.author}</p>
        <p className="text-xs text-gray-400 mb-4">{book.year}</p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <i className="fas fa-file-lines"></i>
            <span>{book.pages || '—'} halaman</span>
          </div>
          <a href={book.readUrl || '#'} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-full
                        hover:bg-brand-700 transition-colors">
            <i className="fas fa-book-reader"></i>
            Baca
          </a>
        </div>
      </div>
    </div>
  );
}