import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc!', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Cảm ơn bạn! TDShop đã nhận được tin nhắn và sẽ phản hồi sớm nhất.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          Liên Hệ TDShop
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Chúng Tôi Luôn Lắng Nghe Bạn
        </h1>
        <p className="text-xs text-slate-500">
          Hãy để lại thông tin hoặc liên hệ qua các kênh dưới đây nếu bạn cần tư vấn sản phẩm, giải quyết bảo hành hoặc hợp tác kinh doanh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Tổng đài hỗ trợ</h4>
            <p className="text-xs text-slate-600">
              Tư vấn mua hàng: <strong>1900 8888</strong> (Phím 1)
            </p>
            <p className="text-xs text-slate-600">
              Hỗ trợ kỹ thuật / Bảo hành: <strong>1900 8888</strong> (Phím 2)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Email liên hệ</h4>
            <p className="text-xs text-slate-600">Chăm sóc khách hàng: support@tdshop.vn</p>
            <p className="text-xs text-slate-600">Hợp tác kinh doanh: partner@tdshop.vn</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Thời gian làm việc</h4>
            <p className="text-xs text-slate-600">Thứ 2 - Thứ 7: 8:00 - 21:30</p>
            <p className="text-xs text-slate-600">Chủ nhật & Ngày lễ: 8:30 - 21:00</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Gửi lời nhắn thành công!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Cảm ơn bạn đã liên hệ với TDShop. Đội ngũ chuyên viên của chúng tôi sẽ liên hệ lại qua số điện thoại hoặc email trong vòng 24 giờ làm việc.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                Gửi câu hỏi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2">Gửi phản hồi trực tiếp</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Họ và tên của bạn *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0987654321"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email của bạn</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@vidu.com"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nội dung tin nhắn / Câu hỏi *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hãy mô tả chi tiết yêu cầu hỗ trợ của bạn..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" /> Gửi tin nhắn ngay
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
