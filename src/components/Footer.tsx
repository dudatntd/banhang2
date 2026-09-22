import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  Heart,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, categories } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      {/* 4 Feature Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Giao hàng toàn quốc</h4>
              <p className="text-[11px] text-slate-400">Miễn phí ship đơn từ 500k</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">100% Chính hãng</h4>
              <p className="text-[11px] text-slate-400">Cam kết bảo hành 12 - 24 tháng</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Đổi trả 30 ngày</h4>
              <p className="text-[11px] text-slate-400">Lỗi là đổi ngay sản phẩm mới</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Hỗ trợ 24/7</h4>
              <p className="text-[11px] text-slate-400">Hotline tư vấn: 1900 8888</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        {/* Col 1 & 2: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-500/30">
              TD
            </div>
            <span className="font-black text-xl text-white tracking-tight">
              TDShop<span className="text-blue-500">.vn</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Hệ thống bán lẻ thiết bị công nghệ chính hãng hàng đầu Việt Nam. Cung cấp điện thoại, laptop, phụ kiện chính hãng với giá cả cạnh tranh và dịch vụ hậu mãi chu đáo.
          </p>

          <div className="space-y-2 text-slate-400">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              123 Đường Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              Hotline: <strong className="text-white">1900 8888</strong> (8:00 - 21:30)
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              Email hỗ trợ: support@tdshop.vn
            </p>
          </div>
        </div>

        {/* Col 3: Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Danh mục sản phẩm
          </h4>
          <ul className="space-y-2 text-slate-400">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentView('products');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Customer Policies */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Chính sách khách hàng
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li><button onClick={() => setCurrentView('about')} className="hover:text-white">Về chúng tôi</button></li>
            <li><button onClick={() => setCurrentView('contact')} className="hover:text-white">Liên hệ & Hỗ trợ</button></li>
            <li><span className="hover:text-white cursor-pointer">Chính sách bảo hành 12 tháng</span></li>
            <li><span className="hover:text-white cursor-pointer">Chính sách đổi trả trong 30 ngày</span></li>
            <li><span className="hover:text-white cursor-pointer">Chính sách bảo mật thông tin</span></li>
          </ul>
        </div>

        {/* Col 5: Payment & Certification */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Phương thức thanh toán
          </h4>
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
            <span className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              COD (Tiền mặt)
            </span>
            <span className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              VietQR
            </span>
            <span className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              VNPAY
            </span>
            <span className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              Visa / Master
            </span>
          </div>

          <div className="pt-2">
            <h5 className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">Chứng nhận</h5>
            <div className="inline-block px-3 py-1 rounded bg-blue-900/60 border border-blue-700/50 text-blue-300 text-[10px] font-bold">
              ✓ ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
        <p>© 2026 TDShop.vn - Bản quyền thuộc về Công Ty TNHH Công Nghệ TDShop.</p>
        <p className="flex items-center gap-1">
          Nền tảng thương mại điện tử công nghệ cao <Heart className="w-3 h-3 text-red-500 inline fill-red-500" />
        </p>
      </div>
    </footer>
  );
};
