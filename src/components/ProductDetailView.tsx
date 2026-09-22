import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Zap,
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageSquare,
  Send,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    categories,
    selectedProductId,
    setSelectedProductId,
    addToCart,
    setCurrentView,
    formatCurrency,
    reviews,
    addReview,
    currentUser,
    setIsAuthModalOpen,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Review Form
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  // Default to first product if none selected
  const activeId = selectedProductId || products[0]?.id;
  const product = products.find((p) => p.id === activeId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 text-sm">Không tìm thấy thông tin sản phẩm.</p>
        <button
          onClick={() => setCurrentView('products')}
          className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Quay lại danh mục sản phẩm
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category_id);
  const productReviews = reviews.filter((r) => r.product_id === product.id);

  const discountPercent =
    product.discount_price && product.discount_price < product.price
      ? Math.round(((product.price - product.discount_price) / product.price) * 100)
      : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentView('checkout');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!newComment.trim()) return;

    addReview(product.id, newRating, newComment.trim());
    setNewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => setCurrentView('products')} className="hover:text-blue-600 flex items-center gap-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" /> Tất cả sản phẩm
        </button>
        <span>/</span>
        <span className="text-slate-400">{category?.name}</span>
        <span>/</span>
        <span className="font-bold text-slate-800 truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main 2-Col Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xs">
        {/* Left: Image gallery */}
        <div className="space-y-4">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                GIẢM {discountPercent}%
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-600">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="text-[11px] leading-tight">
                <strong className="text-slate-900 block font-semibold">Giao nhanh</strong>
                <span>Miễn phí ship từ 500k</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-[11px] leading-tight">
                <strong className="text-slate-900 block font-semibold">Bảo hành</strong>
                <span>Chính hãng 12T</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-600">
              <RotateCcw className="w-4 h-4 text-purple-600 shrink-0" />
              <div className="text-[11px] leading-tight">
                <strong className="text-slate-900 block font-semibold">Đổi trả</strong>
                <span>30 ngày lỗi 1 đổi 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
              {category?.name || 'Công nghệ'}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating and Stock badge */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 5.0}</span>
                <span className="text-slate-400 font-normal">({product.reviews_count || 12} đánh giá)</span>
              </div>
              <span className="text-slate-300">•</span>
              {product.stock > 0 ? (
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Còn {product.stock} sản phẩm
                </span>
              ) : (
                <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Tạm hết hàng
                </span>
              )}
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-red-600">
                  {formatCurrency(product.discount_price || product.price)}
                </span>
                {product.discount_price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Giá đã bao gồm thuế VAT và bảo hành chính hãng</p>
            </div>

            {/* Short description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity selector & Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-slate-700">Số lượng:</span>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="py-3.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-2 border border-blue-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" /> Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
              >
                <Zap className="w-4 h-4" /> Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Reviews */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'desc'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Mô tả chi tiết
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Thông số kỹ thuật
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Đánh giá ({productReviews.length})
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'desc' && (
          <div className="text-xs text-slate-700 leading-relaxed space-y-3">
            <p>{product.description}</p>
            <p>
              Sản phẩm được bảo hành chính hãng toàn diện tại hệ thống trung tâm bảo hành ủy quyền của hãng trên toàn quốc. Khi mua hàng tại TDShop, quý khách được hỗ trợ kỹ thuật tận tình, miễn phí cài đặt phần mềm và hỗ trợ sao lưu dữ liệu.
            </p>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="max-w-xl">
            <table className="w-full text-xs text-left border-collapse">
              <tbody>
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  Object.entries(product.specs).map(([k, v], idx) => (
                    <tr key={k} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-2.5 px-4 font-bold text-slate-700 border-b border-slate-100 w-1/3">
                        {k}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                        {v}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-slate-400">
                      Đang cập nhật bảng thông số kỹ thuật...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Submit review */}
            <form onSubmit={handleSubmitReview} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-600" /> Viết đánh giá của bạn
              </h4>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">Đánh giá điểm:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-0.5 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          newRating >= star ? 'fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={
                    currentUser
                      ? 'Chia sẻ cảm nhận về sản phẩm...'
                      : 'Đăng nhập để gửi đánh giá...'
                  }
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-blue-700 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Gửi
                </button>
              </div>
            </form>

            {/* Reviews list */}
            <div className="space-y-3">
              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl border border-slate-100 bg-white space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{rev.user_name}</span>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      {new Date(rev.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
