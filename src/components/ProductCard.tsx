import React from 'react';
import { Star, ShoppingCart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatCurrency,
    addToCart,
    categories,
    setSelectedProductId,
    setCurrentView,
  } = useStore();

  const category = categories.find((c) => c.id === product.category_id);

  const discountPercent =
    product.discount_price && product.discount_price < product.price
      ? Math.round(((product.price - product.discount_price) / product.price) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setCurrentView('checkout');
  };

  return (
    <div
      onClick={() => setSelectedProductId(product.id)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discountPercent > 0 && (
          <span className="bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
            -{discountPercent}%
          </span>
        )}
        {product.is_new && (
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            Mới
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative w-full pt-[78%] bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-md">
              Hết Hàng
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category */}
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
            {category?.name || 'Sản phẩm'}
          </p>

          {/* Title */}
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mt-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating & Stock */}
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviews_count})</span>
            </div>

            <div className="text-[11px] font-medium">
              {product.stock > 0 ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Còn {product.stock}
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Tạm hết
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-red-600">
              {formatCurrency(product.discount_price || product.price)}
            </span>
            {product.discount_price && product.discount_price < product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Thêm giỏ</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
