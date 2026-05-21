import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Refrigerator, Disc, Wrench, Building, Factory, ShieldCheck, Check, ChevronDown, ChevronUp, Clock, Tag, Coins } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { info } = useBusiness();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const servicesList = [
    {
      id: 'ac',
      title: 'Dịch vụ Máy Lạnh / Điều Hòa',
      sub: 'Lắp ráp - Bảo dưỡng - Sửa chữa khẩn cấp',
      icon: <Snowflake className="w-10 h-10 text-sky-600" />,
      tag: 'Phổ biến nhất',
      tagColor: 'bg-sky-100 text-sky-850 border-sky-200',
      desc: 'Chuyên giải quyết mọi vấn đề về điều hòa treo tường, điều hòa âm trần Cassette, điều hòa tủ đứng. Đội ngũ lâu năm dứt điểm bệnh sau 1 lần sửa chữa.',
      checklist: [
        'Vệ sinh bơm xịt dàn nóng & dàn lạnh lồng sóc',
        'Kiểm tra áp suất gas, sạc nạp ga lạnh R32, K410, R22',
        'Khắc phục máy lạnh chảy nước máng thoát ngược sàn',
        'Xử lý dàn lạnh bám tuyết dày, block dàn nóng gầm rú',
        'Hàn vá ống đồng rò rỉ xì gas, bọc bảo ôn cách nhiệt',
        'Kiểm tra rơle quá nhiệt block, sửa board mạch xử lý'
      ],
      duration: '45 - 90 phút',
      warranty: '3 - 12 tháng',
      target: 'Gia đình, Cửa hàng, Văn phòng'
    },
    {
      id: 'fridge',
      title: 'Dịch vụ Tủ Lạnh / Tủ Đông',
      sub: 'Chữa nhanh mất lạnh - Không đông đá',
      icon: <Refrigerator className="w-10 h-10 text-indigo-600" />,
      tag: 'Khẩn cấp 24/7',
      tagColor: 'bg-indigo-150 text-indigo-900 border-indigo-250',
      desc: 'Tủ lạnh đóng vai trò cốt lõi dự trữ thực phẩm. Chúng tôi hỗ trợ sửa nhanh các dòng tủ lạnh Side-by-side, tủ lạnh Inverter tiết kiệm điện, tủ mát trưng bày.',
      checklist: [
        'Thay lò xo khởi động, sò lạnh, sò nóng sấy đá',
        'Sửa timer điều khiển xả đá điện tử, điện trở sấy',
        'Bơm nạp sạc ga tủ lạnh chính hãng độ lạnh sâu',
        'Xử lý tủ lạnh chảy nước gầm tủ hoặc ngập rau củ',
        'Thay gioăng đệm cao su đóng hở thoát hơi lạnh',
        'Sửa block, hàn xì dán vá giàn lạnh bục mục ấm'
      ],
      duration: '60 - 120 phút',
      warranty: '6 - 12 tháng',
      target: 'Hộ gia đình, Quán ăn, Hộ kinh doanh'
    },
    {
      id: 'washer',
      title: 'Dịch vụ Máy Giặt / Máy Sấy',
      sub: 'Súc rửa lồng giặt - Khắc phục mạch giặt',
      icon: <Disc className="w-10 h-10 text-teal-600 animate-spin-slow" />,
      tag: 'Dịch vụ tại chỗ',
      tagColor: 'bg-teal-100 text-teal-900 border-teal-200',
      desc: 'Vệ sinh và sửa chữa phục hồi máy giặt cửa ngang, máy giặt cửa trên. Cung cấp quy trình súc rửa hóa chất lồng giặt diệt khuẩn xơ vải bốc mùi hôi.',
      checklist: [
        'Súc xịt tháo dời lồng giặt vệ sinh chuyên sâu',
        'Sửa bo mạch máy giặt báo lỗi chớp đèn liên tục',
        'Khắc phục giặt xong không chịu vắt sấy li tâm',
        'Thay dây curoa truyền động bớt trùng két két',
        'Thay van xả thoát nước kẹt dị vật, thay phao nước',
        'Thay thế bộ 4 ty treo lò xo giảm xóc chống nảy mạnh'
      ],
      duration: '60 - 90 phút',
      warranty: '3 - 6 tháng',
      target: 'Gia đình, Tiệm giặt ủi, Khách sạn'
    },
    {
      id: 'enterprise',
      title: 'Điện Lạnh Cơ Quan & Xí Nghiệp',
      sub: 'Hợp đồng bảo trì định kỳ trọn gói',
      icon: <Building className="w-10 h-10 text-amber-600" />,
      tag: 'Giá đại lý xưởng',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-250',
      desc: 'Cung cấp năng lực kỹ thuật cao xử lý hệ thống điều hòa không khí trung tâm VRV, Chiller công nghiệp lớn, quạt làm mát xưởng, điều hòa âm trần hãng.',
      checklist: [
        'Hợp đồng bảo dưỡng định kỳ xuất hóa đơn VAT',
        'Vệ sinh hệ thống làm mát Cooling Tower xí nghiệp',
        'Lắp đặt hệ thống máy sấy khí quạt hút công nghiệp',
        'Có thợ túc trực giải quyết sự cố tức thì tại chỗ',
        'Giá cả chiết khấu tốt cho quản lý, bảo trì xưởng',
        'Đội ngũ kỹ thuật thi công mặc trang phục bảo hộ chuẩn'
      ],
      duration: 'Theo quy mô khảo sát',
      warranty: '6 - 24 tháng',
      target: 'Doanh nghiệp, Xí nghiệp, Cơ quan hành chính'
    },
    {
      id: 'buyback',
      title: 'Thu Mua & Trao Đổi Máy Cũ Giá Cao',
      sub: 'Thu mua tủ lạnh, điều hòa, máy giặt cũ hỏng tận nơi',
      icon: <Coins className="w-10 h-10 text-emerald-600" />,
      tag: 'Giá tốt nhất',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-250',
      desc: 'Điện lạnh Minh Thương Phát hỗ trợ thu mua tận nhà giá cực cao các loại máy lạnh cũ hỏng, tủ lạnh Side-by-side, tủ đông, máy giặt. Đổi cũ lấy mới (Trade-In) trợ giá ưu đãi.',
      checklist: [
        'Thu mua máy lạnh cũ các loại (treo tường, tủ đứng, âm trần)',
        'Thanh lý tủ lạnh cũ hỏng, tủ đông, tủ mát trưng bày nhà hàng',
        'Thu mua máy giặt cửa ngang, cửa trên cũ hỏng giá cực hời',
        'Dịch vụ tháo dỡ, vận chuyển tận nhà hoàn toàn miễn phí',
        'Thanh lý trọn gói hệ thống điều hòa văn phòng, nhà xưởng',
        'Thủ tục định giá nhanh gọn 24/7 qua cuộc gọi hoặc Zalo ảnh chụp'
      ],
      duration: 'Định giá trong 15 phút',
      warranty: 'Thu mua tận nơi miễn phí',
      target: 'Gia đình, Nhà hàng, Công ty, Khách sạn'
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="dich-vu" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Label */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-full border border-sky-100 uppercase mb-4">
            <Wrench className="w-3.5 h-3.5" /> Dịch vụ chúng tôi cung cấp
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
            Chuyên Phân Phối, Lắp Ráp & Bảo Trì <br className="hidden sm:inline"/>
            Điện Lạnh Từ Gia Dụng Đến Công Nghiệp
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-sans font-medium">
            {info.companyName} hỗ trợ kiểm tra tận nơi hoàn toàn miễn phí tại khu vực Thuận An, Bình Dương. Chỉ tính phí khi bắt tay tiến hành sửa chữa, linh kiện chính hãng bảo hành dài lâu.
          </p>
        </div>

        {/* Services Layout Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {servicesList.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border ${isExpanded ? 'border-sky-500 ring-2 ring-sky-500/10' : 'border-gray-200'} shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                id={`service-block-${service.id}`}
              >
                <div className="p-6 sm:p-8">
                  {/* Card upper info heading */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 shrink-0">
                      {service.icon}
                    </div>
                    <span className={`inline-block text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${service.tagColor}`}>
                      {service.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-extrabold text-lg sm:text-xl text-gray-900 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="font-mono text-xs text-sky-650 font-bold tracking-wide mt-0.5 mb-3">
                      {service.sub}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium mb-5">
                      {service.desc}
                    </p>
                  </div>

                  {/* Toggle list detailed accordions with motion */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="w-full flex items-center justify-between text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 cursor-pointer active:scale-[0.98] select-none"
                      id={`btn-expand-${service.id}`}
                    >
                      <span>{isExpanded ? 'Ẩn các hạng mục chi tiết' : 'Xem các hạng mục xử lý và bảng giá'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-2.5">
                            <p className="text-[10px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-sky-600" /> Các công việc chúng tôi tiếp nhận sửa chữa:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 font-medium font-sans">
                              {service.checklist.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-1.5 p-1 px-1.5 hover:bg-gray-50 rounded" id={`service-item-${service.id}-${idx}`}>
                                  <span className="text-emerald-550 font-bold shrink-0">✓</span>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>

                            {/* Service metrics specifications */}
                            <div className="bg-sky-50/65 rounded-xl p-3 border border-sky-100 mt-4 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs">
                              <div>
                                <span className="block text-gray-500 font-medium">Thời gian hoàn thành</span>
                                <span className="font-extrabold text-sky-900 flex items-center justify-center gap-1 mt-0.5"><Clock className="w-3.5 h-3.5 text-sky-650" /> {service.duration}</span>
                              </div>
                              <div className="border-x border-sky-150">
                                <span className="block text-gray-500 font-medium">Thời hạn bảo hành</span>
                                <span className="font-extrabold text-sky-900 flex items-center justify-center gap-1 mt-0.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-650" /> {service.warranty}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 font-medium">Phân khúc đối tượng</span>
                                <span className="font-extrabold text-sky-900 flex items-center justify-center gap-1 mt-0.5"><Tag className="w-3.5 h-3.5 text-indigo-500" /> {service.target}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Final quick card booking trigger */}
                <div className="px-6 sm:px-8 py-4 bg-sky-50/40 border-t border-gray-150 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs text-emerald-700 font-extrabold">Miễn phí 100% công kiểm tra tại nhà!</span>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-all flex items-center gap-1 shadow-xs hover:scale-[1.02] cursor-pointer"
                    id={`btn-select-svc-${service.id}`}
                  >
                    <span>Chọn và đặt dịch vụ này</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
