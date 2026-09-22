import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const BANNERS = [
  {
    id: 1,
    badge: 'SIÊU PHẨM CÔNG NGHỆ 2026',
    title: 'iPhone 15 Pro Max',
    subtitle: 'Khung Titan chuẩn hàng không vũ trụ • Chip A17 Pro siêu tốc độ',
    discountText: 'Giảm ngay 3.000.000₫ + Trả góp 0%',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1000&auto=format&fit=crop&q=80',
    catId: '1',
    bgGradient: 'from-slate-950 via-indigo-950 to-blue-900',
  },
  {
    id: 2,
    badge: 'MÁY TRẠM DI ĐỘNG ĐỈNH CAO',
    title: 'MacBook Pro 14" M3 Pro',
    subtitle: 'Màn hình Liquid Retina XDR 120Hz • Thời lượng pin 18 giờ liên tục',
    discountText: 'Tặng túi chống sốc cao cấp + Chuột không dây',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&auto=format&fit=crop&q=80',
    catId: '2',
    bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
  },
  {
    id: 3,
    badge: 'ÂM THANH ĐỈNH CAO THẾ GIỚI',
    title: 'Sony WH-1000XM5 Hi-Res',
    subtitle: 'Chống ồn kép chủ động thông minh Auto NC • Pin bền bỉ 30 tiếng',
    discountText: 'Ưu đãi sốc chỉ còn 6.990.000₫ trong tuần này',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
    catId: '3',
    bgGradient: 'from-zinc-950 via-neutral-950 to-slate-900',
  },
];

export const HeroBanner: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { setCurrentView, setSelectedCategory } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % BANNERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[currentIdx];

  const handleBannerClick = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentView('products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* Main Carousel Banner (2 Columns) */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <div
            className={`w-full min-h-[380px] sm:min-h-[420px] bg-gradient-to-r ${banner.bgGradient} flex flex-col sm:flex-row items-center justify-between p-6 sm:p-10 text-white relative transition-all duration-700`}
          >
            {/* Banner Text Content */}
            <div className="z-10 max-w-md space-y-3.5 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-300 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                {banner.badge}
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {banner.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {banner.subtitle}
              </p>

              <div className="py-1">
                <span className="inline-block bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md">
                  🔥 {banner.discountText}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={() => handleBannerClick(banner.catId)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
                >
                  Khám phá ngay <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('products')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-xs transition-colors cursor-pointer"
                >
                  Tất cả sản phẩm
                </button>
              </div>
            </div>

            {/* Banner Image */}
            <div className="z-10 mt-6 sm:mt-0 relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-56 sm:w-72 h-56 sm:h-72 object-cover rounded-2xl shadow-2xl border-4 border-white/10 transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Carousel navigation buttons */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)
                }
                className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                title="Trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentIdx((prev) => (prev + 1) % BANNERS.length)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                title="Sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-6 z-20 flex items-center gap-1.5">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIdx === i ? 'w-6 bg-blue-500' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Side Promo Tiles (1 Column) */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => {
              setSelectedCategory('4'); // Đồng hồ
              setCurrentView('products');
            }}
            className="flex-1 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 p-5 text-white flex items-center justify-between shadow-lg border border-purple-800/40 relative overflow-hidden group cursor-pointer"
          >
            <div className="z-10 space-y-1.5 max-w-[170px]">
              <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                Apple Watch Ultra 2
              </span>
              <h3 className="text-sm font-black leading-tight">
                Chinh Phục Mọi Giới Hạn Thể Thao
              </h3>
              <p className="text-[11px] text-purple-200 font-semibold">Giảm 1.500.000₫</p>
              <span className="text-[11px] text-purple-300 group-hover:text-white font-bold flex items-center gap-1 pt-1">
                Mua ngay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=80"
              alt="Watch"
              className="w-24 h-24 object-cover rounded-2xl border-2 border-white/10 group-hover:scale-110 transition-transform shadow-md"
            />
          </div>

          <div
            onClick={() => {
              setSelectedCategory('6'); // Phụ kiện
              setCurrentView('products');
            }}
            className="flex-1 rounded-3xl bg-gradient-to-br from-blue-900 to-slate-900 p-5 text-white flex items-center justify-between shadow-lg border border-blue-800/40 relative overflow-hidden group cursor-pointer"
          >
            <div className="z-10 space-y-1.5 max-w-[170px]">
              <span className="text-[10px] font-black uppercase text-blue-300 tracking-wider">
                Phụ Kiện Gaming Cao Cấp
              </span>
              <h3 className="text-sm font-black leading-tight">
                Bàn Phím & Chuột Cơ Chính Hãng
              </h3>
              <p className="text-[11px] text-blue-200 font-semibold">Đồng giá từ 890k</p>
              <span className="text-[11px] text-blue-300 group-hover:text-white font-bold flex items-center gap-1 pt-1">
                Xem thêm <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80"
              alt="Accessories"
              className="w-24 h-24 object-cover rounded-2xl border-2 border-white/10 group-hover:scale-110 transition-transform shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
