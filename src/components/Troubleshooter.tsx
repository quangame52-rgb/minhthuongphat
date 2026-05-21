import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, ChevronRight, RefreshCw, CheckCircle, AlertTriangle, MessageSquare, FlameKindling, Info } from 'lucide-react';
import { DiagnosticNode } from '../types';
import { useBusiness } from '../context/BusinessContext';

const DIAGNOSTIC_DATA: Record<string, DiagnosticNode> = {
  start: {
    id: 'start',
    question: 'Bạn muốn kiểm tra sự cố cho thiết bị nào?',
    options: [
      { text: 'Máy lạnh (Điều hòa)', nextId: 'ac_main' },
      { text: 'Tủ lạnh / Tủ đông', nextId: 'fridge_main' },
      { text: 'Máy giặt', nextId: 'washer_main' },
    ],
  },
  // --- AIR CONDITIONER FLOW ---
  ac_main: {
    id: 'ac_main',
    question: 'Máy lạnh đang gặp hiện tượng chính nào sau đây?',
    options: [
      { text: 'Máy hoạt động nhưng không lạnh hoặc lạnh rất yếu', nextId: 'ac_not_cool' },
      { text: 'Dàn lạnh bị chảy nước thành giọt xuống sàn', nextId: 'ac_leak' },
      { text: 'Khởi động không lên, không nghe thấy tiếng bíp', nextId: 'ac_no_power' },
      { text: 'Máy phát ra tiếng kêu rất to hoặc rung lắc khi chạy', nextId: 'ac_noise' },
    ],
  },
  ac_not_cool: {
    id: 'ac_not_cool',
    question: 'Gió từ máy thổi ra có mát một chút nào không, và cục nóng ngoài trời có chạy không?',
    options: [
      {
        text: 'Có gió nhưng hoàn toàn ấm, cục nóng không chạy',
        solution: 'Có thể bị hỏng tụ khởi động (block), hỏng bo mạch điều khiển hoặc block cục nóng đang bị quá nhiệt nghỉ. Cần thợ chuyên môn đo đạc dòng điện và tụ đề.',
        recommendedService: 'Khắc phục cục nóng không chạy / Thay tụ block máy lạnh'
      },
      {
        text: 'Lạnh yếu, máy chạy liên tục mà phòng vẫn nóng',
        solution: 'Khả năng cao do lưới lọc bụi bẩn nghẹt cản gió, hoặc rò rỉ xì gas ga lạnh. Khuyến nghị vệ sinh máy lạnh lưới lọc và đo áp suất gas.',
        recommendedService: 'Vệ sinh máy lạnh toàn diện & Kiểm tra nạp thêm gas lạnh'
      }
    ]
  },
  ac_leak: {
    id: 'ac_leak',
    question: 'Máy lạnh bị chảy nước thường xảy ra sau khi hoạt động được bao lâu?',
    options: [
      {
        text: 'Mới bật khoảng 15-30 phút là chảy nước liên tục',
        solution: 'Máng thoát nước hoặc đường ống xả nước thải bị bám đầy rong rêu, chất bẩn gây tắc nghẽn, làm nước tràn ngược ra ngoài dàn lạnh. Phụ thuộc vào vệ sinh vòi xịt thông ống.',
        recommendedService: 'Thông tắc đường ống thoát nước + Vệ sinh dàn lạnh bảo dưỡng chuyên sâu'
      },
      {
        text: 'Thỉnh thoảng chảy dột lác đác hoặc bám tuyết dàn lạnh',
        solution: 'Do máy bị thiếu hụt gas lạnh dẫn đến việc đóng tuyết trên dàn lạnh, khi tuyết tan ra sẽ chảy tràn máng xả. Cần nạp ga lạnh bổ sung.',
        recommendedService: 'Hút chân không, hàn xì & Nạp ga lạnh chính hãng R32/R410A'
      }
    ]
  },
  ac_no_power: {
    id: 'ac_no_power',
    question: 'Bạn đã kiểm tra aptomat (CP) cấp nguồn cho máy chưa?',
    options: [
      {
        text: 'Đã bật CP nhưng bấm điều khiển khiển từ xa không có tín hiệu',
        solution: 'Có thể hỏng mắt nhận tín hiệu điều khiển, hỏng bo mạch trung tâm dàn lạnh, hoặc gián cắn dây điện nguồn trong máy. Cần thợ đến kiểm tra mạch.',
        recommendedService: 'Sửa chữa bo mạch điều khiển nguồn máy lạnh'
      },
      {
        text: 'Điều khiển màn hình vẫn hiển thị nhưng bấm máy không nhận',
        solution: 'Thử thay pin điều khiển mới. Nếu vẫn không được, mắt nhận hồng ngoại trên máy lạnh đã bị lỗi ẩm mục rỉ sét. Chi phí thay mắt nhận rất rẻ.',
        recommendedService: 'Thay thế mắt nhận tín hiệu hồng ngoại dàn lạnh'
      }
    ]
  },
  ac_noise: {
    id: 'ac_noise',
    question: 'Tiếng ồn phát ra từ vị trí nào?',
    options: [
      {
        text: 'Tiếng kêu rè rè, ồn xào xạc từ dàn lạnh trong nhà',
        solution: 'Cánh quạt dàn lạnh có thể bị bám bụi không đều gây lệch tâm rung lắc, hoặc các khớp nhựa vỏ máy bị lỏng nghẹt. Vệ sinh tra mỡ quạt sẽ êm trở lại.',
        recommendedService: 'Bảo dưỡng tra dầu quạt lồng sóc dàn lạnh'
      },
      {
        text: 'Tiếng gầm rú lớn, rung chấn mạnh từ dàn nóng ngoài ban công',
        solution: 'Chân dàn nóng rách đệm cao su giảm chấn, block bị mòn cơ, hoặc cánh quạt nóng vướng cành cây vật cản. Cần thay thế đệm cao su hoặc cân chỉnh quat.',
        recommendedService: 'Gia cố chân đế chữ L dàn nóng + Thay cao su giảm chấn lực'
      }
    ]
  },

  // --- REFRIGERATOR FLOW ---
  fridge_main: {
    id: 'fridge_main',
    question: 'Tủ lạnh đang gặp sự cố chính nào?',
    options: [
      { text: 'Tủ hoàn toàn không lạnh, hoặc ngăn đá không đông được đá', nextId: 'fridge_no_freeze' },
      { text: 'Ngăn mát bị đóng băng ngập đá hoặc đóng tuyết dày đặc', nextId: 'fridge_ice_build' },
      { text: 'Chảy nước ra sàn nhà từ gầm tủ hoặc chảy nước trong ngăn mát', nextId: 'fridge_leak' },
    ],
  },
  fridge_no_freeze: {
    id: 'fridge_no_freeze',
    question: 'Ngăn dưới của tủ có còn mát hay không và đèn tủ lạnh có sáng không?',
    options: [
      {
        text: 'Ngăn mát nóng hẳn, đèn vẫn sáng nhưng block đằng sau không rung/chạy',
        solution: 'Hỏng rơle khởi động nhiệt, hỏng cảm biến nhiệt độ (thermostat), hoặc bo mạch điều khiển không cấp lệnh cho block chạy. Cần nhân sự kỹ thuật đo dòng block.',
        recommendedService: 'Thay thế bộ khởi động Rơle / Cảm biến nhiệt tủ lạnh'
      },
      {
        text: 'Ngăn dưới mát nhẹ, ngăn đá có tuyết mỏng nhưng không đông cứng nổi',
        solution: 'Hệ thống xả đá tự động của tủ bị hỏng (đứt điện trở sấy, hỏng sò lạnh/sò nóng) dẫn đến tuyết bám phủ kín dàn lạnh cản trở trực tiếp việc truyền lạnh.',
        recommendedService: 'Kiểm tra thay bộ xả tuyết tự động (Sò lạnh, sò nóng, điện trở sấy)'
      }
    ]
  },
  fridge_ice_build: {
    id: 'fridge_ice_build',
    question: 'Cửa tủ lạnh đóng có khít chặt hay không?',
    options: [
      {
        text: 'Cửa đóng bị hở, đệm cao su (gioăng) xung quanh bị bong hoặc chai cứng',
        solution: 'Gioăng cao su hở khiến không khí ẩm ngoài phòng tràn liên tục vào gặp nhiệt độ âm của ngăn đá ngưng tụ đóng tuyết cực dày. Cần thay gioăng hoặc hấp nóng dán lại.',
        recommendedService: 'Thay gioăng/đệm cao su tủ lạnh chính hãng'
      },
      {
        text: 'Cửa khít bình thường nhưng rau củ ở ngăn mát bị đông cứng thành đá',
        solution: 'Thermostat (bộ điều chỉnh nhiệt độ) bị hỏng tiếp điểm khiến tủ chạy liên tục không tự ngắt nghỉ để xả nhiệt dạn mát. Cần thay cảm biến nhiệt độ mới.',
        recommendedService: 'Thay bộ kiểm soát nhiệt độ ngăn mát (Thermostat)'
      }
    ]
  },
  fridge_leak: {
    id: 'fridge_leak',
    question: 'Nước chảy từ vị trí nào ra?',
    options: [
      {
        text: 'Nước chảy rỉ rình từ khay ngăn đá ngập xuống các ngăn mát dưới trực tiếp',
        solution: 'Đường ống dẫn nước xả tuyết (nước ngưng tụ) bị tắc nghẹt do chất bẩn hoặc bám tuyết đóng băng miệng ống dẫn phía sau tủ. Nước tràn ngược ra ngoài ngăn đựng.',
        recommendedService: 'Thông tắc hệ thống đường ống xả tủ lạnh + sấy rã đông ống xả'
      },
      {
        text: 'Nước chảy ngập ra sàn nhà phía sau gầm tủ lạnh',
        solution: 'Khay hứng nước thải sau máy (phía trên block máy) bị nứt bể, chảy tràn hoặc đặt lệch vị trí nhận nước thừa khi xả tuyết.',
        recommendedService: 'Vệ sinh khay hứng nước + Kiểm tra dán nứt kín khay thoát'
      }
    ]
  },

  // --- WASHING MACHINE FLOW ---
  washer_main: {
    id: 'washer_main',
    question: 'Máy giặt đang có biểu hiện bất thường nào?',
    options: [
      { text: 'Máy cấp nước liên tục không ngừng hoặc không chịu vào nước', nextId: 'washer_water' },
      { text: 'Máy giặt xong nhưng đến chu kỳ vắt thì đứng im hoặc báo lỗi tít tít', nextId: 'washer_spin' },
      { text: 'Khi vắt máy rung bần bật, kêu két két cực kỳ chói tai', nextId: 'washer_vibe' },
    ],
  },
  washer_water: {
    id: 'washer_water',
    question: 'Hiện trạng chính xác của dòng nước là gì?',
    options: [
      {
        text: 'Máy báo lỗi nước yếu, không chảy vào lồng giặt dẫu vòi nước mở',
        solution: 'Van điện từ cấp nước bị bụi cặn lấp kín tấm lưới lọc cấp nước, hoặc cuộn hít của van bị cháy cuộn dây. Cần tháo lưới vệ sinh hoặc thay van cấp nước.',
        recommendedService: 'Vệ sinh lưới lọc van cấp / Thay thế van cấp nước máy giặt'
      },
      {
        text: 'Nước chảy vào lồng liên tục tràn trề, máy xả nước đồng thời không giặt',
        solution: 'Van xả bị kẹt dị vật (đồng xu, tăm tre...) làm hở miệng gioăng cao su thoát nước, hoặc phao áp suất cảm biến mực nước bị hư hỏng lỗi phao.',
        recommendedService: 'Thông kẹt van xả cặn nước máy giặt + Kiểm tra thay phao cảm ứng áp suất'
      }
    ]
  },
  washer_spin: {
    id: 'washer_spin',
    question: 'Máy giặt phát tín hiệu báo lỗi hiển thị trên màn hình (ví dụ: UE, E2, DE...) không?',
    options: [
      {
        text: 'Nhấp nháy đèn báo lỗi hiển thị mã lỗi liên quan tới nắp tủ (DE/Door)',
        solution: 'Công tắc cửa (chốt an toàn của nắp cửa) bị lỏng giắc cắm, gãy lẫy nhựa hoặc oxi hóa tiếp điểm điện. Cần thay công tắc cửa để bảo vệ an toàn lúc quay tốc độ cao.',
        recommendedService: 'Thay thế công tắc cửa an toàn máy giặt chính hãng'
      },
      {
        text: 'Không báo lỗi hoặc kêu rè rè gầm vang nhưng lồng không quay vắt',
        solution: 'Sợi dây curoa truyền động động cơ bị đứt, tuột xích hoặc chổi than mô-tơ/bộ ly hợp bạc đạn hộp số đã bị hao mòn quá giới hạn. Cần thay dây curoa mới.',
        recommendedService: 'Thay dây curoa truyền động / Sửa hộp số bộ ly hợp máy giặt'
      }
    ]
  },
  washer_vibe: {
    id: 'washer_vibe',
    question: 'Máy giặt kê có cân bằng tuyệt đối trên mặt nền vững chắc không?',
    options: [
      {
        text: 'Nền nhà phẳng, thợ lắp đã kê khá cân đối nhưng vắt vẫn nảy nhấp nhô',
        solution: 'Bị hỏng 4 lò xo/ty thụt giảm xóc giữ cân bằng lồng giặt lửng bên trong vỏ máy, khiến lồng bị nghiêng va đập mạnh khi tải lệch. Cần thay bộ ty giảm rung mới.',
        recommendedService: 'Thay thế bộ ty giảm xóc (Cân bằng bốn lò xo lồng giặt)'
      },
      {
        text: 'Tiếng rít chói tai két két kèm khói nhẹ hoặc mùi khét nhẹ',
        solution: 'Bị rỉ sét rách ổ trục bi (bạc đạn) hoặc hỏng phớt chắn nước của trục lồng giặt khiến nước lọt vào phá hỏng lõi kim loại. Đây là lỗi cơ khí nặng cần bảo dưỡng hộp số.',
        recommendedService: 'Thay bộ bạc đạn phớt chắn nước + Bảo dưỡng trục lồng giặt'
      }
    ]
  }
};

