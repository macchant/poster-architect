import { useState, useEffect, useRef } from 'react';

const PDFjsViewer = ({ url }) => {
  const pdfUrl = encodeURIComponent(url);
  return (
    <iframe
      src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${pdfUrl}`}
      className="w-full h-full border-0"
      title="PDF Reader"
      allow="fullscreen"
    />
  );
};

const GoogleDriveViewer = ({ url }) => {
  // Extract file ID from Google Drive URL
  const getFileId = (driveUrl) => {
    if (!driveUrl) return null;
    // https://drive.google.com/file/d/FILE_ID/view
    const match = driveUrl.match(/\/file\/d\/([^/?]+)/);
    if (match) return match[1];
    // https://drive.google.com/open?id=FILE_ID
    const openMatch = driveUrl.match(/[?&]id=([^&]+)/);
    if (openMatch) return openMatch[1];
    // Already just an ID
    if (/^[a-zA-Z0-9_-]{20,}$/.test(driveUrl)) return driveUrl;
    return null;
  };

  const fileId = getFileId(url);

  if (fileId) {
    return (
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        className="w-full h-full border-0"
        title="Google Drive PDF Viewer"
        allow="fullscreen; autoplay"
      />
    );
  }

  // Fallback to gview embed
  const embedUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  return (
    <iframe
      src={embedUrl}
      className="w-full h-full border-0"
      title="PDF Viewer"
      allow="fullscreen"
    />
  );
};

export default function PdfReader({ book, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'info'
  const modalRef = useRef(null);

  const pdfUrl = book?.pdfUrl;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 10, 200));
      if (e.key === '-') setZoom((z) => Math.max(z - 10, 50));
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setError(true);
    setLoading(false);
  };

  const gradientClass = book?.gradientFrom && book?.gradientTo
    ? `${book.gradientFrom} ${book.gradientTo}`
    : 'from-orange-500 to-green-600';

  const getEmbedUrl = () => {
    if (!pdfUrl) return null;
    const match = pdfUrl.match(/\/file\/d\/([^/?]+)/);
    if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
    const openMatch = pdfUrl.match(/[?&]id=([^&]+)/);
    if (openMatch) return `https://drive.google.com/file/d/${openMatch[1]}/preview`;
    return null;
  };

  const embedUrl = getEmbedUrl();
  const isGoogleDrive = pdfUrl && (pdfUrl.includes('drive.google.com') || pdfUrl.includes('docs.google.com'));

  return (
    <div
      className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-sm flex flex-col"
      ref={modalRef}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between gap-4 flex-shrink-0">
        {/* Left: Book info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <i className="fas fa-book text-white text-sm"></i>
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-bold text-sm leading-tight truncate max-w-[200px]">{book?.title || 'Buku'}</h2>
            <p className="text-gray-400 text-xs">{book?.author}</p>
          </div>
        </div>

        {/* Center: Tab switcher */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'pdf' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
            }`}>
            <i className="fas fa-book-reader mr-1"></i>Baca
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'info' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
            }`}>
            <i className="fas fa-info-circle mr-1"></i>Info
          </button>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="hidden sm:flex items-center gap-1 bg-gray-800 rounded-xl px-2 py-1">
            <button onClick={() => setZoom((z) => Math.max(z - 10, 50))}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition">
              <i className="fas fa-minus text-xs"></i>
            </button>
            <span className="text-white text-xs font-mono w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(z + 10, 200))}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition">
              <i className="fas fa-plus text-xs"></i>
            </button>
          </div>

          {/* Open external */}
          {pdfUrl && pdfUrl !== '#' && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-gray-400 hover:text-white text-xs rounded-lg hover:bg-gray-700 transition">
              <i className="fas fa-external-link-alt"></i>
              <span className="hidden md:inline">Buka</span>
            </a>
          )}

          {/* Close */}
          <button onClick={onClose}
            className="w-9 h-9 flex items-center justify-center bg-gray-800 text-gray-400 hover:text-white rounded-xl hover:bg-gray-700 transition"
            title="Tutup (Esc)">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex min-h-0">
        {activeTab === 'pdf' ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/80">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400 text-sm">Memuat dokumen...</p>
                  <p className="text-gray-600 text-xs mt-1">Pastikan tautan PDF bersifat publik</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {error ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-exclamation-triangle text-amber-400 text-3xl"></i>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">Tidak dapat memuat PDF</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Pastikan file PDF di Google Drive设置为 publik ("Semua orang dengan tautan").
                    Atau coba buka langsung di tab baru.
                  </p>
                  <div className="space-y-3">
                    {pdfUrl && pdfUrl !== '#' && (
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all">
                        <i className="fas fa-external-link-alt"></i>
                        Buka di Tab Baru
                      </a>
                    )}
                    <button onClick={() => { setError(false); setLoading(true); }}
                      className="block w-full px-6 py-3 border border-gray-600 text-gray-400 font-medium rounded-xl hover:bg-gray-800 transition-all">
                      <i className="fas fa-redo mr-2"></i>Coba Lagi
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex-1 relative min-h-0"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}
              >
                {isGoogleDrive && embedUrl ? (
                  <iframe
                    key={pdfUrl}
                    src={embedUrl}
                    className="w-full h-full border-0"
                    title={`Baca: ${book?.title}`}
                    allow="fullscreen; autoplay"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                  />
                ) : pdfUrl && pdfUrl !== '#' ? (
                  <PDFjsViewer url={pdfUrl} />
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-lock text-gray-500 text-3xl"></i>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-3">PDF Belum Tersedia</h3>
                      <p className="text-gray-400 text-sm mb-6 max-w-sm">
                        Buku ini belum memiliki tautan PDF. Hubungi admin untuk menambahkan file.
                      </p>
                      <a href="/admin" target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all">
                        <i className="fas fa-cog"></i>
                        Kelola di Panel Admin
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Info Tab */
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-lg mx-auto space-y-6">

              {/* Book Cover */}
              <div className={`h-48 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                {book?.coverId ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                    alt={book?.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <i className="fas fa-book text-white/60 text-5xl"></i>
                )}
              </div>

              {/* Info Grid */}
              <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-bold text-lg">{book?.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">Penulis</p>
                    <p className="text-white text-sm font-semibold">{book?.author || '-'}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">Tahun</p>
                    <p className="text-white text-sm font-semibold">{book?.year || '-'}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">Kategori</p>
                    <p className="text-white text-sm font-semibold">{book?.category || '-'}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">Halaman</p>
                    <p className="text-white text-sm font-semibold">{book?.pages || '-'} halaman</p>
                  </div>
                </div>

                {/* PDF Status */}
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-xl">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    pdfUrl && pdfUrl !== '#' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                  }`}>
                    <i className={`fas ${pdfUrl && pdfUrl !== '#' ? 'fa-check-circle text-emerald-400' : 'fa-clock text-amber-400'} text-lg`}></i>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {pdfUrl && pdfUrl !== '#' ? 'PDF Tersedia' : 'PDF Belum Diupload'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {pdfUrl && pdfUrl !== '#' ? 'File siap dibaca' : 'Hubungi admin untuk menambahkan'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {pdfUrl && pdfUrl !== '#' && (
                  <div className="flex gap-3">
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 py-3 bg-orange-600 text-white text-center font-semibold rounded-xl hover:bg-orange-700 transition-all text-sm">
                      <i className="fas fa-external-link-alt mr-2"></i>Buka PDF Langsung
                    </a>
                  </div>
                )}
              </div>

              {/* Help */}
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-2xl p-5">
                <h4 className="text-blue-300 font-bold text-sm mb-3 flex items-center gap-2">
                  <i className="fas fa-lightbulb"></i> Tips Membaca
                </h4>
                <ul className="space-y-2 text-sm text-blue-200/70">
                  <li>• Tekan <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">+</kbd> / <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">-</kbd> untuk zoom</li>
                  <li>• Tekan <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Esc</kbd> untuk menutup</li>
                  <li>• Pastikan tautan PDF bersifat "Publik" di Google Drive</li>
                  <li>• Untuk pengalaman terbaik, gunakan browser Chrome</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}