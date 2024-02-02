export interface category {
  id: number;
  category_name: string;
  description: string | null;
}

export interface location {
  id: number;
  section_name: string;
  description: string | null;
}

export interface inventoryType {
  id: number;
  category_id: number;
  location_id: number;
  item_name: string;
  description: string | null;
  date_registration: string;
}

export type inventoryTypeWithoutDate = Omit<inventoryType, 'date_registration'>