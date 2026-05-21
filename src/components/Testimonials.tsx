import React from 'react';
import { Star, UserCheck, ShieldAlert, Award, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';
import { useBusiness } from '../context/BusinessContext';

export const Testimonials: React.FC = () => {
  const { info } = useBusiness();
  const reviews: Testimonial[] = [
    {
      id: 'rev_1',
      name: 'Anh Hoàng Quốc Bảo',
      role: 'Chủ Cửa hàng Ăn uống - Phường An Phú, Thuận An',
      content: `Tủ đông đựng thịt bị mất lạnh bất ngờ lúc 8h tối khiến tôi rất hoảng. Gọi điện sang ${info.companyName} thì chỉ đúng 20 phút sau có anh thợ mang dụng cụ đến thay ngay rơle nhiệt. Thịt cá vẫn tươi nguyên, giá cực bình dân. Rất cảm ơn ${info.companyName}!`,
      rating: 5,
      date: '12/04/2026',
      tag: 'Cứu Hộ Khẩn Cấp'
    },
    {
      id: 'rev_2',
      name: 'Chị Nguyễn Thụy Vy',
      role: 'Hộ Gia Đình - Đường Lê Thị Trung, Bình Dương',
      content: `Trước đây tôi rất ngại gọi thợ vãng lai vì hay bị vẽ bệnh đòi thay ga khống tiền triệu dọa cháy nổ dột nước. Nhưng đội ${info.companyName} thì cực thoải mái, kiểm tra báo giá trước miễn phí, ưng mới sửa. Vừa rồi vệ sinh máy lạnh inverter chỉ 150k chạy siêu êm, sạch bong không còn dột chảy một nhọt nước nào!`,
      rating: 5,
      date: '02/05/2026',
      tag: 'Vệ Sinh Giá Rẻ'
    },
    {
      id: 'rev_3',
      name: 'Anh Trần Minh Trí',
      role: 'Quản Lý Bảo Trì - Hộ Kinh Doanh Giặt Ủi Thuận An',
      content: 'Tôi vận hành 5 máy giặt công suất lồng ngang lớn hay bị lỗi xả nước và rung lắc dấy khét curoa. Đội MTP đến hỗ trợ cân chỉnh lại lò xo treo lồng giặt và bảo dưỡng ổ bi phớt phao trục cực kỳ bài bản. Có xuất hóa đơn đỏ công ty đẩy đủ, thợ mặc đúng giày bảo hộ rất chỉn chu chuyên nghiệp.',
      rating: 5,
      date: '19/05/2026',
      tag: 'Máy Giặt Công Nghiệp'
    }
  ];

  return (
    <section id="tai-sao-chon" className="py-16 sm:py-24 bg-gray-50 border-t border-gray-150 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section explanations heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-805 text-xs font-bold rounded-full border border-emerald-150 uppercase mb-4">
            <Award className="w-3.5 h-3.5" /> Thợ giỏi có tâm hàng đầu tỉnh
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
            Khách Hàng Đánh Giá Thực Tế Về Chúng Tôi
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-sans font-semibold">
            Chất lượng dệt nên uy tín thương hiệu. Trên 5000+ lượt khách hàng hộ gia đình, cửa sự nghiệp điều phối thợ {info.companyName} đã được gieo mầm hạnh phúc thành công.
          </p>
        </div>

        {/* Reviews Grid Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all relative overflow-hidden"
              id={`review-card-${rev.id}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full blur-2xl pointer-events-none -mr-6 -mt-6" />

              <div className="relative">
                {/* Visual Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-450 text-amber-450 shrink-0" />
                  ))}
                  <span className="ml-2 inline-block text-[10px] sm:text-xs text-sky-850 font-bold bg-sky-50 border border-sky-100 py-0.5 px-2 rounded-full">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-gray-75 * leading-relaxed font-sans font-medium text-xs sm:text-sm italic mb-6">
                  "{rev.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="relative border-t border-gray-100 pt-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-150 flex items-center justify-center font-black text-sky-700 font-sans text-sm shrink-0">
                  {rev.name.charAt(rev.name.lastIndexOf(' ') + 1)}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1.5">
                    {rev.name}
                    <UserCheck className="w-4 h-4 text-emerald-550 shrink-0" />
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium font-sans leading-tight mt-0.5">
                    {rev.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Core Promises Row */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-sky-800 to-sky-950 text-white rounded-3xl p-6 sm:p-10 border border-sky-750 shadow-xl max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
          <div className="relative grid sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left items-center divide-y sm:divide-y-0 sm:divide-x divide-sky-700/60">
            
            <div className="space-y-1 p-2 sm:p-0">
              <span className="text-amber-400 font-mono font-black text-2xl tracking-normal">BÁO GIÁ ĐÚNG</span>
              <h4 className="font-sans font-bold text-sm text-sky-100 mt-1">Dịch Vụ Có Khung Giá Sàn</h4>
              <p className="text-xs text-sky-305 leading-relaxed font-sans">
                Thợ kiểm định lỗi chuẩn xác, báo nguyên nhân, đề xuất phương án và giá sàn công khai trước khi tiến hành sửa đổi.
              </p>
            </div>

            <div className="space-y-1 p-2 sm:p-2 sm:pl-8">
              <span className="text-amber-400 font-mono font-black text-2xl tracking-normal">BẢO HÀNH THỜI HẠN</span>
              <h4 className="font-sans font-bold text-sm text-sky-100 mt-1">3 Đến 12 Tháng Trực Tiếp</h4>
              <p className="text-xs text-sky-305 leading-relaxed font-sans">
                Sau khi sửa bàn giao, thợ ghi dán tem bảo hành và phiếu ký. Bất kì sự cố phát sinh lại, chúng tôi xử lý miễn phí 100%.
              </p>
            </div>

            <div className="space-y-1 p-2 sm:p-2 sm:pl-8">
              <span className="text-amber-400 font-mono font-black text-2xl tracking-normal">THỢ LÀNH NGHỀ</span>
              <h4 className="font-sans font-bold text-sm text-sky-100 mt-1">Nhiệt Tình Lâu Năm Chăm Chỉ</h4>
              <p className="text-xs text-sky-305 leading-relaxed font-sans">
                Thợ kỹ thuật viên của {info.companyName} đều được đào tạo trường lớp chính quy, cư xử văn minh lịch sự và luôn dọn dẹp vệ sinh sạch sẽ gian nội thất sảnh của bạn!
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
