import React, { useState } from 'react';
import {
  X,
  User,
  ShoppingBag,
  Lock,
  Clock,
  CheckCircle2,
  Truck,
  Ban,
  Phone,
  MapPin,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const UserProfileModal: React.FC = () => {
  const {
    currentUser,
    isProfileModalOpen,
    setIsProfileModalOpen,
    updateProfile,
    orders,
    setActiveOrderId,
    formatCurrency,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'security'>('profile');

  // Edit form
  const [fullName, setFullName] = useState(currentUser?.full_name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');

  // Change password form
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  if (!isProfileModalOpen || !currentUser) return null;

  const userOrders = orders.filter(
    (o) => o.user_id === currentUser.id || o.user_email === currentUser.email
  );

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ full_name: fullName, phone, address });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      showToast('Mật khẩu mới không trùng khớp!', 'error');
      return;
    }
    if (newPass.length < 6) {
      showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
      return;
    }
    updateProfile({ password: newPass });
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
    showToast('Đổi mật khẩu thành công!', 'success');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Chờ xác nhận
          </span>
        );
      case 'confirmed':
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <ShoppingBag className="w-3 h-3" /> Đã xác nhận
          </span>
        );
      case 'shipping':
        return (
          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <Truck className="w-3 h-3" /> Đang giao hàng
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Đã giao thành công
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <Ban className="w-3 h-3" /> Đã hủy
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt={currentUser.full_name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div>
              <h2 className="text-lg font-black text-slate-900">{currentUser.full_name}</h2>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'profile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'orders' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Lịch sử mua hàng ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'security' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Đổi mật khẩu
          </button>
        </div>

        {/* TAB 1: Profile Information */}
        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Họ và tên</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email tài khoản</label>
                <div className="relative">
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] text-slate-400">Email không thể thay đổi</p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Số điện thoại</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Địa chỉ giao hàng mặc định</label>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, đường, phường, quận, thành phố"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Order History */}
        {activeTab === 'orders' && (
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {userOrders.length > 0 ? (
              userOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-sm text-blue-600">
                        #{ord.order_code}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {new Date(ord.created_at).toLocaleDateString('vi-VN')} • {ord.items.length} sản phẩm
                      </p>
                    </div>
                    {getStatusBadge(ord.status)}
                  </div>

                  <div className="space-y-1 border-t border-slate-100 pt-2">
                    {ord.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="text-slate-700 truncate max-w-[280px]">
                          {item.quantity}x {item.product_name}
                        </span>
                        <span className="font-medium text-slate-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    {ord.items.length > 2 && (
                      <p className="text-[10px] text-slate-400 italic">
                        và {ord.items.length - 2} sản phẩm khác...
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500">Tổng thanh toán: </span>
                      <strong className="text-red-600 font-black">{formatCurrency(ord.total_amount)}</strong>
                    </div>

                    <button
                      onClick={() => {
                        setIsProfileModalOpen(false);
                        setActiveOrderId(ord.id);
                      }}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                    >
                      Chi tiết & Tiến độ <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 space-y-2">
                <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">Bạn chưa có đơn hàng nào.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Change Password */}
        {activeTab === 'security' && (
          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  required
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Mật khẩu mới ít nhất 6 ký tự"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cập nhật mật khẩu
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
