import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Brands } from './components/Brands';
import { Services } from './components/Services';
import { Troubleshooter } from './components/Troubleshooter';
import { PriceEstimator } from './components/PriceEstimator';
import { BookingForm } from './components/BookingForm';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Phone, ArrowUp, Activity } from 'lucide-react';
import { BusinessProvider, useBusiness } from './context/BusinessContext';

function AppContent() {
  const { info } = useBusiness();
  const [prefilledService, setPrefilledService] = useState('');
  const [prefilledPrice, setPrefilledPrice] = useState(0);

  const handleSelectService = (serviceName: string) => {
    setPrefilledService(serviceName);
    setPrefilledPrice(0);
    scrollToSection('#dat-lich-hen');
  };

  const handleSuggestDiagnosticService = (serviceName: string, diagnosisText: string) => {
    setPrefilledService(serviceName);
    setPrefilledPrice(0);
    scrollToSection('#dat-lich-hen');
  };

  const handleAddEstimateToBooking = (servicesText: string, totalPrice: number) => {
    setPrefilledService(servicesText);
    setPrefilledPrice(totalPrice);
    scrollToSection('#dat-lich-hen');
  };

  const handleClearPrefilled = () => {
    setPrefilledService('');
    setPrefilledPrice(0);
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-502 selection:text-sky-905 overflow-x-hidden">
      
      {/* Top Header Navigation */}
      <Header />

      {/* Main Hero & Bento offerings */}
      <Hero />

      {/* Trust validation scrolling manufacturers */}
      <Brands />

      {/* Main Services detailed accordions */}
      <Services onSelectService={handleSelectService} />

      {/* INTERACTIVE DIAGNOSIS & COST ESTIMATORS PORTAL */}
      <div className="py-16 sm:py-24 bg-sky-55/40 border-y border-sky-100/60 relative">
        <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header intro of Interactive modules */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-850 text-xs font-bold rounded-full border border-sky-200 uppercase mb-4">
              <Activity className="w-3.5 h-3.5 text-sky-655" /> Tiện ích đột phá
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-gray-900 tracking-tight">
              Khám Bệnh Thiết Bị Lạnh Trực Tuyến & Tính Giá
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2 font-medium">
              Bạn đang gặp sự cố nhỏ nhưng sợ thợ chặt chém vẽ bệnh? Hãy thử hai tiện ích chẩn đoán tự động và lập dự toán hóa đơn công khai của {info.companyName} dưới đây để nắm rõ chi phí chính xác trước khi gọi điện nhé!
            </p>
          </div>

          {/* Widget 1: Intelligent guided troubleshooting chatbot node */}
          <Troubleshooter onSuggestService={handleSuggestDiagnosticService} />

          {/* Widget 2: Interactive pricing selection calculator calculator */}
          <PriceEstimator onAddEstimateToBooking={handleAddEstimateToBooking} />

        </div>
      </div>

      {/* Formal calendar scheduling booking section */}
      <BookingForm
        prefilledService={prefilledService}
        prefilledPrice={prefilledPrice}
        onClearPrefilled={handleClearPrefilled}
      />

      {/* Client reviews metrics validation */}
      <Testimonials />

      {/* Collapsible structured FAQs accordions */}
      <FAQ />

      {/* Brand footer signature and geolocation pointers */}
      <Footer />

      {/* Call Center Sticky Floater shortcuts */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col gap-3">
        {/* Floating Call Hotline Button */}
        <a
          href={`tel:${info.rawPhone}`}
          className="bg-orange-500 hover:bg-orange-650 hover:scale-105 text-white p-3.5 rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center transition-all group relative animate-bounce"
          title="Gọi khẩn cấp"
          id="floater-call-hotline"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <span className="absolute right-14 bg-gray-900 text-white font-sans font-bold text-[10px] sm:text-xs py-1 px-2.5 rounded-lg whitespace-nowrap shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wide">
            📞 Cứu hộ điện lạnh: {info.hotline}
          </span>
        </a>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <AppContent />
    </BusinessProvider>
  );
}
