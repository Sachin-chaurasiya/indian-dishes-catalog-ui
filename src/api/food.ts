import { FoodListResponse } from 'food';
import { API_CLIENT } from '.';

interface Param {
  limit?: number;
  page?: number;
}

export const getFoods = async ({ limit = 12, page = 1 }: Param) => {
  const response = await API_CLIENT.get<FoodListResponse>('/', {
    params: { limit, page },
  });

  return response.data;
};

export const searchFoods = async (search: string) => {
  const response = await API_CLIENT.get<FoodListResponse>('/', {
    params: { search },
  });

  return response.data;
};
