import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, Snowflake, ShieldCheck, Clock } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const Header: React.FC = () => {
  const { info } = useBusiness();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Trang Chủ', href: '#trang-chu' },
    { label: 'Dịch Vụ', href: '#dich-vu' },
    { label: 'Bảng Giá', href: '#bang-gia' },
    { label: 'Thư Viện Ảnh', href: '#thu-vien-hoat-dong' },
    { label: 'Chẩn Đoán Sự Cố', href: '#chan-doan-loi' },
    { label: 'Đăng Ký Đặt Lịch', href: '#dat-lich-hen' },
    { label: 'Tại Sao Chọn MTP', href: '#tai-sao-chon' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top emergency announcement bar */}
      <div className="bg-sky-900 text-white py-2 px-4 text-xs font-semibold sm:text-sm border-b border-sky-850 block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-450 animate-pulse inline-block" />
            <span>Kỹ thuật viên tại Thuận An, Bình Dương đang trực - Sẵn sàng hỗ trợ 24/7!</span>
          </div>
          <div className="flex items-center gap-4 text-sky-200">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-400" /> Có mặt sau 30 phút</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Cam kết chính hãng 100%</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-150 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          
          {/* Logo Brand Segment */}
          <a href="#trang-chu" className="flex items-center gap-2 group" id="logo-header">
            <div className="p-2 bg-gradient-to-br from-sky-550 to-sky-700 rounded-xl text-white shadow-md shadow-sky-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Snowflake className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="font-sans font-black text-lg sm:text-xl md:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-sky-900 flex items-center gap-1">
                {info.companyName}
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] text-sky-600 font-extrabold tracking-widest uppercase">
                {info.slogan}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Linkages */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="font-sans font-semibold text-gray-600 hover:text-sky-600 text-sm transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-500 hover:after:w-full after:transition-all"
                id={`nav-item-${idx}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger and Hotline call elements */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${info.rawPhone}`}
              className="bg-sky-650 hover:bg-sky-700 hover:scale-[1.02] text-white py-2 px-3.5 sm:px-4.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-sky-600/20 transition-all"
              id="header-hotline"
            >
              <div className="bg-white/20 p-1 rounded-full animate-bounce">
                <Phone className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="hidden xs:inline">Hotline:</span>
              <span>{info.hotline}</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-500 hover:text-sky-600 hover:bg-gray-100 rounded-xl lg:hidden transition-all active:scale-95"
              aria-label="Toggle menu"
              id="btn-hamburger"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-gray-100 bg-white shadow-inner overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2.5">
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="block font-sans font-semibold text-gray-700 hover:text-sky-600 hover:bg-sky-50/60 p-3 rounded-xl transition-all"
                    id={`mobile-nav-${idx}`}
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Emergency speed-dial box inside mobile drawer */}
                <div className="bg-sky-50/85 p-3 rounded-xl border border-sky-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-sky-900 text-sm">Hỗ Trợ Nhanh Bình Dương</p>
                    <p className="text-gray-500">{info.address}</p>
                  </div>
                  <a
                    href={`tel:${info.rawPhone}`}
                    className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg shrink-0 flex items-center gap-1"
                    id="mobile-drawer-hotline"
                  >
                    Gọi Ngay
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
