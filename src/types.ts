export interface Booking {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  address: string;
  notes?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  unit: string;
  category: 'air_con' | 'refrigerator' | 'washing_machine' | 'air_cooler';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Gia đình - Thuận An", "Doanh nghiệp - Hộ kinh doanh"
  content: string;
  rating: number;
  date: string;
  tag: string;
}

export interface DiagnosticNode {
  id: string;
  question: string;
  options: {
    text: string;
    nextId?: string;
    solution?: string;
    recommendedService?: string;
  }[];
}
