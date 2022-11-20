import { Text } from '@chakra-ui/react';
import { FoodItem, Pagination } from 'food';
import { isUndefined, uniqBy } from 'lodash';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getFoods } from '../api/food';
import CustomSpinner from '../components/CustomSpinner/CustomSpinner';
import FoodCardList from '../components/FoodCardList/FoodCardList';
import { OBSERVER_CONSTANT } from '../constant';
import { useElementInView } from '../hook/useElementInView';

const Home = () => {
  const { elementRef, isInView } = useElementInView({ ...OBSERVER_CONSTANT });

  // local states
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>();

  // derived states
  const { currentPage, hasMore, isEnd } = useMemo(() => {
    let currentPage = 1;
    let hasMore = false;
    let isEnd = false;
    if (!isUndefined(pagination)) {
      currentPage = pagination.currentPage + 1;
      hasMore = pagination.currentPage < pagination.totalPages;
      isEnd = pagination.currentPage === pagination.totalPages;
    }

    return { hasMore, currentPage, isEnd };
  }, [pagination]);

  const { isFirstTimeLoading, isFirstInfiniteLoading } = useMemo(() => {
    const isFirstTimeLoading = isLoading && isUndefined(pagination);
    const isFirstInfiniteLoading =
      isLoading && !isUndefined(pagination) && pagination.currentPage > 1;

    return { isFirstInfiniteLoading, isFirstTimeLoading };
  }, [isLoading, pagination]);

  // api method
  const fetchFoods = useCallback(async () => {
    if (currentPage === 1 || hasMore) {
      setIsLoading(true);
      try {
        const { data = [], pagination: pagingResponse } = await getFoods({
          page: currentPage,
        });
        setFoods((previous) => uniqBy([...previous, ...data], '_id'));
        setPagination(pagingResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentPage, hasMore]);

  // side effect
  useEffect(() => {
    if (!isLoading && isInView) {
      fetchFoods();
    }
  }, [isInView, isLoading, fetchFoods]);

  return (
    <>
      {isFirstTimeLoading ? (
        <CustomSpinner />
      ) : (
        <Fragment>
          <FoodCardList foods={foods} />
          <div ref={elementRef} />
          {isFirstInfiniteLoading && <CustomSpinner mt={6} />}
          {isEnd && <Text mt={6}>You've reached the end! 👋</Text>}
        </Fragment>
      )}
    </>
  );
};

export default Home;
