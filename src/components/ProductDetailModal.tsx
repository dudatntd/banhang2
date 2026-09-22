import React, { useState } from 'react';
import {
  X,
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

export const ProductDetailModal: React.FC = () => {
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Review Form
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!selectedProductId) return null;

  const product = products.find((p) => p.id === selectedProductId);
  if (!product) return null;

  const category = categories.find((c) => c.id === product.category_id);
  const currentImage = selectedImage || product.image;
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
    setSelectedProductId(null);
    setCurrentView('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!newComment.trim()) return;
    addReview(product.id, newRating, newComment.trim());
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>TDShop</span>
            <span>/</span>
            <span className="text-blue-600">{category?.name}</span>
          </div>
          <button
            onClick={() => setSelectedProductId(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Top 2-Column: Media & Buy Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="w-full aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                    Tiết kiệm {discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-2">
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        currentImage === img ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Assurances */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">Chính Hãng</span>
                  <span className="text-[10px] text-slate-400">100% VN/A</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">Giao Nhanh</span>
                  <span className="text-[10px] text-slate-400">2 Giờ nội thành</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-1">
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold">Đổi Trả</span>
                  <span className="text-[10px] text-slate-400">7 ngày 1 đổi 1</span>
                </div>
              </div>
            </div>

            {/* Product Details & Actions */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 mt-2.5 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({product.reviews_count} đánh giá)
                    </span>
                  </div>

                  {product.stock > 0 ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Còn hàng ({product.stock} sản phẩm)
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> Tạm hết hàng
                    </span>
                  )}
                </div>

                {/* Price Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-red-600">
                      {formatCurrency(product.discount_price || product.price)}
                    </span>
                    {product.discount_price && product.discount_price < product.price && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Giá đã bao gồm VAT và bảo hành chính hãng 12 tháng tại TDShop
                  </p>
                </div>

                {/* Short Specs Snippet */}
                {product.specs && (
                  <div className="mt-4 space-y-1.5 text-xs">
                    <p className="font-bold text-slate-700">Điểm nổi bật:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                      {Object.entries(product.specs).slice(0, 3).map(([k, v]) => (
                        <li key={k}>
                          <span className="font-medium text-slate-800">{k}:</span> {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Số lượng:</span>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-black text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Kho: {product.stock}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" /> Thêm Vào Giỏ
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock <= 0}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-current" /> Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Description, Specs, Reviews */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === 'desc'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Mô tả sản phẩm
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Thông số kỹ thuật
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Đánh giá khách hàng ({productReviews.length})
              </button>
            </div>

            <div className="py-4">
              {/* Tab 1: Description */}
              {activeTab === 'desc' && (
                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                  <p>{product.description}</p>
                  <p>
                    Khi mua tại TDShop, quý khách được hưởng chính sách bảo hành 1 đổi 1 trong vòng 7 ngày đầu nếu có lỗi phần cứng từ nhà sản xuất, bảo hành sửa chữa chính hãng 12 tháng, hỗ trợ kỹ thuật trọn đời máy.
                  </p>
                </div>
              )}

              {/* Tab 2: Specs */}
              {activeTab === 'specs' && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <tbody>
                      {product.specs ? (
                        Object.entries(product.specs).map(([key, val], idx) => (
                          <tr
                            key={key}
                            className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                          >
                            <td className="py-2.5 px-4 font-bold text-slate-700 w-1/3 border-b border-slate-100">
                              {key}
                            </td>
                            <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100">
                              {val}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="p-4 text-center text-slate-400">
                            Chưa có thông số chi tiết cho sản phẩm này.
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
                  {/* Reviews List */}
                  <div className="space-y-3">
                    {productReviews.length > 0 ? (
                      productReviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-800">
                                {rev.user_name}
                              </span>
                              <div className="flex text-amber-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {new Date(rev.created_at).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên để lại nhận xét!
                      </p>
                    )}
                  </div>

                  {/* Add Review Form */}
                  <form
                    onSubmit={handleReviewSubmit}
                    className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3"
                  >
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      Gửi đánh giá của bạn
                    </h4>

                    {/* Star Rating select */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-600">Đánh giá sao:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-4 h-4 cursor-pointer transition-colors ${
                                star <= newRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300 hover:text-amber-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={
                        currentUser
                          ? 'Chia sẻ trải nghiệm về chất lượng sản phẩm, tốc độ giao hàng...'
                          : 'Vui lòng đăng nhập để gửi đánh giá'
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500"
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Gửi đánh giá
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
