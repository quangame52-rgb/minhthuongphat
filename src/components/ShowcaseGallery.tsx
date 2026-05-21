import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, ShieldCheck, CheckCircle2, ChevronRight, Activity, Zap, Coins } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

// Import local image assets
import thuMuaImg from '../assets/images/thu_mua_may_cu_1779347052315.png';
import warehouseStockImg from '../assets/images/warehouse_stock_1779347084643.png';
import cassetteInstallImg from '../assets/images/cassette_install_1779347119803.png';
import storefrontImg from '../assets/images/real_storefront_bg_1779341715747.png';
import usedAcPavementImg from '../assets/images/used_ac_pavement_1779352903339.png';
import usedFridgeWmImg from '../assets/images/used_fridge_wm_1779352925876.png';
import combinedUsedAppliancesImg from '../assets/images/combined_used_appliances_1779353631352.png';

interface GalleryItem {
  id: string;
  title: string;
  category: 'stock' | 'install' | 'trade';
  categoryLabel: string;
  img: string;
  images?: string[];
  desc: string;
  accent: string;
}

export const ShowcaseGallery: React.FC = () => {
  const { info } = React.useContext(React.createContext<any>({ info: { companyName: 'Điện Lạnh Minh Thương Phát', rawPhone: '0979628168', hotline: '0979.628.168' } })) || useBusiness();
  const [activeTab, setActiveTab] = useState<'all' | 'stock' | 'install' | 'trade'>('all');
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>({});

  const galleryItems: GalleryItem[] = [
    {
      id: 'gallery_4',
      title: 'Trụ Sở Cửa Hàng Minh Thương Phát Thực Tế',
      category: 'install',
      categoryLabel: 'Showroom & Trung tâm bảo hành',
      img: storefrontImg,
      desc: 'Địa chỉ uy tín tại 210A Lê Thị Trung, An Phú, Thuận An, Bình Dương. Điểm giao dịch minh bạch, mua bán sửa chữa tháo lắp và đổi cũ lấy mới an tâm tuyệt đối.',
      accent: '210A Lê Thị Trung'
    },
    {
      id: 'gallery_1',
      title: 'Kho Hàng Máy Lạnh Chính Hãng Dồi Dào',
      category: 'stock',
      categoryLabel: 'Kho hàng / Phân phối',
      img: warehouseStockImg,
      desc: 'Hàng ngàn bộ điều hòa treo tường, tủ đứng, âm trần cassette từ Daikin, LG, Mitsubishi dồi dào sẵn kho phục vụ mọi thầu công trình lẫn gia đình tại Bình Dương.',
      accent: 'Daikin, LG, Mitsubishi'
    },
    {
      id: 'gallery_2',
      title: 'Lắp Đặt Hệ Thống Điều Hòa Âm Trần Cassette',
      category: 'install',
      categoryLabel: 'Lắp đặt chuyên nghiệp',
      img: cassetteInstallImg,
      desc: 'Thi công lắp đặt hệ thống máy lạnh âm trần Midea & Reetech cho văn phòng rộng, nhà máy. Cam kết đường ống thẩm mỹ cao, dốc thoát nước tiêu chuẩn tránh rỉ dột rò nước.',
      accent: 'Mỹ thuật tinh tế'
    },
    {
      id: 'gallery_trade_combined',
      title: 'Thu Mua & Đổi Cũ Lấy Mới Toàn Diện Giá Cao',
      category: 'trade',
      categoryLabel: 'Thu mua cũ hỏng',
      img: combinedUsedAppliancesImg,
      images: [combinedUsedAppliancesImg, usedAcPavementImg, usedFridgeWmImg, thuMuaImg],
      desc: 'MTP sẵn sàng thu mua tận nhà giá cực tốt các dòng máy lạnh cũ hỏng, tháo dỡ máy âm trần, tủ lạnh Side-by-Side cỡ lớn, tủ đông nhà hàng gỉ sét và máy giặt cũ. Hỗ trợ tháo dỡ thấu đáo miễn phí và nâng cấp dòng máy mới với trợ giá Trade-In ưu đãi bậc nhất.',
      accent: 'Điều Hòa - Tủ Lạnh - Máy Giặt'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const tabs = [
    { value: 'all', label: 'Tất Cả Thư Viện' },
    { value: 'stock', label: 'Kho Hàng Bản Hãng' },
    { value: 'install', label: 'Thi Công Lắp Đặt' },
    { value: 'trade', label: 'Thu Mua - Đổi Cũ Mới' }
  ];

  return (
    <section id="thu-vien-hoat-dong" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_35%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section with elegant badges */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 text-sky-400 text-xs font-bold rounded-full border border-sky-500/20 uppercase mb-4">
            <Image className="w-3.5 h-3.5" /> Hình Ảnh Thực Tế - Thật Trực Quan
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Kho Máy Lạnh Nguyên Đai & <br className="hidden sm:inline" />
            Hình Ảnh Thi Công Thu Mua Thực Tế
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 font-sans font-medium">
            Chúng tôi cam kết làm việc hoàn chỉnh từ cái tâm - Hàng hoá dồi dào, thợ tay nghề chuẩn bọc lót kỹ, hình ảnh chính chủ không sao chép mạng ảo!
          </p>
        </div>

        {/* Tab switcher buttons under dark design */}
        <div className="flex items-center justify-center p-1 bg-slate-800 rounded-2xl max-w-2xl mx-auto mb-10 sm:mb-12 border border-slate-700/80 overflow-x-auto gap-1 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={`px-4 sm:px-5 py-3 rounded-xl font-bold font-sans text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${activeTab === tab.value ? 'bg-gradient-to-r from-sky-550 to-sky-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
              id={`tab-gallery-${tab.value}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop dynamic list of gallery with grid transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/40 hover:border-sky-500/50 shadow-lg overflow-hidden flex flex-col group transition-all"
                id={`gallery-card-${item.id}`}
              >
                {/* Visual display image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <span className="absolute top-4 left-4 z-10 inline-block text-[10px] sm:text-xs font-bold px-3 py-1.5 bg-slate-900/90 text-sky-400 rounded-full border border-slate-750 backdrop-blur tracking-wide">
                    {item.categoryLabel}
                  </span>

                  {item.images && item.images.length > 0 ? (
                    <div className="relative w-full h-full">
                      <img
                        src={item.images[currentImageIndexes[item.id] || 0]}
                        alt={`${item.title} - ảnh ${(currentImageIndexes[item.id] || 0) + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-all duration-300 select-none brightness-[0.92] group-hover:brightness-100"
                      />
                      
                      {/* Left/Right navigation controls */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const idx = currentImageIndexes[item.id] || 0;
                          const prevIdx = idx === 0 ? item.images!.length - 1 : idx - 1;
                          setCurrentImageIndexes(prev => ({ ...prev, [item.id]: prevIdx }));
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 flex items-center justify-center text-white text-xs border border-white/15 active:scale-90 transition-all cursor-pointer font-bold font-mono"
                        title="Hình ảnh trước"
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const idx = currentImageIndexes[item.id] || 0;
                          const nextIdx = (idx + 1) % item.images!.length;
                          setCurrentImageIndexes(prev => ({ ...prev, [item.id]: nextIdx }));
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 flex items-center justify-center text-white text-xs border border-white/15 active:scale-90 transition-all cursor-pointer font-bold font-mono"
                        title="Hình ảnh tiếp theo"
                      >
                        &gt;
                      </button>

                      {/* Bullet dots navigator indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur border border-white/5">
                        {item.images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndexes(prev => ({ ...prev, [item.id]: dotIdx }));
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${dotIdx === (currentImageIndexes[item.id] || 0) ? 'bg-sky-400 scale-125' : 'bg-white/45 hover:bg-white/70'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.img}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none brightness-[0.92] group-hover:brightness-100"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-305 bg-sky-950/80 px-2 py-1 rounded border border-sky-900/50 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> {item.accent}
                    </span>
                  </div>
                </div>

                {/* Content description wrapper */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-black text-lg text-white group-hover:text-sky-305 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Highlights and assurances */}
                  <div className="border-t border-slate-700/40 pt-4 mt-5 flex items-center justify-between text-xs font-bold font-sans">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Đảm bảo thẩm mỹ & chất lượng
                    </span>
                    <a
                      href={`https://zalo.me/${info.rawPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-0.5 group/link"
                      id={`link-gallery-${item.id}`}
                    >
                      <span>Tư vấn qua Zalo</span>
                      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner dedicated to used appliance dynamic purchasing service promotion */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-950/70 via-teal-950/60 to-emerald-900/50 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-emerald-900/10 shadow-lg">
          <div className="space-y-3 relative z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-black rounded-full border border-emerald-500/20 uppercase tracking-widest">
              <Coins className="w-3.5 h-3.5 animate-pulse" /> Chiến Dịch Trade-In Đổi Máy Cũ
            </span>
            <h3 className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight leading-snug">
              Nhận Thu Mua Điều Hòa, Tủ Lạnh Cũ Giá Cực Hời <br className="hidden sm:inline"/>
              Đổi Các Máy Mới Inverter Cực Kỳ Ưu Đãi!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium max-w-2xl">
              Hỗ trợ tự tháo dỡ máy cũ hỏng gỉ sét, cồng kềnh miễn phí 100%. Đổi sang dòng điều hòa mới cao cấp Inverter hãng Daikin, LG, Panasonic tích hợp công nghệ làm lạnh nhanh, hỗ trợ bù thêm tiền trả góp ưu đãi lớn nhất tại Thuận An!
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
            <a
              href={`tel:${info.rawPhone}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl text-center active:scale-95 transition-all shadow shadow-emerald-500/25 flex items-center justify-center gap-1.5"
              id="gallery-btn-call"
            >
              📞 Hotline: {info.hotline}
            </a>
            <a
              href={`https://zalo.me/${info.rawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-sans font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl text-center active:scale-95 transition-all flex items-center justify-center gap-1.5"
              id="gallery-btn-zalo"
            >
              💬 Định Giá Qua Zalo
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
