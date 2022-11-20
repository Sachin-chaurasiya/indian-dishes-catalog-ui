import { Text } from '@chakra-ui/react';
import { FoodItem } from 'food';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchFoods } from '../api/food';
import CustomSpinner from '../components/CustomSpinner/CustomSpinner';
import FoodCardList from '../components/FoodCardList/FoodCardList';

const SearchResults = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam] = useSearchParams();

  const searchParamValue = useMemo(
    () => searchParam.get('search') ?? '',
    [searchParam]
  );

  const fetchFoods = useCallback(async (search: string) => {
    setIsLoading(true);
    try {
      const { data = [] } = await searchFoods(search);
      setFoods(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const matchCount = foods.length;

  useEffect(() => {
    fetchFoods(searchParamValue);
  }, [searchParamValue, fetchFoods]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <>
      {matchCount > 0 && <Text>About {matchCount} results</Text>}
      <FoodCardList foods={foods} searchTerm={searchParamValue} />
    </>
  );
};

export default SearchResults;
