import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Tag,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    formatCurrency,
    coupons,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800">Giỏ hàng của bạn đang trống</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Hãy khám phá hàng trăm sản phẩm công nghệ chính hãng chất lượng cao với giá ưu đãi tại TDShop!
          </p>
        </div>
        <button
          onClick={() => setCurrentView('products')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Khám phá sản phẩm ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 cursor-pointer">
          Trang chủ
        </button>
        <span>/</span>
        <span className="font-bold text-slate-800">Giỏ hàng của bạn</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Cart Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              Giỏ hàng ({cart.length} sản phẩm)
            </h1>
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
            >
              Xóa tất cả
            </button>
          </div>

          <div className="space-y-3">
            {cart.map((item) => {
              const unitPrice = item.product.discount_price || item.product.price;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-red-600 font-bold">
                        {formatCurrency(unitPrice)}
                      </p>
                      {item.product.discount_price && item.product.discount_price < item.product.price && (
                        <p className="text-[10px] text-slate-400 line-through">
                          {formatCurrency(item.product.price)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-black text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[110px]">
                      <p className="text-sm font-black text-slate-900">
                        {formatCurrency(itemTotal)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentView('products')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Tiếp tục chọn thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Right 1 Col: Summary & Coupon */}
        <div className="space-y-4">
          {/* Coupon Code Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-blue-600" />
              Mã giảm giá ưu đãi
            </h3>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-emerald-600">
                      {appliedCoupon.discount_type === 'percent'
                        ? `Giảm ${appliedCoupon.discount_value}%`
                        : `Giảm ${formatCurrency(appliedCoupon.discount_value)}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer"
                >
                  Gỡ bỏ
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Nhập mã (VD: TDWELCOME)"
                  className="flex-1 text-xs uppercase px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </form>
            )}

            {/* Hint coupons */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Mã gợi ý cho bạn:</p>
              <div className="flex flex-wrap gap-1.5">
                {coupons.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => applyCoupon(c.code)}
                    className="text-[10px] font-bold px-2 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded-md border border-slate-200 transition-colors cursor-pointer"
                  >
                    {c.code} ({c.discount_type === 'percent' ? `-${c.discount_value}%` : `-${formatCurrency(c.discount_value)}`})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Pricing Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Tóm tắt đơn hàng
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính tiền hàng:</span>
                <span className="font-semibold text-slate-900">{formatCurrency(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Giảm giá khuyến mãi:</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển:</span>
                <span className="text-emerald-600 font-semibold">Miễn phí toàn quốc</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                <span className="text-xl font-black text-red-600">{formatCurrency(cartTotal)}</span>
              </div>
              <p className="text-[10px] text-slate-400 text-right">Đã bao gồm VAT</p>
            </div>

            <button
              onClick={() => setCurrentView('checkout')}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Tiến hành đặt hàng <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
