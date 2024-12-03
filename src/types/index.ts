export interface Business {
  ciudad: string;
  departamento: string;
  slug: any;
  id: string;
  nombre: string;
  imageUrl: string;
  horario: string;
  direccion: string;
  descripcion: string;
  categoria: string;
  hora_a: string;
  hora_c: string;
  lat: number;
  lng: number;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  photos: string[];
  activo: boolean
}

export interface CarouselImage {
  id: number;
  url: string;
  alt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface BusinessForm {
  productImages: any;
  image: any;
  nombre: string;
  descripcion: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  categoria: string;
  hora_a: string;
  hora_c: string;
  slug: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  lat: number;
  lng: number;
  activo: boolean;
}

export type BusinessFilters = {
  search: string;
  category: string;
  status: 'all' | 'active' | 'inactive';
};