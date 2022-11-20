declare module 'food' {
  export interface FoodItem {
    _id: string;
    name: string;
    ingredients: string;
    diet: string;
    prep_time: number;
    cook_time: number;
    flavor_profile: string;
    course: string;
    state: string;
    region: string;
    __v: number;
  }

  export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  }

  export interface FoodListResponse {
    data: FoodItem[];
    status: string;
    pagination: Pagination;
  }

  export type Filter = {
    state: string;
    course: string;
  };
}
