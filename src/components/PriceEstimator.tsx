import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Check, Plus, Minus, Info, ClipboardList, HelpCircle, AlertCircle } from 'lucide-react';
import { PricingItem } from '../types';
import { useBusiness } from '../context/BusinessContext';

const PRICING_LIST: PricingItem[] = [
  // --- AIR CON ---
  { id: 'ac_1', name: 'Vệ sinh Máy Lạnh treo tường (0.5HP - 2.5HP)', price: '150.000', unit: 'Bộ', category: 'air_con' },
  { id: 'ac_2', name: 'Vệ sinh Máy Lạnh Âm trần / Tủ đứng', price: '350.000', unit: 'Bộ', category: 'air_con' },
  { id: 'ac_3', name: 'Sạc ga lạnh bổ sung R32 / R410A (áp suất sụt <30%)', price: '150.000', unit: 'Bộ', category: 'air_con' },
  { id: 'ac_4', name: 'Thông đường thoát nước dột + Xịt thông rong rêu', price: '100.000', unit: 'Lần', category: 'air_con' },
  { id: 'ac_5', name: 'Kiểm tra đo mạch khét + Hàn sửa xì giàn lạnh ống đồng', price: '250.000', unit: 'Điểm', category: 'air_con' },
  { id: 'ac_6', name: 'Thay tụ đề Block (tụ dầu khởi động lực)', price: '350.000', unit: 'Cái', category: 'air_con' },
  
  // --- REFRIGERATOR ---
  { id: 'ref_1', name: 'Thay sò lạnh (cảm biến tuyết) + sò nóng bảo vệ', price: '280.000', unit: 'Cái', category: 'refrigerator' },
  { id: 'ref_2', name: 'Thay sấy điện trở phá băng đông lạnh tủ', price: '320.000', unit: 'Cái', category: 'refrigerator' },
  { id: 'ref_3', name: 'Thay cảm biến nhiệt độ gốc (Thermostat / Sensor)', price: '250.000', unit: 'Cái', category: 'refrigerator' },
  { id: 'ref_4', name: 'Hàn xì + Thay ga tủ lạnh Inverter (ga R600A cao cấp)', price: '650.000', unit: 'Lần', category: 'refrigerator' },
  { id: 'ref_5', name: 'Thay thế bảo trì gioăng đệm cửa tủ hở thoát hơi', price: '180.000', unit: 'Mét', category: 'refrigerator' },
  
  // --- WASHING MACHINE ---
  { id: 'wash_1', name: 'Vệ sinh tháo dời súc xịt Máy giặt cửa trên', price: '280.000', unit: 'Máy', category: 'washing_machine' },
  { id: 'wash_2', name: 'Vệ sinh tháo dời súc xịt Máy giặt cửa ngang (lồng bọc)', price: '450.000', unit: 'Máy', category: 'washing_machine' },
  { id: 'wash_3', name: 'Thay thế van hít cấp nước (loại đơn / đôi hãng)', price: '220.000', unit: 'Cái', category: 'washing_machine' },
  { id: 'wash_4', name: 'Sửa lỗi board xử lý chập chờn kẹt mô tơ', price: '400.000', unit: 'Mạch', category: 'washing_machine' },
  { id: 'wash_5', name: 'Thay bộ 4 ty treo giảm xóc lò xo lồng', price: '350.000', unit: 'Bộ', category: 'washing_machine' },
  { id: 'wash_6', name: 'Thay dây curoa tải lồng giặt (Đức / Nhật sấy)', price: '200.000', unit: 'Sợi', category: 'washing_machine' },

  // --- AIR COOLER ---
  { id: 'cool_1', name: 'Sửa bo mạch điều khiển quạt hơi nước', price: '250.000', unit: 'Mạch', category: 'air_cooler' },
  { id: 'cool_2', name: 'Thay thế bơm hút tuần hoàn nước quạt làm mát', price: '180.000', unit: 'Cái', category: 'air_cooler' },
  { id: 'cool_3', name: 'Bảo dưỡng vệ sinh lốc giàn làm mát xưởng công nghiệp', price: '300.000', unit: 'Bộ', category: 'air_cooler' },

  // --- THU MUA MÁY CŨ GIÁ CAO ---
  { id: 'buy_1', name: 'Thanh lý Máy lạnh treo tường cũ (gỉ sét/hoạt động)', price: '800.000', unit: 'Bộ', category: 'buyback' },
  { id: 'buy_2', name: 'Thanh lý Máy lạnh Tủ đứng / Âm trần cũ hòng', price: '2.500.000', unit: 'Bộ', category: 'buyback' },
  { id: 'buy_3', name: 'Thanh lý Tủ lạnh cũ gia đình (Inverter/Thường)', price: '600.000', unit: 'Cái', category: 'buyback' },
  { id: 'buy_4', name: 'Thanh lý Tủ lạnh Side-By-Side cỡ lớn cũ hỏng dột', price: '1.800.000', unit: 'Cái', category: 'buyback' },
  { id: 'buy_5', name: 'Thanh lý Tủ mát trưng bày siêu thị / Tủ đông nắp kính', price: '3.000.000', unit: 'Cái', category: 'buyback' },
  { id: 'buy_6', name: 'Thanh lý Máy giặt cửa ngang / cửa trên gỉ sét', price: '500.000', unit: 'Cái', category: 'buyback' }
];

