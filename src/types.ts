export interface ServiceItem {
  id: string;
  title: string;
  category: 'modular' | 'ceilings' | 'living' | 'sacred' | 'turnkey';
  summary: string;
  description: string;
  features: string[];
  materials: string[];
  timeline: string;
  startingPrice: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'bedroom' | 'living' | 'kitchen' | 'sacred' | 'commercial';
  location: string;
  isRealExecuted: boolean;
  imageUrl?: string;
  specs: {
    area: string;
    timeline: string;
    finish: string;
    highlight: string;
  };
  description: string;
  features: string[];
}

export interface MaterialFinish {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  roughness: number;
  metalness: number;
  wallColor: string;
  cabinetColor: string;
  accentMetalColor: string;
}

export interface Scene3DConfig {
  id: 'living' | 'kitchen' | 'bedroom';
  title: string;
  description: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
}
