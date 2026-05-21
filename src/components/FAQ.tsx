import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: React.FC = () => {
  const { info } = useBusiness();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      q: 'Chi phí thợ đến kiểm tra tận nhà tại Bình Dương có mất tiền đi lại không?',
      a: `Hoàn toàn KHÔNG MẤT PHÍ. Tại ${info.companyName}, chi phí kiểm tra và chuẩn đoán bắt bệnh tại nhà là 0đ. Nếu thợ kiểm tra xong dải trình trạng máy lỗi, báo phân tích rủi ro mà bạn chưa muốn sửa chữa ngay thì thợ sẽ vui vẻ thu dọn kĩ lưu lồng, chào bạn ra về và tuyệt đối không thu của bạn bất kì một đồng lộ phí đi đường nào!`
    },
    {
      q: `Chính sách bảo hành sau sửa chữa được ${info.companyName} cam kết như thế nào?`,
      a: `Sau khi dứt điểm bàn giao thiết bị chạy êm lành, thợ sẽ dán trực tiếp tem vỡ bảo hành chính hiệu ${info.companyName} và ghi phiếu biên nhận. Thời hạn bảo hành cam kết từ 3 đến 12 tháng (tùy hạng mục linh kiện thay thế). Trong thời hạn bảo hành, nếu linh kiện lắp đặt có phát sinh bất kì hỏng hóc lặp lại, chúng tôi cử thợ tức tốc xử lý đổi mới miễn phí hoàn toàn 100%, chịu trách nhiệm tới cùng và không tìm lý do thoái thác.`
    },
    {
      q: 'Thời gian thợ kỹ thuật di chuyển tới nhà tôi mất bao lâu sau khi chốt cuộc hẹn?',
      a: `Trụ sở cửa hàng chính của chúng tôi nằm tại địa chỉ ${info.address}. Nhờ lợi thế vị trí, thợ sửa chữa túc trực của chúng tôi thường có mặt cực kỳ nhanh chóng trong vòng 20 - 30 phút đối với phạm vi Thuận An, Dĩ An. Các khu vực lân cận như Thủ Dầu Một, Tân Uyên sảnh chỉ mất khoảng 40 - 50 phút di chuyển.`
    },
    {
      q: `Cơ quan, xí nghiệp lớn tại các khu công nghiệp Bình Dương có được xuất báo giá chi tiết và hóa đơn VAT không?`,
      a: `Hoàn toàn ĐẦY ĐỦ. ${info.companyName} vốn có thế mạnh lớn về mảng hỗ trợ hệ thống điện lạnh trung tâm, máy giặt xấy lớn, nồi hơi làm mát xưởng của các quý doanh nghiệp. Chúng tôi cung cấp làm báo giá cạnh tranh chi tiết có đóng dấu mộc sảnh, soạn thảo hợp đồng cam kết bảo dưỡng định kỳ trọn gói hàng tháng/quý và xuất hóa đơn giá trị gia tăng (VAT) điện tử chuẩn chỉ tức thời.`
    },
    {
      q: `${info.companyName} có hỗ trợ làm sạch/vệ sinh máy lạnh chạy ngoài giờ hành chính (buổi tối hoặc chủ nhật) không?`,
      a: `CÓ. Nhằm san sẻ thời gian tấp nập mệt mỏi của quý khách hành chính công sở, hệ thống thợ trực ban của chúng tôi hoạt động xuyên suốt cả thứ Bảy, Chủ Nhật và hỗ trợ làm ngoài giờ hành chính lên tới ${info.workingHours.split(' ')[0] || '20h30'}. Quý khách có thể thoải mái đăng ký mốc mọc giờ phù hợp nhất thông qua biểu mẫu đặt lịch trực tuyến phía trên và đặc biệt KHÔNG TÍNH PHỤ PHÍ ngoài giờ!`
    }
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="cau-hoi-faq" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-full border border-sky-100 uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Giải đáp thắc mắc khách hàng
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
            Những Câu Hỏi Thường Gặp Nhất
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 font-sans font-medium">
            Chúng tôi luôn lắng nghe và làm việc với triết lý trung thực tối thượng. Dưới đây là những băn khoăn phổ biến của quý khách hàng trước khi trao gửi niềm tin cho {info.companyName}.
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border ${isOpen ? 'border-sky-500 ring-1 ring-sky-500/10' : 'border-gray-200'} overflow-hidden transition-all duration-300 shadow-xs`}
                id={`faq-accordion-block-${idx}`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 font-sans font-extrabold text-gray-800 hover:text-sky-900 cursor-pointer select-none"
                  id={`faq-btn-trigger-${idx}`}
                >
                  <span className="text-sm sm:text-base leading-snug">{item.q}</span>
                  <div className="p-1 bg-gray-50 rounded-lg border border-gray-150 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-sky-600" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-100 pt-4 bg-sky-50/20 text-xs sm:text-sm text-gray-650 leading-relaxed font-sans font-medium">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Interactive feedback bubble hint */}
        <div className="mt-12 text-center bg-sky-50 rounded-2xl max-w-2xl mx-auto p-5 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 bg-sky-650 text-white rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-sky-950">Câu hỏi của bạn không nằm trong danh sách?</h4>
              <p className="text-[11px] sm:text-xs text-gray-500">MTP trực ban hỗ trợ giải đáp nhanh mọi sự cố 24/7 tức thời.</p>
            </div>
          </div>
          <a
            href={`tel:${info.rawPhone}`}
            className="bg-orange-550 hover:bg-orange-600 hover:scale-[1.01] text-white font-sans font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
            id="faq-btn-direct-tel"
          >
            Gọi Trao Đổi Ngay
          </a>
        </div>

      </div>
    </section>
  );
};
