import { FoodListResponse } from 'food';
import { API_CLIENT } from '.';

export const getFoods = async () => {
  const response = await API_CLIENT.get<FoodListResponse>('/');

  return response.data;
};