interface PriceEstimatorProps {
  onAddEstimateToBooking: (servicesText: string, totalPrice: number) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onAddEstimateToBooking }) => {
  const { info } = useBusiness();
  const [activeTab, setActiveTab] = useState<'air_con' | 'refrigerator' | 'washing_machine' | 'air_cooler' | 'buyback'>('air_con');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  const tabLabels = [
    { value: 'air_con', label: 'Máy Lạnh (Điều Hòa)' },
    { value: 'refrigerator', label: 'Tủ Lạnh / Tủ Đông' },
    { value: 'washing_machine', label: 'Máy Giặt / Máy Sấy' },
    { value: 'air_cooler', label: 'Quạt Hơi / Máy Làm Mát' },
    { value: 'buyback', label: 'Thu Mua Máy Cũ 💰' }
  ];

  const currentPricingItems = PRICING_LIST.filter((item) => item.category === activeTab);

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (next[itemId]) {
        delete next[itemId];
      } else {
        next[itemId] = 1;
      }
      return next;
    });
  };

  const handleUpdateQty = (itemId: string, direction: 'up' | 'down') => {
    if (!selectedItems[itemId]) return;
    setSelectedItems((prev) => {
      const next = { ...prev };
      const currentVal = next[itemId];
      if (direction === 'up') {
        next[itemId] = currentVal + 1;
      } else {
        if (currentVal > 1) {
          next[itemId] = currentVal - 1;
        } else {
          delete next[itemId];
        }
      }
      return next;
    });
  };

  // Convert "150.000" or raw numbers to actual calculation values
  const getParsedPrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\./g, ''), 10);
  };

  const selectedItemsDetails = PRICING_LIST.filter((item) => !!selectedItems[item.id]);

  const totalCosts = selectedItemsDetails
    .filter((item) => item.category !== 'buyback')
    .reduce((sum, item) => sum + getParsedPrice(item.price) * (selectedItems[item.id] || 0), 0);

  const totalCredits = selectedItemsDetails
    .filter((item) => item.category === 'buyback')
    .reduce((sum, item) => sum + getParsedPrice(item.price) * (selectedItems[item.id] || 0), 0);

  const isRefund = totalCredits > totalCosts;
  const netTotal = Math.abs(totalCosts - totalCredits);

  const handleExportEstimate = () => {
    if (selectedItemsDetails.length === 0) return;
    const descText = selectedItemsDetails
      .map((item) => `${item.name} (SL: ${selectedItems[item.id]})`)
      .join(', ');
    onAddEstimateToBooking(
      isRefund 
        ? `[Thu Mua / Đối Trừ Cũ Mới] ${descText}` 
        : descText,
      isRefund ? -netTotal : netTotal
    );
    
    // Smooth scroll down to booking section
    const el = document.querySelector('#dat-lich-hen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="bang-gia" className="py-16 sm:py-24 bg-gradient-to-b from-white to-sky-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header explaining transparency */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-850 text-xs font-bold rounded-full border border-sky-200 uppercase mb-4">
            <Calculator className="w-3.5 h-3.5" /> Báo giá minh bạch công khai
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
            Tra Cứu Bảng Giá & Dự Toán Chi Phí
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 font-sans font-medium">
            Nói không với gian dối, nói không với thổi phồng bệnh vẽ tiền! Dưới đây là khung bảng giá sàn được cập nhật niên khóa 2026 chính xác và minh bạch nhất từ {info.companyName}.
          </p>
        </div>

        {/* Tab selection widgets */}
        <div className="flex items-center justify-center p-1.5 bg-gray-100/80 backdrop-blur rounded-2xl max-w-3xl mx-auto mb-8 border border-gray-150 overflow-x-auto gap-1 scrollbar-none">
          {tabLabels.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={`px-4 sm:px-6 py-3.5 rounded-xl font-bold font-sans text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${activeTab === tab.value ? 'bg-white text-sky-900 shadow-sm' : 'text-gray-500 hover:text-gray-950 hover:bg-white/40'}`}
              id={`tab-pricing-${tab.value}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Calculator Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Pricing check sheet */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-3">
            <h3 className="font-sans font-extrabold text-gray-900 text-lg sm:text-xl flex items-center gap-2 mb-4">
              <ClipboardList className="w-5.5 h-5.5 text-sky-600" /> Chọn Các Hạng Mục Cần Sửa Chữa
            </h3>

            <div className="divide-y divide-gray-100 max-h-[480px] overflow-y-auto pr-1">
              {currentPricingItems.map((item) => {
                const isSelected = !!selectedItems[item.id];
                const qty = selectedItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`py-3.5 flex items-center justify-between gap-4 cursor-pointer select-none group border-b border-gray-55 ${isSelected ? 'bg-sky-50/20 px-3 rounded-xl border border-sky-100' : 'hover:bg-gray-50/50 px-3'}`}
                    id={`price-row-${item.id}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Check box indicator */}
                      <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-gray-300 bg-white group-hover:border-sky-450'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <div>
                        <p className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${isSelected ? 'text-sky-950' : 'text-gray-700 group-hover:text-sky-900'}`}>
                          {item.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-sky-600 font-extrabold mt-0.5">
                          Đơn Giá: {item.price}đ / {item.unit}
                        </p>
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    {isSelected && (
                      <div
                        className="flex items-center bg-white border border-sky-200 rounded-lg overflow-hidden select-none shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleUpdateQty(item.id, 'down')}
                          className="p-1 px-2.5 bg-gray-55 hover:bg-gray-100 text-gray-550 font-bold active:bg-gray-200"
                          id={`qty-down-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-mono text-xs font-black text-sky-950">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item.id, 'up')}
                          className="p-1 px-2.5 bg-gray-55 hover:bg-gray-100 text-gray-550 font-bold active:bg-gray-200"
                          id={`qty-up-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-amber-700 font-bold bg-amber-50 p-3 rounded-xl border border-amber-100 mt-4">
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
              <span>Giá thực tế có thể dao động nhẹ tùy thuộc vào vị trí lắp ráp trên cao khó thi công nguy hiểm, hoặc độ bục xì nặng của giàn điều hòa mục nát! Thợ luôn báo giá trước khi làm.</span>
            </div>
          </div>

          {/* Right Live Estimate Recipient Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-sky-900 rounded-2xl p-6 text-white border border-sky-800 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              {/* Background ambient mesh */}
              <div className="absolute inset-0 bg-radial-gradient-slate opacity-10 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-sky-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5.5 h-5.5 text-sky-300" />
                    <span className="font-sans font-bold text-sm tracking-wide text-sky-200 uppercase">Hóa Đơn Dự Toán Sơ Bộ</span>
                  </div>
                  <span className="text-[10px] font-mono bg-sky-800 border border-sky-750 text-sky-300 py-1 px-2.0 rounded font-semibold uppercase">
                    MTP BÌNH DƯƠNG
                  </span>
                </div>

                {selectedItemsDetails.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <ClipboardList className="w-12 h-12 text-sky-800 mx-auto" />
                    <p className="text-sky-350 text-xs sm:text-sm font-semibold">Hiện chưa chọn dịch vụ nào</p>
                    <p className="text-sky-400 text-[10px] sm:text-xs max-w-[240px] mx-auto">
                      Hãy bấm chọn các công việc tương ứng ở bảng bên trái để khởi tạo hóa đơn tính tiền!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5 mb-6 max-h-[220px] overflow-y-auto pr-1">
                    {selectedItemsDetails.map((item, idx) => {
                      const qty = selectedItems[item.id] || 0;
                      const singlePrice = getParsedPrice(item.price);
                      return (
                        <div key={idx} className="flex justify-between items-start text-xs border-b border-sky-850 pb-2 gap-2" id={`invoice-item-${idx}`}>
                          <div className="max-w-[200px]">
                            <p className="font-semibold text-white leading-snug">{item.name}</p>
                            <span className="text-[10px] text-sky-305 font-mono">{item.price}đ x {qty} {item.unit}</span>
                          </div>
                          <span className="font-mono text-white font-extrabold shrink-0">
                            {(singlePrice * qty).toLocaleString('vi-VN')} đ
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Total output */}
              <div className="relative border-t border-sky-800 pt-5 space-y-3.5">
                {totalCosts > 0 && (
                  <div className="flex justify-between items-center text-xs text-sky-200">
                    <span>Phí dịch vụ sửa chữa khác:</span>
                    <span className="font-mono">{totalCosts.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                {totalCredits > 0 && (
                  <div className="flex justify-between items-center text-xs text-emerald-450 font-bold">
                    <span>Thanh toán máy cũ thu mua:</span>
                    <span className="font-mono">+{totalCredits.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs sm:text-sm font-bold text-sky-200 uppercase">
                    {isRefund ? 'MTP Thanh toán cho quý khách:' : 'Tổng chi phí thực thu thanh toán:'}
                  </span>
                  <span className={`font-mono text-2xl sm:text-3xl font-black ${isRefund ? 'text-emerald-400' : 'text-amber-450'} tracking-tight`}>
                    {netTotal.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>

                <button
                  type="button"
                  disabled={selectedItemsDetails.length === 0}
                  onClick={handleExportEstimate}
                  className={`w-full py-3.5 rounded-xl font-sans font-black text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-md ${selectedItemsDetails.length === 0 ? 'bg-sky-800 text-sky-400 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-orange-550 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/10'}`}
                  id="btn-apply-estimate"
                >
                  {isRefund ? 'ĐẶT LỊCH YÊU CẦU THU MUA' : 'ÁP DỤNG CHI PHÍ & ĐẶT LỊCH NGAY'}
                </button>

                <p className="text-center text-[10px] text-sky-350">
                  🎁 Ưu đãi: Giảm thêm 5% khi hoàn thành trên 2 hạng mục trong cùng một lần thi công!
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
