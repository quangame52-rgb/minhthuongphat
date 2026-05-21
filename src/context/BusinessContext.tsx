import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BusinessInfo {
  companyName: string;
  slogan: string;
  hotline: string;
  rawPhone: string;
  email: string;
  address: string;
  workingHours: string;
  mapsLink: string;
  introduction: string;
}

interface BusinessContextType {
  info: BusinessInfo;
  updateInfo: (newInfo: Partial<BusinessInfo>) => void;
  resetToDefault: () => void;
}

const DEFAULT_INFO: BusinessInfo = {
  companyName: 'ĐIỆN LẠNH MINH THƯƠNG PHÁT',
  slogan: 'Điện Lạnh Gia Dụng & Công Nghiệp',
  hotline: '0979.628.168',
  rawPhone: '0979628168',
  email: '', // Let blank as specifically requested: "thư điện tử để trống"
  address: '210A Lê Thị Trung, KP. 1B, P. An Phú, TP. Thuận An, Bình Dương',
  workingHours: '08:00 - 20:30 (Cả Thứ Bảy & Chủ Nhật)',
  mapsLink: 'https://maps.google.com/?q=210A+L%C3%AA+Th%E1%BB%8B+Trung,+An+Ph%C3%BA,+Thu%E1%BA%ADn+An,+B%C3%ACnh+D%C6%B0%C6%A1ng',
  introduction: 'Chuyên nghiệp tối thượng trong việc tư vấn thiết kế, lắp ráp phân phối, bảo dưỡng và xử lý dứt điểm rủi ro hỏng hóc nhiệt của Hệ thống điều hòa, tủ lạnh, tủ mát, tủ cấp đông, máy giặt gia đình, máy giặt mỏ sấy lớn công nghiệp tại khu vực Thuận An, Bình Dương.'
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [info, setInfo] = useState<BusinessInfo>(DEFAULT_INFO);

  useEffect(() => {
    const saved = localStorage.getItem('minh_thuong_phat_business_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with DEFAULT_INFO to ensure all keys exist
        setInfo({ ...DEFAULT_INFO, ...parsed });
      } catch (e) {
        console.error('Failed to parse saved business info', e);
      }
    }
  }, []);

  const updateInfo = (newInfo: Partial<BusinessInfo>) => {
    setInfo((prev) => {
      const updated = { ...prev, ...newInfo };
      localStorage.setItem('minh_thuong_phat_business_info', JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefault = () => {
    localStorage.removeItem('minh_thuong_phat_business_info');
    setInfo(DEFAULT_INFO);
  };

  return (
    <BusinessContext.Provider value={{ info, updateInfo, resetToDefault }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
