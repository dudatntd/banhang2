import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductCatalogView } from './components/ProductCatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProductDetailModal } from './components/ProductDetailModal';
import {
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Watch,
  Keyboard,
  Package,
} from 'lucide-react';

// Main Inner Application
const MainApp: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    categories,
    selectedCategory,
    setSelectedCategory,
    featuredProducts,
    newProducts,
    notification,
  } = useStore();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-blue-600" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-indigo-600" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-purple-600" />;
      case 'Tv': return <Tv className="w-5 h-5 text-sky-600" />;
      case 'Watch': return <Watch className="w-5 h-5 text-emerald-600" />;
      case 'Keyboard': return <Keyboard className="w-5 h-5 text-amber-600" />;
      default: return <Package className="w-5 h-5 text-slate-600" />;
    }
  };

  // If in Admin view, render the Admin panel directly
  if (currentView === 'admin') {
    return (
      <>
        <AdminLayout />
        {/* Toast notification */}
        {notification && (
          <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full pointer-events-none">
            <div
              className={`p-3.5 rounded-2xl shadow-xl border flex items-center justify-between text-xs pointer-events-auto transition-all animate-in slide-in-from-bottom-2 ${
                notification.type === 'success'
                  ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                  : notification.type === 'error'
                  ? 'bg-red-900 text-red-100 border-red-700'
                  : 'bg-slate-900 text-white border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                {notification.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{notification.message}</span>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-[11px] text-center border-b border-slate-800 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        <span>
          🎉 Ưu đãi khai xuân TDShop: Nhập mã <strong>TDSALE10</strong> giảm ngay 10% cho mọi đơn hàng từ 500.000₫!
        </span>
      </div>

      {/* Main Navbar */}
      <Navbar />

      {/* Dynamic Views */}
      <div className="flex-1">
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <div className="space-y-10 pb-16">
            {/* Banner Slider */}
            <HeroBanner />

            {/* Quick Categories Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Danh mục nổi bật
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCurrentView('products');
                    }}
                    className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Xem tất cả ({categories.length}) <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentView('products');
                      }}
                      className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 flex flex-col items-center gap-2 text-center transition-all group cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white shadow-2xs flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-red-100 text-red-600">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      Sản Phẩm Bán Chạy & Nổi Bật
                    </h2>
                    <p className="text-xs text-slate-500">
                      Những sản phẩm công nghệ được yêu thích nhất trong tuần
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('products');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  Xem toàn bộ cửa hàng <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Mid Promotional Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="space-y-3 z-10 max-w-xl">
                  <span className="px-3 py-1 bg-blue-500/30 border border-blue-400/40 rounded-full text-blue-300 text-[11px] font-bold">
                    Khuyến mãi đặc quyền thành viên
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                    Nâng Cấp Hệ Sinh Thái Công Nghệ Cùng TDShop
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hỗ trợ trả góp 0% lãi suất, thu cũ đổi mới trợ giá lên tới 2.000.000₫. Miễn phí vận chuyển siêu tốc trong ngày tại Hà Nội và TP. HCM.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCurrentView('products');
                    }}
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Xem sản phẩm khuyến mãi ngay
                  </button>
                </div>

                <div className="z-10 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80"
                    alt="Promo"
                    className="w-56 sm:w-64 h-48 object-cover rounded-2xl shadow-2xl border-2 border-white/10"
                  />
                </div>
              </div>
            </section>

            {/* New Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      Sản Phẩm Mới Vừa Cập Bến
                    </h2>
                    <p className="text-xs text-slate-500">
                      Cập nhật liên tục các siêu phẩm công nghệ thế hệ mới nhất
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('products');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  Khám phá thêm <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PRODUCT CATALOG */}
        {currentView === 'products' && <ProductCatalogView />}

        {/* VIEW 3: PRODUCT DETAIL */}
        {currentView === 'product-detail' && <ProductDetailView />}

        {/* VIEW 4: CART */}
        {currentView === 'cart' && <CartView />}

        {/* VIEW 5: CHECKOUT */}
        {currentView === 'checkout' && <CheckoutView />}

        {/* VIEW 6: ABOUT US */}
        {currentView === 'about' && <AboutView />}

        {/* VIEW 7: CONTACT US */}
        {currentView === 'contact' && <ContactView />}
      </div>

      {/* Main Footer */}
      <Footer />

      {/* Global Application Modals */}
      <AuthModal />
      <UserProfileModal />
      <OrderTrackingModal />
      <ProductDetailModal />

      {/* Toast Notification Container */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full pointer-events-none">
          <div
            className={`p-3.5 rounded-2xl shadow-xl border flex items-center justify-between text-xs pointer-events-auto transition-all animate-in slide-in-from-bottom-2 ${
              notification.type === 'success'
                ? 'bg-slate-900 text-white border-slate-700'
                : notification.type === 'error'
                ? 'bg-red-950 text-red-100 border-red-800'
                : 'bg-blue-950 text-blue-100 border-blue-800'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{notification.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
