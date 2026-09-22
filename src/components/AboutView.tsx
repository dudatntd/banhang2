import React from 'react';
import { ShieldCheck, Award, Users, HeartHandshake, MapPin, Phone, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          Về TDShop
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Hệ Thống Bán Lẻ Thiết Bị Công Nghệ Tiên Phong
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Được thành lập với sứ mệnh mang những trải nghiệm công nghệ đỉnh cao đến tay người tiêu dùng Việt Nam với mức giá hợp lý nhất, dịch vụ bảo hành chu đáo và sản phẩm chính hãng 100%.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">100% Chính Hãng</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mọi sản phẩm bán ra đều có nguồn gốc xuất xứ rõ ràng, đầy đủ hóa đơn VAT và bảo hành chính hãng từ Apple, Samsung, Sony, Asus...
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Chất Lượng Vượt Trội</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Quy trình kiểm tra chất lượng sản phẩm nghiêm ngặt trước khi giao tới tay khách hàng, đảm bảo sự an tâm tuyệt đối.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">500.000+ Khách Hàng</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hơn nửa triệu khách hàng trên toàn quốc đã tin chọn TDShop trong hành trình nâng cấp thiết bị làm việc và giải trí.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Hậu Mãi Tận Tâm</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Chính sách đổi mới 30 ngày nếu phát sinh lỗi phần cứng từ nhà sản xuất, hỗ trợ kỹ thuật trọn đời máy.
          </p>
        </div>
      </div>

      {/* Showroom Network */}
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black">Hệ Thống Cửa Hàng & Showroom Trải Nghiệm</h2>
          <p className="text-xs text-slate-400">Mời quý khách ghé thăm các chi nhánh TDShop trên toàn quốc</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="font-bold text-sm text-blue-400">Showroom Cầu Giấy (Hà Nội)</h4>
            <p className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              123 Đường Cầu Giấy, P. Quan Hoa, Q. Cầu Giấy, Hà Nội
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              Hotline: 024 7777 8888
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="font-bold text-sm text-blue-400">Showroom Quận 1 (TP. Hồ Chí Minh)</h4>
            <p className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              456 Đường Nguyễn Thị Minh Khai, P. Đa Kao, Quận 1, TP. HCM
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              Hotline: 028 7777 9999
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setCurrentView('products')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            Khám phá các sản phẩm tại TDShop →
          </button>
        </div>
      </div>
    </div>
  );
};
