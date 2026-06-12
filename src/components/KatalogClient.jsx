import { useState, useEffect, useCallback } from 'react';
import PdfReader from './PdfReader';

// --- Categories ---
const CATEGORIES = [
  { id: 'semua', label: 'Semua', icon: 'fa-th-large' },
  { id: 'pengembangan-diri', label: 'Pengembangan Diri', icon: 'fa-brain' },
  { id: 'keterampilan', label: 'Keterampilan Kerja', icon: 'fa-tools' },
  { id: 'hukum', label: 'Hukum & Hak', icon: 'fa-gavel' },
  { id: 'kesehatan', label: 'Kesehatan Mental', icon: 'fa-heart' },
  { id: 'wirausaha', label: 'Wirausaha', icon: 'fa-rocket' },
  { id: 'pendidikan', label: 'Pendidikan', icon: 'fa-graduation-cap' },
  { id: 'kisah-inspiratif', label: 'Kisah Inspiratif', icon: 'fa-book-open' },
];

// --- Gradient presets ---
const GRADIENTS = [
  'from-amber-500 to-orange-600', 'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600', 'from-sky-500 to-blue-600',
  'from-orange-500 to-red-600', 'from-lime-500 to-green-600',
];

// --- Static fallback books (when no API) ---
const FALLBACK_BOOKS = [
  { id: 'f1', title: 'Belajar dari Kegagalan: Kisah 100 Pengusaha Sukses', author: 'Budi Santoso', year: '2022', category: 'pengembangan-diri', pdfUrl: '', coverId: '8292851', pages: '212', featured: 'Ya', aktif: 'Ya', gradientFrom: 'from-amber-500', gradientTo: 'to-orange-600' },
  { id: 'f2', title: 'Panduan Hukum bagi Masyarakat Indonesia', author: 'Dr. Rina Marlina, S.H.', year: '2021', category: 'hukum', pdfUrl: '', coverId: '8225261', pages: '180', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-emerald-500', gradientTo: 'to-teal-600' },
  { id: 'f3', title: 'Membangun Mental Baja: Bangkit dari Keterpurukan', author: 'Ahmad Fauzi', year: '2020', category: 'pengembangan-diri', pdfUrl: '', coverId: '10157403', pages: '198', featured: 'Ya', aktif: 'Ya', gradientFrom: 'from-blue-500', gradientTo: 'to-cyan-600' },
  { id: 'f4', title: 'Keterampilan Las & Kerja Logam untuk UMKM', author: 'Ir. Hendra Wijaya', year: '2023', category: 'keterampilan', pdfUrl: '', coverId: '10386659', pages: '156', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-violet-500', gradientTo: 'to-purple-600' },
  { id: 'f5', title: 'Dasar-Dasar Akuntansi untuk Pelaku UMKM', author: 'Dewi Kusuma, S.E.', year: '2022', category: 'wirausaha', pdfUrl: '', coverId: '8221093', pages: '224', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-rose-500', gradientTo: 'to-pink-600' },
  { id: 'f6', title: 'Hidup Sehat dengan Pola Makan Sederhana', author: 'dr. Santi Rahayu', year: '2021', category: 'kesehatan', pdfUrl: '', coverId: '10389132', pages: '142', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-sky-500', gradientTo: 'to-blue-600' },
  { id: 'f7', title: 'Belajar Bahasa Inggris dari Nol tanpa Guru', author: 'Michael Chen', year: '2023', category: 'pendidikan', pdfUrl: '', coverId: '8231997', pages: '178', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-lime-500', gradientTo: 'to-green-600' },
  { id: 'f8', title: 'Wirausaha dari Garasi: Kisah Nyata Anak Bangsa', author: 'Tim Buka Pintu', year: '2024', category: 'kisah-inspiratif', pdfUrl: '', coverId: '9255566', pages: '200', featured: 'Ya', aktif: 'Ya', gradientFrom: 'from-orange-500', gradientTo: 'to-red-600' },
  { id: 'f9', title: 'Self-Healing: Pemulihan Diri Tanpa Terapis', author: 'dr. Ratna Dewi', year: '2023', category: 'kesehatan', pdfUrl: '', coverId: '8228697', pages: '165', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-rose-400', gradientTo: 'to-pink-600' },
  { id: 'f10', title: 'Memulai Bisnis dari Kamar Kos', author: 'Rizky Ramadhan', year: '2022', category: 'wirausaha', pdfUrl: '', coverId: '10521230', pages: '188', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-violet-400', gradientTo: 'to-purple-600' },
  { id: 'f11', title: 'Kenali Hak Anda sebagai Warga Negara', author: 'Prof. Dr. Iwan Setiawan', year: '2021', category: 'hukum', pdfUrl: '', coverId: '8221997', pages: '210', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-emerald-400', gradientTo: 'to-teal-600' },
  { id: 'f12', title: 'Teknik Reparasi Elektronik untuk Pemula', author: 'Joko Susilo', year: '2023', category: 'keterampilan', pdfUrl: '', coverId: '10586322', pages: '134', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-blue-400', gradientTo: 'to-cyan-600' },
  { id: 'f13', title: 'Berani Gagal, Berani Sukses', author: 'Andi Tanoto', year: '2020', category: 'pengembangan-diri', pdfUrl: '', coverId: '8231451', pages: '176', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-amber-400', gradientTo: 'to-orange-600' },
  { id: 'f14', title: 'Matematika Dasar untuk Kehidupan Sehari-hari', author: 'Susiati, M.Pd.', year: '2022', category: 'pendidikan', pdfUrl: '', coverId: '10210798', pages: '152', featured: 'Tidak', aktif: 'Ya', gradientFrom: 'from-sky-400', gradientTo: 'to-blue-600' },
  { id: 'f15', title: 'Dari Penjara ke Pasar: Kisah Eks Narapidana', author: 'Koordinator Buka Pintu', year: '2024', category: 'kisah-inspiratif', pdfUrl: '', coverId: '9245891', pages: '230', featured: 'Ya', aktif: 'Ya', gradientFrom: 'from-lime-400', gradientTo: 'to-green-600' },
];

// --- Book Card ---
function BookCard({ book, index, onRead }) {
  const gradient = book.gradientFrom && book.gradientTo
    ? `${book.gradientFrom} ${book.gradientTo}`
    : GRADIENTS[index % GRADIENTS.length];

  const cat = CATEGORIES.find(c => c.id === book.category);
  const catLabel = cat?.label || book.category || '';

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
      onClick={() => onRead(book)}
    >
      <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center p-4 relative flex-shrink-0 overflow-hidden`}>
        {book.coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="text-center">
            <i className="fas fa-book text-white/80 text-4xl mb-2 block"></i>
            <p className="text-white/80 text-xs font-medium text-center leading-tight">{book.title}</p>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-gray-700">
          {catLabel}
        </span>
        {book.pdfUrl ? (
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-md">
              <i className="fas fa-check mr-1"></i>PDF
            </span>
          </div>
        ) : (
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 bg-amber-500 text-white rounded-full text-xs font-bold shadow-md">
              <i className="fas fa-lock mr-1"></i>Segera
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
              <i className="fas fa-book-open text-orange-600 text-2xl"></i>
            </div>
            <span className="text-white text-sm font-bold bg-white/90 px-4 py-1.5 rounded-full shadow">Baca Sekarang</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-gray-500 text-xs mb-0.5">{book.author}</p>
        <p className="text-xs text-gray-400 mb-3">{book.year}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400"><i className="fas fa-file-lines mr-1"></i>{book.pages} hal.</span>
          <span className="text-xs text-orange-500 font-semibold flex items-center gap-1">
            <i className="fas fa-eye"></i> Lihat
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Main Katalog Component ---
// apiUrl: Google Apps Script Web App URL (passed from katalog.astro)
export default function KatalogClient({ apiUrl }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('semua');
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [dataSource, setDataSource] = useState('loading');

  const isApiConfigured = apiUrl && !apiUrl.includes('YOUR_SCRIPT_ID');

  const doFetch = useCallback(() => {
    if (isApiConfigured) {
      fetch(`${apiUrl}?action=list`)
        .then(r => r.json())
        .then(data => {
          if (data.books && data.books.length > 0) {
            setBooks(data.books);
            setDataSource('api');
          } else {
            // API exists but empty — use localStorage demo books
            const localBooks = JSON.parse(localStorage.getItem('bp_books') || '[]');
            setBooks(localBooks.length > 0 ? localBooks : FALLBACK_BOOKS);
            setDataSource(localBooks.length > 0 ? 'local' : 'fallback');
          }
        })
        .catch(() => {
          const localBooks = JSON.parse(localStorage.getItem('bp_books') || '[]');
          setBooks(localBooks.length > 0 ? localBooks : FALLBACK_BOOKS);
          setDataSource(localBooks.length > 0 ? 'local' : 'fallback');
        })
        .finally(() => setLoading(false));
    } else {
      // No API — use localStorage demo books, fall back to static
      const localBooks = JSON.parse(localStorage.getItem('bp_books') || '[]');
      setBooks(localBooks.length > 0 ? localBooks : FALLBACK_BOOKS);
      setDataSource(localBooks.length > 0 ? 'local' : 'fallback');
      setLoading(false);
    }
  }, [isApiConfigured, apiUrl]);

  useEffect(() => { doFetch(); }, [doFetch]);

  // Refresh when window regains focus (user adds book in admin, switches back)
  useEffect(() => {
    const onFocus = () => doFetch();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [doFetch]);

  const filtered = books.filter(b => {
    const matchSearch = !search
      || (b.title || '').toLowerCase().includes(search.toLowerCase())
      || (b.author || '').toLowerCase().includes(search.toLowerCase());
    const catId = (b.category || '').toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    const matchCat = filterCat === 'semua' || catId.includes(filterCat);
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Sticky Filter Bar */}
      <section className="bg-white border-b border-gray-100 py-5 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari judul atau penulis..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 outline-none transition-all text-sm"
              />
            </div>
            {/* Data source badge */}
            {loading ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-500">
                <i className="fas fa-spinner fa-spin text-orange-500"></i>Memuat...
              </div>
            ) : (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border ${
                dataSource === 'api' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                dataSource === 'local' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                'bg-gray-50 border-gray-200 text-gray-500'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  dataSource === 'api' ? 'bg-emerald-500 animate-pulse' :
                  dataSource === 'local' ? 'bg-amber-500' : 'bg-gray-400'
                }`}></span>
                {dataSource === 'api' ? 'Data langsung dari Google Sheets' :
                 dataSource === 'local' ? 'Data dari Panel Admin' :
                 'Data statis — '}
                {dataSource !== 'api' && (
                  <a href="/admin" target="_blank" className="underline font-semibold text-orange-600 ml-1">Hubungkan API</a>
                )}
              </div>
            )}
          </div>
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCat(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  filterCat === cat.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`fas ${cat.icon} text-xs`}></i>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book Grid */}
      <section className="py-12 bg-warm-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Memuat katalog buku...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Buku tidak ditemukan</h3>
              <p className="text-gray-500">Coba kata kunci lain atau ubah kategori.</p>
              <button
                onClick={() => { setSearch(''); setFilterCat('semua'); }}
                className="mt-4 px-6 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold hover:bg-orange-200 transition"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-6">
                Menampilkan {filtered.length} dari {books.length} buku
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filtered.map((book, index) => (
                  <BookCard
                    key={(book.id || '') + index}
                    book={book}
                    index={index}
                    onRead={setSelectedBook}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* PDF Reader Modal */}
      {selectedBook && (
        <PdfReader
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  );
}
