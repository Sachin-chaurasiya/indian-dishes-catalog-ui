import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { ChakraProvider, Box, Grid, theme, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getFoods } from './api/food';
import { FoodItem, Pagination } from 'food';
import Footer from './components/Footer/Footer';
import { useElementInView } from './hook/useElementInView';
import { isUndefined, unionBy } from 'lodash';
import CustomSpinner from './components/CustomSpinner/CustomSpinner';
import FoodCardList from './components/FoodCardList/FoodCardList';
import Header from './components/Header/Header';
import { OBSERVER_CONSTANT } from './constant';

export const App = () => {
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
        setFoods((previous) => unionBy([...previous, ...data], '_id'));
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
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={4}>
          <Header />
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
        </Grid>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};
