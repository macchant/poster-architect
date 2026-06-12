import BookCard from './BookCard';

export default function BookGrid({ books }) {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-search text-brand-400 text-2xl"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Buku tidak ditemukan</h3>
        <p className="text-gray-500">Coba kata kunci lain atau ubah kategori.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {books.map((book, index) => (
        <BookCard key={book.key || index} book={book} index={index} />
      ))}
    </div>
  );
}