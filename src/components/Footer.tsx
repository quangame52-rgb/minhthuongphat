import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Copy, Check, ExternalLink, Snowflake } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const Footer: React.FC = () => {
  const { info } = useBusiness();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(info.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-950 text-sky-100 border-t border-sky-850 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-900/40 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-12">
          
          {/* Column 1: Brand Info Box */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#trang-chu" className="flex items-center gap-2" id="footer-logo">
              <div className="p-2 bg-gradient-to-br from-sky-550 to-sky-700 rounded-xl text-white">
                <Snowflake className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="font-sans font-black text-lg sm:text-xl text-white tracking-tight block">
                  {info.companyName}
                </span>
                <span className="text-[10px] text-sky-400 font-bold tracking-widest block uppercase font-mono">
                  {info.slogan}
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-sky-305 leading-relaxed font-sans font-medium">
              {info.introduction}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sản Phẩm & Dịch Vụ Chính Hãng 100%</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans font-extrabold text-sm text-white tracking-wider uppercase border-b border-sky-800 pb-2">
              Liên kết nhanh
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-sky-300">
              <a href="#trang-chu" className="hover:text-white transition-colors">&rarr; Trang chủ chính</a>
              <a href="#dich-vu" className="hover:text-white transition-colors">&rarr; Dịch vụ sửa chữa</a>
              <a href="#bang-gia" className="hover:text-white transition-colors">&rarr; Bảng giá sàn công khai</a>
              <a href="#chan-doan-loi" className="hover:text-white transition-colors">&rarr; Chẩn đoán sự cố tự động</a>
              <a href="#dat-lich-hen" className="hover:text-white transition-colors">&rarr; Đặt lịch hẹn đón thợ</a>
              <a href="#tai-sao-chon" className="hover:text-white transition-colors">&rarr; Đánh giá khách hàng</a>
            </div>
          </div>

          {/* Column 3: Work contact addresses info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-extrabold text-sm text-white tracking-wider uppercase border-b border-sky-800 pb-2">
              Hồ sơ liên hệ
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-sky-300 font-semibold font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-sky-400 tracking-widest font-mono">Trụ sở tiệm chính</span>
                  <span className="text-white">{info.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-sky-400 tracking-widest font-mono">Đường dây nóng 24/7</span>
                  <a href={`tel:${info.rawPhone}`} className="text-white hover:text-orange-400 text-sm sm:text-base font-black tracking-wide">{info.hotline}</a>
                </div>
              </div>

              {info.email && (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-sky-400 tracking-widest font-mono">Hộp thư điện tử</span>
                    <a href={`mailto:${info.email}`} className="text-white hover:text-sky-300">{info.email}</a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-sky-400 tracking-widest font-mono">Giờ mở cửa đón thợ</span>
                  <span className="text-white">{info.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Interactive location maps mockup */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-extrabold text-sm text-white tracking-wider uppercase border-b border-sky-800 pb-2 text-left">
              Chỉ đường vệ tinh
            </h4>
            
            <div className="bg-sky-900 rounded-2xl p-4 border border-sky-800 shadow-inner text-left space-y-3.5 relative overflow-hidden">
              <div className="space-y-1">
                <span className="inline-block bg-sky-950 font-mono text-[9px] text-sky-300 px-2 py-0.5 rounded font-black uppercase">
                  ẤN ĐỂ LẤY VỊ TRÍ
                </span>
                <p className="text-[11px] text-sky-200">{info.address}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 font-sans">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="bg-sky-950 hover:bg-sky-800 text-white text-[10px] font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer select-none active:scale-95 border border-sky-800"
                  id="btn-copy-address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã copy địa chỉ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>Sao Chép Địa Chỉ</span>
                    </>
                  )}
                </button>

                {info.mapsLink && (
                  <a
                    href={info.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-550 hover:bg-orange-600 text-white text-[10px] font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-all outline-hidden whitespace-nowrap"
                    id="btn-external-gmap"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                    <span>Google Maps</span>
                  </a>
                )}
              </div>

              <div className="text-[9px] text-sky-400/80 leading-normal font-sans font-medium">
                * Tiệm nằm ngay mặt tiền Lê Thị Trung thuận lợi ra vào, đậu xe hơi bốc hàng hoặc mang thiết bị tới bảo dưỡng trực tiếp.
              </div>
            </div>
          </div>

        </div>

        {/* Copy signature lines */}
        <div className="border-t border-sky-900 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-400 font-sans font-medium gap-4">
          <p>© {currentYear} {info.companyName}. Bảo lưu mọi quyền.</p>
        </div>

      </div>
    </footer>
  );
};
