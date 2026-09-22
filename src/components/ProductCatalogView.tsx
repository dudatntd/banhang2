import React, { useState, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductCatalogView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [priceRange, setPriceRange] = useState<'all' | 'under5' | '5to15' | '15to30' | 'above30'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest' | 'name-asc'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Must be active
      if (!p.is_active) return false;

      // Category filter
      if (selectedCategory !== 'all' && p.category_id !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      // Price filter
      const finalPrice = p.discount_price || p.price;
      if (priceRange === 'under5' && finalPrice > 5000000) return false;
      if (priceRange === '5to15' && (finalPrice < 5000000 || finalPrice > 15000000)) return false;
      if (priceRange === '15to30' && (finalPrice < 15000000 || finalPrice > 30000000)) return false;
      if (priceRange === 'above30' && finalPrice < 30000000) return false;

      return true;
    });
  }, [products, selectedCategory, searchQuery, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort(
          (a, b) => (a.discount_price || a.price) - (b.discount_price || b.price)
        );
      case 'price-desc':
        return list.sort(
          (a, b) => (b.discount_price || b.price) - (a.discount_price || a.price)
        );
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
      default:
        return list.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tất Cả Sản Phẩm TDShop
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hiển thị <strong>{sortedProducts.length}</strong> sản phẩm công nghệ chính hãng
            {searchQuery && ` theo từ khóa "${searchQuery}"`}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-700">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as any);
              setCurrentPage(1);
            }}
            className="p-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="newest">Sản phẩm mới nhất</option>
            <option value="price-asc">Giá từ thấp đến cao</option>
            <option value="price-desc">Giá từ cao xuống thấp</option>
            <option value="name-asc">Tên sản phẩm (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Bộ Lọc Tìm Kiếm
              </span>
              {(selectedCategory !== 'all' || priceRange !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-red-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Đặt lại
                </button>
              )}
            </div>

            {/* Filter by Category */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-800">Danh Mục Sản Phẩm</h3>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Tất cả danh mục</span>
                  <span className="text-[10px] opacity-80">{products.length}</span>
                </button>

                {categories.map((cat) => {
                  const count = products.filter((p) => p.category_id === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-80">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter by Price Range */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800">Mức Giá (VNĐ)</h3>
              <div className="space-y-1.5 text-xs text-slate-600">
                {[
                  { key: 'all', label: 'Tất cả mức giá' },
                  { key: 'under5', label: 'Dưới 5 triệu' },
                  { key: '5to15', label: 'Từ 5 đến 15 triệu' },
                  { key: '15to30', label: 'Từ 15 đến 30 triệu' },
                  { key: 'above30', label: 'Trên 30 triệu' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-2 py-1 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === item.key}
                      onChange={() => {
                        setPriceRange(item.key as any);
                        setCurrentPage(1);
                      }}
                      className="text-blue-600"
                    />
                    <span className={priceRange === item.key ? 'font-bold text-blue-600' : ''}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Products Grid */}
        <main className="lg:col-span-3 space-y-6">
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Filter className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Không tìm thấy sản phẩm phù hợp</h3>
              <p className="text-xs text-slate-500">
                Hãy thử nới lỏng bộ lọc hoặc tìm kiếm bằng từ khóa khác.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Xóa toàn bộ bộ lọc
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
