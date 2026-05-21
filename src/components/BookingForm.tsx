import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, User, Phone, Clipboard, Sparkles, CheckCircle2, TrendingUp, Settings, Trash2, ShieldCheck, XCircle } from 'lucide-react';
import { Booking } from '../types';
import { useBusiness } from '../context/BusinessContext';

interface BookingFormProps {
  prefilledService?: string;
  prefilledPrice?: number;
  onClearPrefilled?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  prefilledService = '',
  prefilledPrice = 0,
  onClearPrefilled,
}) => {
  const { info, updateInfo, resetToDefault } = useBusiness();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('08:00 - 10:00');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Bookings state for admin panel
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminTab, setAdminTab] = useState<'bookings' | 'settings'>('bookings');

  // Admin settings values
  const [cfgCompanyName, setCfgCompanyName] = useState('');
  const [cfgSlogan, setCfgSlogan] = useState('');
  const [cfgHotline, setCfgHotline] = useState('');
  const [cfgRawPhone, setCfgRawPhone] = useState('');
  const [cfgEmail, setCfgEmail] = useState('');
  const [cfgAddress, setCfgAddress] = useState('');
  const [cfgWorkingHours, setCfgWorkingHours] = useState('');
  const [cfgMapsLink, setCfgMapsLink] = useState('');
  const [cfgIntroduction, setCfgIntroduction] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Success state for client booking confirmation
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Sync settings inputs when company context values are synchronized
  useEffect(() => {
    if (info) {
      setCfgCompanyName(info.companyName);
      setCfgSlogan(info.slogan);
      setCfgHotline(info.hotline);
      setCfgRawPhone(info.rawPhone);
      setCfgEmail(info.email);
      setCfgAddress(info.address);
      setCfgWorkingHours(info.workingHours);
      setCfgMapsLink(info.mapsLink);
      setCfgIntroduction(info.introduction);
    }
  }, [info, isUnlocked]);

  // Auto-set prefilled details
  useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
      if (prefilledPrice > 0) {
        setNotes((prev) => {
          const base = `Dự toán ước tính: ${prefilledPrice.toLocaleString('vi-VN')}đ.`;
          return prev.includes(base) ? prev : `${base}\n${prev}`.trim();
        });
      }
    }
  }, [prefilledService, prefilledPrice]);

  // Load existing bookings from local storage
  useEffect(() => {
    const saved = localStorage.getItem('minh_thuong_phat_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
      }
    }
  }, []);

  const saveBookingsToStorage = (updated: Booking[]) => {
    localStorage.setItem('minh_thuong_phat_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !service || !date || !address) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }

    const newBooking: Booking = {
      id: 'MTP-' + Math.floor(100000 + Math.random() * 900000),
      name,
      phone,
      serviceType: service,
      date,
      timeSlot,
      address,
      notes,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newBooking, ...bookings];
    saveBookingsToStorage(updated);

    // Set success modal & clear Form
    setSuccessBooking(newBooking);
    setName('');
    setPhone('');
    setService('');
    setDate('');
    setAddress('');
    setNotes('');
    if (onClearPrefilled) {
      onClearPrefilled();
    }
  };

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    saveBookingsToStorage(updated);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này khỏi danh sách?')) {
      const updated = bookings.filter((b) => b.id !== id);
      saveBookingsToStorage(updated);
    }
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Support testing bypass "123" or actual rawPhone
    if (adminPassword === '123' || adminPassword === info.rawPhone || adminPassword === '0979628168') {
      setIsUnlocked(true);
      setAdminError('');
    } else {
      setAdminError(`Mật khẩu quản trị không chính xác! (Gợi ý: Nhập số điện thoại hotline hoặc "123")`);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateInfo({
      companyName: cfgCompanyName,
      slogan: cfgSlogan,
      hotline: cfgHotline,
      rawPhone: cfgRawPhone,
      email: cfgEmail,
      address: cfgAddress,
      workingHours: cfgWorkingHours,
      mapsLink: cfgMapsLink,
      introduction: cfgIntroduction,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <section id="dat-lich-hen" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left instructions block */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-850 text-xs font-bold rounded-full border border-sky-100 uppercase">
              <Clipboard className="w-3.5 h-3.5" /> Quy trình đặt lịch
            </span>
            <h2 className="font-sans font-black text-3xl text-gray-900 tracking-tight leading-tight">
              Đặt Lịch Hẹn Khảo Sát <br/>
              & Sửa Chữa Tiện Lợi
            </h2>
            <p className="text-gray-650 text-sm sm:text-base leading-relaxed">
              Chỉ cần điền biểu mẫu nhanh chóng, thợ của {info.companyName} sẽ lập tức chuẩn bị trang bị kĩ lưỡng và di chuyển sớm nhất phục vụ bạn.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-800 text-sm shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Gửi Thông Tin Yêu Cầu</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Bạn chọn dịch vụ cần sửa chữa, chọn mốc ngày giờ tiện đón thợ nhất.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-800 text-sm shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Xác Nhận Qua Điện Thoại</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Chúng tôi gọi điện tư vấn, xác nhận hư hỏng và báo dải giá sơ bộ trong 5-10 phút.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-800 text-sm shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Kỹ Thuật Đến Tận Nơi</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Khảo sát máy lạnh/máy giặt miễn phí, thống nhất phương án, bắt tay giải quyết bàn giao êm ấm.</p>
                </div>
              </div>
            </div>

            {/* Quick action: Show Admin Panel Switch */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-150 flex items-center justify-between mt-6 text-xs text-gray-500">
              <span className="font-semibold flex items-center gap-1">
                <Settings className="w-4 h-4 text-gray-450 animate-spin-slow" /> Chế độ kiểm duyệt thông tin & đơn đặt lịch
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAdmin(!showAdmin);
                  setAdminError('');
                }}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 bg-white border border-gray-200 py-1.5 px-3 rounded-lg hover:shadow-xs cursor-pointer focus:outline-hidden"
                id="btn-toggle-admin-pane"
              >
                {showAdmin ? 'Đóng Admin' : 'Mở Quản Lý'}
              </button>
            </div>
          </div>

          {/* Right Main Scheduling Form Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              
              {/* ADMIN MODE DRAWER */}
              {showAdmin ? (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-gray-900 rounded-2xl p-5 sm:p-6 text-white border border-gray-800 shadow-xl min-h-[460px] flex flex-col justify-between"
                  id="admin-scheduling-control"
                >
                  <div>
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-4">
                      <div>
                        <h3 className="font-sans font-bold text-lg text-emerald-400 flex items-center gap-1.5">
                          <TrendingUp className="w-5 h-5 text-emerald-400" /> Hệ thống Tiếp Nhận Đơn Lịch Hẹn
                        </h3>
                        <p className="text-[10px] text-gray-400">Quản lý dải thông tin & đơn đặt - {info.companyName}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsUnlocked(false);
                          setShowAdmin(false);
                        }}
                        className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 px-2.5 rounded-lg font-semibold active:scale-95 transition-all"
                        id="btn-close-admin"
                      >
                        Thoát Admin
                      </button>
                    </div>

                    {!isUnlocked ? (
                      /* Unlock interface */
                      <form onSubmit={handleUnlockAdmin} className="space-y-4 py-8 max-w-sm mx-auto">
                        <p className="text-gray-350 text-xs text-center leading-relaxed">
                          Nhập mật đăng nhập quản quyền (gợi ý để test: gõ bừa số hotline <code className="bg-gray-800 text-orange-400 px-1 py-0.5 rounded font-mono">{info.rawPhone}</code> hoặc gõ <code className="bg-gray-800 text-orange-400 px-1 py-0.5 rounded font-mono">123</code>)
                        </p>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-sans">Mật Khẩu Quản Trị</label>
                          <input
                            type="password"
                            placeholder="Nhập mật khẩu..."
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="bg-gray-850 hover:bg-gray-800 focus:bg-gray-850 border border-gray-750 text-white rounded-xl py-3 px-4 w-full text-center tracking-widest font-mono text-sm focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                            id="input-admin-pass"
                            required
                          />
                        </div>
                        {adminError && <p className="text-xs text-red-400 font-semibold text-center">{adminError}</p>}
                        <button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 font-sans font-bold text-xs py-3.5 rounded-xl uppercase transition-colors"
                          id="btn-admin-submit-pass"
                        >
                          Xác thực đăng nhập
                        </button>
                      </form>
                    ) : (
                      /* Main Admin Workspace Controls */
                      <div className="space-y-4 animate-fadeIn">
                        
                        {/* Tab Toggle Navigation inside unlocked panel */}
                        <div className="flex gap-2 border-b border-gray-800 pb-2">
                          <button
                            type="button"
                            onClick={() => setAdminTab('bookings')}
                            className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              adminTab === 'bookings' ? 'bg-emerald-605 bg-emerald-600 text-white shadow-xs' : 'bg-gray-800 hover:bg-gray-750 text-gray-450 text-gray-300'
                            }`}
                          >
                            Lịch hẹn đặt ({bookings.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdminTab('settings')}
                            className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              adminTab === 'settings' ? 'bg-emerald-605 bg-emerald-600 text-white shadow-xs' : 'bg-gray-800 hover:bg-gray-750 text-gray-450 text-gray-300'
                            }`}
                          >
                            Cấu hình thông tin Shop ⚙
                          </button>
                        </div>

                        {adminTab === 'bookings' ? (
                          /* List Bookings */
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-extrabold text-sky-400">Danh sách tiếp nhận thợ ({bookings.length})</span>
                              <button
                                onClick={() => {
                                  if (window.confirm('Cảnh báo: Bạn sẽ xóa toàn bộ lịch sử danh sách đặt lịch hiện tại khỏi LocalStorage?')) {
                                    saveBookingsToStorage([]);
                                  }
                                }}
                                className="text-[10px] text-red-400 hover:text-red-355 font-bold flex items-center gap-1 bg-red-950/25 px-2 py-1 rounded"
                                id="btn-admin-clear-all"
                              >
                                Xóa Sạch Lịch Sử
                              </button>
                            </div>

                            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                              {bookings.length === 0 ? (
                                <p className="text-center text-gray-500 text-xs py-12 font-medium">Hiện tại chưa có đơn đặt lịch hẹn nào được ghi nhận.</p>
                              ) : (
                                bookings.map((b) => (
                                  <div key={b.id} className="bg-gray-850 rounded-xl p-4 border border-gray-800 flex flex-col justify-between" id={`booking-record-${b.id}`}>
                                    <div className="flex justify-between items-start border-b border-gray-800 pb-2 mb-2">
                                      <div>
                                        <span className="font-mono text-[10px] text-emerald-450 font-bold">{b.id}</span>
                                        <h4 className="font-bold text-xs text-white mt-0.5">{b.name} - {b.phone}</h4>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <select
                                          value={b.status}
                                          onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                                          className={`text-[10px] font-bold p-1 rounded border bg-gray-900 focus:outline-hidden ${
                                            b.status === 'completed'
                                              ? 'text-emerald-300 border-emerald-800'
                                              : b.status === 'cancelled'
                                              ? 'text-red-400 border-red-900'
                                              : 'text-amber-300 border-amber-900'
                                          }`}
                                          id={`admin-change-status-${b.id}`}
                                        >
                                          <option value="pending">⏳ Chờ xử lý</option>
                                          <option value="completed">✓ Hoàn thành</option>
                                          <option value="cancelled">✗ Hủy lịch</option>
                                        </select>
                                        <button
                                          onClick={() => handleDeleteBooking(b.id)}
                                          className="p-1 text-gray-500 hover:text-red-450 rounded transition-colors"
                                          title="Xóa cuộc hẹn"
                                          id={`btn-del-booking-${b.id}`}
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="space-y-1 text-[11px] text-gray-300">
                                      <p><strong className="text-gray-500">Hạng mục:</strong> {b.serviceType}</p>
                                      <p><strong className="text-gray-500">Mốc hẹn:</strong> {b.date} ({b.timeSlot})</p>
                                      <p><strong className="text-gray-500">Địa chỉ:</strong> {b.address}</p>
                                      {b.notes && <p><strong className="text-gray-500">Ghi chú:</strong> {b.notes}</p>}
                                      <p className="text-[9px] text-gray-550 text-right mt-1 italic">Đăng ký: {b.createdAt}</p>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ) : (
                          /* Settings Editor Tab */
                          <form onSubmit={handleSaveSettings} className="space-y-4 max-h-[340px] overflow-y-auto pr-1 text-xs">
                            <div className="bg-emerald-950/20 rounded-xl p-3 border border-emerald-900 text-[11px] text-emerald-400 leading-relaxed font-sans font-medium">
                              💡 Mọi thông tin tại đây có thể thay đổi được. Khi lưu thông tin, toàn bộ nội dung hiển thị (tên shop, hotline, địa chỉ cơ sở, giờ hành chính, maps vệ tinh) trên landing page sẽ đổi theo ngay lập tức.
                            </div>

                            {saveSuccess && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-emerald-500 text-white p-2 text-center rounded-lg font-bold font-sans text-xs"
                              >
                                ✓ Đã lưu thông tin cấu hình vào LocalStorage thành công!
                              </motion.div>
                            )}

                            {/* Company / Brand Name */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tên thương hiệu doanh nghiệp</label>
                              <input
                                type="text"
                                value={cfgCompanyName}
                                onChange={(e) => setCfgCompanyName(e.target.value)}
                                className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                required
                              />
                            </div>

                            {/* Slogan */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Khẩu hiệu / Slogan phụ</label>
                              <input
                                type="text"
                                value={cfgSlogan}
                                onChange={(e) => setCfgSlogan(e.target.value)}
                                className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                required
                              />
                            </div>

                            {/* Hotline metrics */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Hotline Show (Có dấu chấm)</label>
                                <input
                                  type="text"
                                  value={cfgHotline}
                                  onChange={(e) => setCfgHotline(e.target.value)}
                                  className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                  placeholder="0979.628.168"
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Hotline Số (Gọi điện - dính liền)</label>
                                <input
                                  type="text"
                                  value={cfgRawPhone}
                                  onChange={(e) => setCfgRawPhone(e.target.value)}
                                  className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                  placeholder="0979628168"
                                  required
                                />
                              </div>
                            </div>

                            {/* Email Addresses */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Hộp thư điện tử (Để trống để ẩn)</label>
                              <input
                                type="text"
                                value={cfgEmail}
                                onChange={(e) => setCfgEmail(e.target.value)}
                                className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                placeholder="Hãy để trống để ẩn theo yêu cầu..."
                              />
                            </div>

                            {/* Headquarters address */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Địa chỉ cơ sở chính</label>
                              <input
                                type="text"
                                value={cfgAddress}
                                onChange={(e) => setCfgAddress(e.target.value)}
                                className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                required
                              />
                            </div>

                            {/* Working Hours */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Khung giờ vàng trực ban</label>
                              <input
                                type="text"
                                value={cfgWorkingHours}
                                onChange={(e) => setCfgWorkingHours(e.target.value)}
                                className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                required
                              />
                            </div>

                            {/* Map satellite GPS pointer */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Link định vị Google Maps</label>
                              <input
                                type="text"
                                value={cfgMapsLink}
                                onChange={(e) => setCfgMapsLink(e.target.value)}
                                className="bg-gray-850 focus:bg-gray-800 border border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden"
                                required
                              />
                            </div>

                            {/* Intro text */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Mục tóm tắt giới thiệu (Chân trang)</label>
                              <textarea
                                value={cfgIntroduction}
                                onChange={(e) => setCfgIntroduction(e.target.value)}
                                className="bg-gray-850 focus:bg-gray-800 border-gray-750 text-white rounded-lg py-2 px-3 w-full focus:outline-hidden resize-none"
                                rows={3}
                                required
                              />
                            </div>

                            {/* Command triggers */}
                            <div className="flex gap-2.5 pt-2">
                              <button
                                type="submit"
                                className="flex-1 bg-emerald-650 bg-emerald-650 hover:bg-emerald-700 text-white font-sans font-extrabold text-xs py-3 rounded-xl uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
                              >
                                🔔 ÁP DỤNG THAY ĐỔI
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm('Khôi phục cấu hình về nguyên trạng mặc định ban đầu của thương hiệu Việt Nam?')) {
                                    resetToDefault();
                                  }
                                }}
                                className="bg-gray-800 hover:bg-gray-750 text-red-400 font-sans font-bold text-xs px-4 py-3 rounded-xl cursor-pointer"
                              >
                                Đặt Lại Mẫu
                              </button>
                            </div>
                          </form>
                        )}

                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                
                /* NORMAL BOOKING FORM */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xl"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-sans font-extrabold text-xl text-gray-900 tracking-tight flex items-center gap-1.5 border-b border-gray-100 pb-3">
                      <Sparkles className="w-5.5 h-5.5 text-sky-600 animate-pulse" /> Đăng Ký Lấy Lịch Hẹn Tư Vấn
                    </h3>

                    {/* Notification about prefilled values */}
                    {prefilledService && (
                      <div className="bg-sky-50 px-4 py-3 rounded-xl border border-sky-100 flex items-center justify-between text-xs font-semibold text-sky-850">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-sky-655" />
                          Nhận thông tin: "{prefilledService}"
                        </span>
                        <button
                          type="button"
                          onClick={onClearPrefilled}
                          className="text-[10px] text-red-600 hover:text-red-800 font-bold bg-white/80 border border-red-100 py-0.5 px-2 rounded hover:bg-white"
                          id="btn-clear-prefill-form"
                        >
                          Xóa đi
                        </button>
                      </div>
                    )}

                    {/* Name & Phone block */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">
                          Họ và tên khách hàng <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Nguyễn Văn A"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100/50 focus:bg-white border-2 border-gray-200 focus:border-sky-505 rounded-xl py-3 px-4 pl-10.5 w-full text-xs sm:text-sm font-sans font-medium text-gray-900 focus:outline-hidden transition-all"
                            required
                            id="input-name"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">
                          Số điện thoại liên hệ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="Ví dụ: 0979 628 168"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100/50 focus:bg-white border-2 border-gray-200 focus:border-sky-505 rounded-xl py-3 px-4 pl-10.5 w-full text-xs sm:text-sm font-sans font-medium text-gray-900 focus:outline-hidden transition-all"
                            required
                            id="input-phone"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Services selection dropdown */}
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">
                        Hạng mục dịch vụ yêu cầu <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="bg-gray-50 hover:bg-gray-100/50 focus:bg-white border-2 border-gray-200 focus:border-sky-505 rounded-xl py-3.5 px-4 w-full text-xs sm:text-sm font-sans font-semibold text-gray-900 focus:outline-hidden transition-all cursor-pointer"
                        required
                        id="select-service-type"
                      >
                        <option value="">-- Mời bạn lựa chọn loại công việc --</option>
                        <option value="Dịch vụ Máy Lạnh / Điều Treo Tường Sửa Chữa">Dịch vụ sửa chữa / vệ sinh máy lạnh treo tường</option>
                        <option value="Dịch vụ Máy Lạnh Cassette Âm Trần / Tủ Đứng">Dịch vụ Máy Lạnh Cassette Âm trần, Tủ Đứng</option>
                        <option value="Dịch vụ Tủ Lạnh dung tích vừa - Side By Side">Dịch vụ sửa tủ lạnh, tủ cấp đông thực phẩm</option>
                        <option value="Vệ sinh, sửa chữa lỗi máy giặt cửa ngang / đứng">Dịch vụ sửa chữa, vệ sinh máy giặt các loại</option>
                        <option value="Hợp đồng bảo dưỡng công sở, cơ quan, xí nghiệp">Hợp đồng bảo trì cơ quan, xí nghiệp lâu năm</option>
                        <option value="Sửa máy làm mát quạt hơi nước, quạt công nghiệp">Sửa máy làm mát quạt hơi nước, quạt xưởng</option>
                      </select>
                    </div>

                    {/* Date and Time slots picker */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">
                          Mốc ngày hẹn thợ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-450 pointer-events-none" />
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100/50 focus:bg-white border-2 border-gray-200 focus:border-sky-505 rounded-xl py-3 px-4 pl-10.5 w-full text-xs sm:text-sm font-sans font-medium text-gray-900 focus:outline-hidden transition-all cursor-pointer"
                            required
                            id="input-date"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">
                          Khung giờ đón thợ thích hợp nhất
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-450 pointer-events-none" />
                          <select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100/50 focus:bg-white border-2 border-gray-200 focus:border-sky-505 rounded-xl py-3 px-4 pl-10.5 w-full text-xs sm:text-sm font-sans font-semibold text-gray-900 focus:outline-hidden transition-all cursor-pointer"
                            id="select-time-slot"
                          >
                            <option value="08:00 - 10:00">Sáng sớm: 08:00 - 10:00</option>
                            <option value="10:00 - 12:00">Trưa: 10:00 - 12:00</option>
                            <option value="13:30 - 15:30">Đầu chiều: 13:30 - 15:30</option>
                            <option value="15:30 - 17:30">Chiều tối: 15:30 - 17:30</option>
                            <option value="18:00 - 20:30">Khung giờ tối: 18:00 - 20:30</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Home address detail input */}
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">
                        Địa chỉ nhà riêng / Cơ quan tại Bình Dương <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                        <textarea
                          placeholder="Số nhà, Tên đường, Phường, Thành phố (ví dụ: Lê Thị Trung, An Phú, Thuận An)"
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="bg-gray-50 hover:bg-gray-100/50 focus:bg-white border-2 border-gray-200 focus:border-sky-505 rounded-xl py-3 px-4 pl-10.5 w-full text-xs sm:text-sm font-sans font-medium text-gray-900 focus:outline-hidden transition-all resize-none"
                          required
                          id="textarea-address"
                        />
                      </div>
                    </div>

                    {/* Notes detail text lines */}
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">
                        Ghi chú triệu chứng hư hỏng cụ thể cho thợ
                      </label>
                      <textarea
                        placeholder="Có thể nêu rõ: Máy chạy khét, bị dột chảy nước thành giọt hay điều hòa bấm điều khiển không sáng đèn chớp..."
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="bg-gray-50 hover:bg-gray-100/50 focus:bg-white border-2 border-gray-200 focus:border-sky-505 rounded-xl py-3 px-4 w-full text-xs sm:text-sm font-sans font-medium text-gray-900 focus:outline-hidden transition-all resize-none"
                        id="textarea-notes"
                      />
                    </div>

                    {/* Clear-cut button layout */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-650 to-sky-800 hover:from-sky-700 hover:to-sky-900 lg:scale-[1.01] text-white py-4 px-8 rounded-xl font-sans font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md shadow-sky-700/10 text-center cursor-pointer active:scale-95"
                      id="btn-submit-booking-form"
                    >
                      XÁC NHẬN ĐĂNG KÝ HẸN THỢ NGAY GẦN BẠN
                    </button>

                    <p className="text-center text-[10px] text-gray-400 font-medium">
                      🛡️ Bảo mật thông tin: {info.companyName} cam kết không rò rỉ hay sử dụng dữ liệu SĐT trái quy định.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* CONFIRMATION POPUP SUCCESS MODAL */}
      <AnimatePresence>
        {successBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-gray-900/60 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 text-center border border-sky-100 shadow-2xl relative overflow-hidden"
              id="success-booking-modal"
            >
              {/* Confetti styles */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-550" />

              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-sans font-black text-gray-900 text-lg sm:text-xl tracking-tight">Đặt Lịch Hẹn Thành Công!</h4>
              <p className="text-gray-550 text-xs mt-1.5 leading-relaxed font-sans font-medium">
                Cảm ơn anh/chị <span className="font-extrabold text-sky-950">{successBooking.name}</span>. Yêu cầu của bạn đã được ghi nhận trực tiếp vào cơ sở dữ liệu lưu chuyển thợ của tiệm.
              </p>

              {/* Booking receipt details box */}
              <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 my-4 text-left text-xs space-y-2 font-medium font-sans text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-550">Mã lịch hẹn:</span>
                  <strong className="font-mono text-sky-900 text-sm font-black">{successBooking.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-550">Yêu cầu:</span>
                  <span className="text-right text-gray-900 font-bold truncate max-w-[200px]">{successBooking.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-550">Ngày thợ tới:</span>
                  <span className="text-right text-sky-950 font-extrabold">{successBooking.date} ({successBooking.timeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-550">Địa chỉ thi công:</span>
                  <span className="text-right text-gray-900 max-w-[180px] truncate">{successBooking.address}</span>
                </div>
              </div>

              <div className="bg-emerald-50 text-[10px] sm:text-xs text-emerald-800 p-2.5 rounded-xl border border-emerald-150 font-bold mb-5 flex items-center gap-1.5 justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span>Trực ban điều động thợ sẽ liên hệ SĐT <strong>{successBooking.phone}</strong> xác nhận tức thì sau 5 phút!</span>
              </div>

              {/* Close triggers */}
              <button
                onClick={() => setSuccessBooking(null)}
                className="w-full bg-sky-900 hover:bg-sky-950 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm tracking-wide uppercase transition-colors shrink-0 active:scale-95"
                id="btn-close-success-modal"
              >
                ĐÃ RE-CONFIRM & QUAY LẠI TRANG CHỦ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
