import { FoodListResponse } from 'food';
import { API_CLIENT } from '.';

export const getFoods = async (limit = 12, page = 1) => {
  const response = await API_CLIENT.get<FoodListResponse>('/', {
    params: { limit, page },
  });

  return response.data;
};
