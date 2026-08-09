export interface ActiveUser {
  socketId: string;
  username: string;
  color: string;
  cursorIndex?: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  system?: boolean;
}

export interface DocumentMeta {
  id: string;
  title: string;
  category: string;
  snippet: string;
}

export interface DocumentDetails {
  id: string;
  title: string;
  content: string;
}

export interface ServiceDetail {
  title: string;
  pdfText: string;
  additionalDetails: string;
  iconName: string;
  priceGuidance: string;
}

export interface IndustryDetail {
  name: string;
  description: string;
  additionalText: string;
  bgPastel: string;
  borderPastel: string;
  textPastel: string;
}
