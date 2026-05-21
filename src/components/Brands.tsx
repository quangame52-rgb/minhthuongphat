import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const Brands: React.FC = () => {
  const { info } = useBusiness();
  const brands = [
    { name: 'DAIKIN', desc: 'Chủ lực biến tần inverter', color: 'text-sky-600', border: 'border-sky-200' },
    { name: 'MITSUBISHI', desc: 'Bền bỉ nồi đồng cối đá', color: 'text-red-700', border: 'border-red-200' },
    { name: 'TOSHIBA', desc: 'Êm ái, chạy siêu tiết kiệm', color: 'text-rose-600', border: 'border-rose-200' },
    { name: 'LG', desc: 'Thẩm mỹ cao, làm lạnh nhanh', color: 'text-fuchsia-700', border: 'border-fuchsia-200' },
    { name: 'AQUA', desc: 'Thân thiện, giá tốt dễ thay thế', color: 'text-blue-700', border: 'border-blue-200' },
    { name: 'PANASONIC', desc: 'Lọc khí sạch nanoe cao cấp', color: 'text-cyan-800', border: 'border-cyan-200' },
    { name: 'SAMSUNG', desc: 'Công nghệ WindFree độc quyền', color: 'text-indigo-800', border: 'border-indigo-200' },
  ];

  return (
    <div id="thuong-hieu" className="bg-gray-50 border-y border-gray-150 py-10 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section explanatory header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <p className="font-mono text-[10px] sm:text-xs font-bold text-sky-600 tracking-wider uppercase flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" /> Đối tác tin cậy
          </p>
          <h2 className="font-sans font-extrabold text-lg sm:text-xl md:text-2xl text-gray-900 tracking-tight">
            Thương Hiệu Phân Phối, Đối Tác Lắp LắpĐặt & Bảo Trì Ủy Quyền
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            {info.companyName} cam kết cung cấp thiết bị chính hãng và linh kiện nhập khẩu 100% từ các hãng danh tiếng.
          </p>
        </div>

        {/* Dynamic wrapping logo list */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 justify-center items-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl p-3.5 border ${brand.border} text-center flex flex-col justify-center items-center h-20 shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-default select-none group`}
              id={`brand-card-${idx}`}
            >
              <span className={`font-sans font-black text-sm tracking-widest ${brand.color} group-hover:scale-105 transition-transform`}>
                {brand.name}
              </span>
              <span className="text-[9px] font-medium text-gray-500 font-sans mt-1 leading-tight group-hover:text-sky-900 transition-colors">
                {brand.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic note explaining images */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-[10px] sm:text-xs text-emerald-650 font-bold bg-white max-w-2xl mx-auto px-4 py-2 rounded-full border border-emerald-100">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>Hình ảnh kho hàng thực tế của chúng tôi luôn sẵn đầy đủ các phân khúc máy lạnh Daikin, Asanzo, Mitsubishi Heavy mới nguyên đai nguyên kiện!</span>
        </div>

      </div>
    </div>
  );
};
