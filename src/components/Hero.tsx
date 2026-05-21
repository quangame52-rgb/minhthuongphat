import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, HeartHandshake, PhoneCall, Snowflake, Refrigerator, Disc, Thermometer, ArrowDown } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
// @ts-ignore
import storefrontBg from '../assets/images/real_storefront_bg_1779341715747.png';

export const Hero: React.FC = () => {
  const { info } = useBusiness();
  const scrollSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const bentoItems = [
    {
      title: 'MÁY LẠNH',
      desc: 'Lắp ráp, vệ sinh nạp sạc gas, làm xì, sửa board mạch, bảo dưỡng định kỳ.',
      icon: <Snowflake className="w-8 h-8 text-sky-500" />,
      tag: 'Phổ biến',
      bgColor: 'bg-sky-50/80 hover:bg-sky-50/100',
      id: '#dich-vu'
    },
    {
      title: 'TỦ LẠNH / TỦ ĐÔNG',
      desc: 'Thay block, sấy đá tự động, xử lý xì giàn, đóng tuyết, rỉ nước gầm tủ.',
      icon: <Refrigerator className="w-8 h-8 text-indigo-500" />,
      tag: 'Khẩn cấp',
      bgColor: 'bg-indigo-50/80 hover:bg-indigo-50/100',
      id: '#dich-vu'
    },
    {
      title: 'MÁY GIẶT',
      desc: 'Vệ sinh lồng giặt, sửa lỗi board, rung lắc mạnh, kẹt khóa van xả nước.',
      icon: <Disc className="w-8 h-8 text-teal-600 animate-spin-slow" />,
      tag: 'Bảo hành dài',
      bgColor: 'bg-teal-50/85 hover:bg-teal-50/100',
      id: '#dich-vu'
    },
    {
      title: 'MÁY LÀM MÁT',
      desc: 'Sửa quạt hơi nước, thay cục mát, bảo dưỡng điện lạnh xí nghiệp trọn gói.',
      icon: <Thermometer className="w-8 h-8 text-amber-500 animate-pulse" />,
      tag: 'Doanh nghiệp',
      bgColor: 'bg-amber-50/80 hover:bg-amber-50/100',
      id: '#dich-vu'
    }
  ];

  return (
    <section id="trang-chu" className="relative bg-gradient-to-b from-sky-50 via-white to-white overflow-hidden py-12 sm:py-20 lg:py-28">
      {/* Background Image - Chìm trong nền */}
      <div className="absolute top-0 inset-x-0 h-[420px] sm:h-full z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={storefrontBg}
          alt="Minh Thương Phát Storefront Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top sm:object-center opacity-[0.35] sm:opacity-[0.32] brightness-[0.96] saturate-[0.85] select-none"
        />
        {/* Soft gradient overlay to blend the image seamlessly and preserve text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/20 via-white/60 to-white" />
      </div>

      {/* Absolute decorative backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden z-1">
        <div className="absolute top-10 right-10 w-96 h-96 bg-sky-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-100/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Text / CTAs Content Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100/70 border border-sky-200 rounded-full text-xs font-bold text-sky-850"
            >
              <Zap className="w-3.5 h-3.5 text-sky-600 fill-sky-655" />
              <span>UY TÍN - TẬN TÂM - LẮP ĐẶT NHANH CHÓNG CHUYÊN NGHIỆP</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="font-mono text-xs sm:text-sm font-extrabold text-sky-650 tracking-wider uppercase">
                {info.companyName}
              </p>
              <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-tight">
                Giải Pháp Điện Lạnh <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-900">
                  Tiện Lợi & Chuyên Nghiệp
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Chúng tôi chuyên phân phối, lắp ráp, bảo trì và sửa chữa: <span className="font-semibold text-gray-900">Tủ Lạnh, Máy Lạnh, Máy Giặt & Thiết bị điện công nghiệp</span> cho các hộ gia đình, văn phòng, cửa hàng, cơ quan, xí nghiệp tại Thuận An và toàn tỉnh Bình Dương.
              </p>
            </motion.div>

            {/* Quick trust metrics row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex flex-col items-center lg:items-start p-3 bg-white rounded-xl shadow-xs border border-gray-100">
                <span className="font-mono font-black text-lg sm:text-2xl text-sky-600">30Phút</span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-semibold">Tốc độ phục vụ</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-3 bg-white rounded-xl shadow-xs border border-gray-100">
                <span className="font-mono font-black text-lg sm:text-2xl text-sky-600">100%</span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-semibold">Linh kiện chính hãng</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-3 bg-white rounded-xl shadow-xs border border-gray-100">
                <span className="font-mono font-black text-lg sm:text-2xl text-sky-600">0Đ</span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-semibold">Kiểm tra tận nhà</span>
              </div>
            </motion.div>

            {/* Core Action triggers */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => scrollSection('#dat-lich-hen')}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-sky-750 hover:from-sky-700 hover:to-sky-850 hover:scale-[1.01] text-white py-4 px-8 rounded-xl font-bold transition-all shadow-lg shadow-sky-600/20 text-center cursor-pointer flex items-center justify-center gap-2 group active:scale-95"
                id="hero-btn-book"
              >
                <PhoneCall className="w-4.5 h-4.5 animate-pulse" />
                Đăng Ký Đặt Lịch Sửa Chữa
              </button>
              <button
                onClick={() => scrollSection('#chan-doan-loi')}
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border border-gray-250 py-4 px-8 rounded-xl font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                id="hero-btn-diagnostic"
              >
                <span>Chẩn Đoán Sự Cố Thử</span>
                <ArrowDown className="w-4 h-4 text-sky-600 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-gray-500 pt-2"
            >
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Thâm niên 10+ năm</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><HeartHandshake className="w-4 h-4 text-emerald-500 shrink-0" /> Giá rẻ nhất Bình Dương</span>
            </motion.div>
          </div>

          {/* Right Bento Core Offerings Grid Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-3xl blur-2xl opacity-10 animate-pulse" />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bentoItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onClick={() => scrollSection(item.id)}
                  className={`p-5 rounded-2xl ${item.bgColor} border border-gray-150 shadow-xs cursor-pointer select-none transition-all group duration-250 flex flex-col justify-between hover:shadow-md hover:scale-[1.02]`}
                  id={`hero-bento-card-${idx}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-xs border border-gray-100 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-sky-800 bg-white border border-sky-100 px-2 py-0.5 rounded-full uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-sm sm:text-base text-gray-900 tracking-tight mb-1.5 flex items-center gap-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
