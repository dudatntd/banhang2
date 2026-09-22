import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const BANNERS = [
  {
    id: 1,
    badge: 'SIÊU PHẨM CÔNG NGHỆ 2026',
    title: 'iPhone 15 Pro Max',
    subtitle: 'Khung Titan chuẩn hàng không vũ trụ • Chip A17 Pro siêu tốc',
    discountText: 'Giảm ngay 3.000.000₫ + Trả góp 0%',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1000&auto=format&fit=crop&q=80',
    targetCat: 'dien-thoai',
    bgGradient: 'from-slate-900 via-indigo-950 to-blue-900',
  },
  {
    id: 2,
    badge: 'MÁY TRẠM DI ĐỘNG ĐỈNH CAO',
    title: 'MacBook Pro 14" M3 Pro',
    subtitle: 'Màn hình Liquid Retina XDR 120Hz • Thời lượng pin 18 giờ',
    discountText: 'Tặng balo công nghệ cao cấp + Chuột Magic Mouse',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&auto=format&fit=crop&q=80',
    targetCat: 'laptop',
    bgGradient: 'from-slate-900 via-slate-800 to-indigo-950',
  },
  {
    id: 3,
    badge: 'ÂM THANH ĐỈNH CAO THẾ GIỚI',
    title: 'Sony WH-1000XM5 Hi-Res',
    subtitle: 'Chống ồn kép chủ động thông minh hàng đầu • Pin 30 tiếng',
    discountText: 'Ưu đãi sốc chỉ còn 6.990.000₫ trong tuần này',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
    targetCat: 'tai-nghe',
    bgGradient: 'from-zinc-900 via-neutral-900 to-slate-900',
  },
];

export const BannerSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { setCurrentView, setSelectedCategorySlug } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[currentIdx];

  const handleBannerClick = (catSlug: string) => {
    setSelectedCategorySlug(catSlug);
    setCurrentView('products');
  };

  return (
    <div className="w-full space-y-6">
      {/* Big Carousel Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
        <div className={`w-full min-h-[360px] md:min-h-[420px] bg-gradient-to-r ${banner.bgGradient} flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 text-white relative transition-all duration-700`}>
          {/* Content */}
          <div className="z-10 max-w-xl space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {banner.badge}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {banner.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {banner.subtitle}
            </p>

            <div className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold">
              🎁 {banner.discountText}
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleBannerClick(banner.targetCat)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center gap-2 transition-all cursor-pointer group"
              >
                Khám phá ngay
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div className="z-10 mt-6 md:mt-0 max-w-xs md:max-w-md w-full flex justify-center">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-72 sm:w-80 md:w-96 h-60 sm:h-72 object-cover rounded-2xl shadow-2xl ring-4 ring-white/10"
            />
          </div>

          {/* Slider controls */}
          <button
            onClick={() => setCurrentIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIdx((prev) => (prev + 1) % BANNERS.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  currentIdx === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feature Strip under banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Miễn Phí Vận Chuyển</p>
            <p className="text-[11px] text-slate-500">Đơn từ 500.000₫</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Bảo Hành 12 Tháng</p>
            <p className="text-[11px] text-slate-500">Chính hãng 100%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Giao Nhanh 2 Giờ</p>
            <p className="text-[11px] text-slate-500">Khu vực nội thành</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Mã Giảm Giá Sốc</p>
            <p className="text-[11px] text-slate-500">Nhập TDWELCOME giảm 10%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
