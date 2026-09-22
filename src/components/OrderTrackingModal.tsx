import React from 'react';
import {
  X,
  Package,
  CheckCircle2,
  Truck,
  Clock,
  Ban,
  Phone,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    orders,
    activeOrderId,
    setActiveOrderId,
    updateOrderStatus,
    formatCurrency,
  } = useStore();

  if (!activeOrderId) return null;

  const order = orders.find((o) => o.id === activeOrderId);
  if (!order) return null;

  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    { key: 'pending', label: 'Chờ xác nhận', desc: 'Đơn hàng mới tạo', icon: Clock },
    { key: 'confirmed', label: 'Đã xác nhận', desc: 'Shop đang chuẩn bị hàng', icon: Package },
    { key: 'shipping', label: 'Đang giao hàng', desc: 'Bưu tá đang trên đường giao', icon: Truck },
    { key: 'delivered', label: 'Đã giao', desc: 'Giao hàng thành công', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'shipping': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
    }
  };

  const currentIdx = getStepIndex(order.status);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
              Theo dõi đơn hàng
            </span>
            <h2 className="text-xl font-black text-slate-900 font-mono">
              #{order.order_code}
            </h2>
          </div>
          <button
            onClick={() => setActiveOrderId(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Stepper */}
        {order.status === 'cancelled' ? (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700">
            <Ban className="w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Đơn hàng này đã bị hủy</h4>
              <p className="text-xs text-red-600">Đơn hàng đã được ghi nhận hủy trên hệ thống.</p>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <div className="grid grid-cols-4 relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-[12%] right-[12%] h-1 bg-slate-200 -z-0">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${(Math.max(0, currentIdx) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {steps.map((s, idx) => {
                const IconComponent = s.icon;
                const isPassed = currentIdx >= idx;
                const isCurrent = currentIdx === idx;

                return (
                  <div key={s.key} className="flex flex-col items-center text-center z-10 space-y-1.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-110'
                          : isPassed
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <p
                      className={`text-[11px] font-bold ${
                        isPassed ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="text-[9px] text-slate-400 hidden sm:block max-w-[90px]">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Shipping & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" /> Người nhận hàng:
            </p>
            <p className="text-slate-700 font-semibold">{order.user_name}</p>
            <p className="text-slate-500">{order.user_phone}</p>
            <p className="text-slate-600">{order.shipping_address}</p>
          </div>

          <div className="space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" /> Thanh toán:
            </p>
            <p className="text-slate-700 font-semibold">
              {order.payment_method === 'cod'
                ? 'Thanh toán tiền mặt khi nhận hàng (COD)'
                : order.payment_method === 'banking'
                ? 'Chuyển khoản VietQR'
                : 'Thẻ / Ví VNPAY'}
            </p>
            <p className="text-slate-500">
              Đặt lúc: {new Date(order.created_at).toLocaleString('vi-VN')}
            </p>
            {order.note && (
              <p className="text-amber-700 font-medium">Ghi chú: {order.note}</p>
            )}
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-700">Sản phẩm trong đơn:</h4>
          <div className="space-y-2 max-h-44 overflow-y-auto">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-white text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-800 line-clamp-1">{item.product_name}</p>
                    <p className="text-slate-400 text-[10px]">
                      {formatCurrency(item.price)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-xs">
            <span className="font-bold text-slate-700">Tổng tiền đã thanh toán:</span>
            <span className="text-base font-black text-red-600">
              {formatCurrency(order.total_amount)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2">
          {order.status === 'pending' ? (
            <button
              onClick={() => updateOrderStatus(order.id, 'cancelled')}
              className="text-xs text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
            >
              Hủy đơn hàng này
            </button>
          ) : (
            <span className="text-[11px] text-slate-400">
              Trạng thái cập nhật theo thời gian thực
            </span>
          )}

          <button
            onClick={() => setActiveOrderId(null)}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