interface TroubleshooterProps {
  onSuggestService: (serviceName: string, diagnosisText: string) => void;
}

export const Troubleshooter: React.FC<TroubleshooterProps> = ({ onSuggestService }) => {
  const { info } = useBusiness();
  const [history, setHistory] = useState<string[]>(['start']);
  const currentNodeId = history[history.length - 1];
  const currentNode = DIAGNOSTIC_DATA[currentNodeId];

  const [selectedSolution, setSelectedSolution] = useState<{
    solution: string;
    recommendedService: string;
  } | null>(null);

  const handleOptionClick = (option: typeof DIAGNOSTIC_DATA[string]['options'][0]) => {
    if (option.solution && option.recommendedService) {
      setSelectedSolution({
        solution: option.solution,
        recommendedService: option.recommendedService,
      });
    } else if (option.nextId) {
      setHistory((prev) => [...prev, option.nextId!]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
      setSelectedSolution(null);
    }
  };

  const handleReset = () => {
    setHistory(['start']);
    setSelectedSolution(null);
  };

  const getBreadcrumbs = () => {
    return history.map((id) => {
      if (id === 'start') return 'Chọn Thiết Bị';
      if (id.includes('ac')) return 'Máy Lạnh';
      if (id.includes('fridge')) return 'Tủ Lạnh';
      if (id.includes('washer')) return 'Máy Giặt';
      return 'Chi Tiết';
    });
  };

  return (
    <div id="chan-doan-loi" className="bg-white rounded-2xl shadow-xl border border-sky-100 overflow-hidden max-w-3xl mx-auto">
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white p-5 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <Wrench className="w-6 h-6 text-sky-300" id="icon-wrench-diagnostic" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight">Chẩn Đoán Sự Cố Tự Động</h3>
            <p className="text-sky-150 text-xs sm:text-sm">Xác định nhanh nguyên nhân và dự toán sửa chữa trong 30 giây</p>
          </div>
        </div>
        {history.length > 1 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs bg-sky-800/60 hover:bg-sky-800 text-sky-200 hover:text-white px-3 py-1.5 rounded-lg transition-all"
            id="btn-diagnostic-refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Làm mới
          </button>
        )}
      </div>

      {/* Progress path banner */}
      <div className="bg-sky-50 px-5 py-3 border-b border-sky-100 flex items-center gap-2 overflow-x-auto text-xs font-medium text-sky-600 scrollbar-none">
        <MessageSquare className="w-3.5 h-3.5 text-sky-500 shrink-0" />
        <span className="text-gray-500 shrink-0">Hành trình:</span>
        {getBreadcrumbs().map((bc, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3 h-3 text-sky-300 shrink-0" />}
            <span className={`${idx === history.length - 1 && !selectedSolution ? 'text-sky-800 font-bold bg-sky-100 px-2 py-0.5 rounded' : 'text-sky-600/80'}`}>
              {bc}
            </span>
          </React.Fragment>
        ))}
        {selectedSolution && (
          <>
            <ChevronRight className="w-3 h-3 text-sky-300 shrink-0" />
            <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded shrink-0">
              Kết Quả
            </span>
          </>
        )}
      </div>

      <div className="p-6 min-h-[280px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {!selectedSolution && currentNode ? (
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col justify-between"
            >
              {/* Question container */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full mb-3">
                  <Info className="w-3 h-3" /> Bước {history.length}
                </span>
                <h4 className="font-sans font-semibold text-gray-800 text-lg sm:text-xl leading-relaxed">
                  {currentNode.question}
                </h4>
              </div>

              {/* Options buttons list */}
              <div className="space-y-3 mb-6">
                {currentNode.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-sky-400 bg-gray-50 hover:bg-sky-50/40 text-gray-700 hover:text-sky-950 font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99]"
                    id={`diagnostic-opt-${currentNode.id}-${index}`}
                  >
                    <span className="pr-3 text-sm sm:text-base leading-snug">{option.text}</span>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : selectedSolution ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-5"
            >
              {/* Success Result Container */}
              <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-200/80 flex items-start gap-4">
                <div className="p-3 bg-amber-500 rounded-lg shrink-0 mt-0.5">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-amber-800 font-bold text-base sm:text-lg mb-1">Chuẩn Đoán Nguyên Nhân Sơ Bộ</h4>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {selectedSolution.solution}
                  </p>
                </div>
              </div>

              {/* Recommended repair segment */}
              <div className="bg-sky-50 rounded-xl p-5 border border-sky-100 flex items-start gap-4">
                <div className="p-3 bg-sky-600 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sky-900 font-bold text-base sm:text-lg mb-1">Dịch Vụ Khuyến Nghị</h4>
                  <p className="text-sky-700 font-semibold text-sm sm:text-base mb-1">
                    {selectedSolution.recommendedService}
                  </p>
                  <p className="text-gray-550 text-xs">
                    * {info.companyName} hỗ trợ kiểm tra tận nơi miễn phí, báo giá trước khi làm, bảo hành 3 - 12 tháng.
                  </p>
                </div>
              </div>

              {/* Final Actions buttons selection */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => onSuggestService(selectedSolution.recommendedService, selectedSolution.solution)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-705 text-white py-3.5 px-6 rounded-xl font-bold transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 text-center active:scale-95"
                  id="btn-diagnostic-book"
                >
                  <FlameKindling className="w-5 h-5 animate-pulse" />
                  Đặt Lịch Sửa Chữa Với Sự Cố Này
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 px-6 rounded-xl font-bold transition-all duration-150 text-center"
                  id="btn-diagnostic-restart"
                >
                  Chẩn đoán lại
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Action back btn */}
        {history.length > 1 && !selectedSolution && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={handleBack}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 py-2 px-4 rounded-lg transition-all"
              id="btn-diagnostic-back"
            >
              &larr; Quay lại câu hỏi trước
            </button>
          </div>
        )}
      </div>

      {/* Trust assurance footer bar */}
      <div className="bg-gray-55 px-5 py-3 border-t border-gray-100 text-center text-xs text-gray-500 font-medium">
        🛡️ Bạn chỉ thanh toán khi đồng ý với phương án và báo giá thực tế của thợ.
      </div>
    </div>
  );
};
