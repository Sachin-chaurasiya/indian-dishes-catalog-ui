import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem,
  Spinner,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { getFoods } from './api/food';
import { FoodItem } from 'food';
import FoodCard from './components/FoodCard/FoodCard';

export const App = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFoods = async () => {
    setIsLoading(true);
    try {
      const { data } = await getFoods();
      setFoods(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={4}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {isLoading ? (
            <Spinner
              margin="auto"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
          ) : (
            <Grid
              mt={4}
              p={4}
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={6}
            >
              {foods.map((food) => (
                <GridItem key={food._id}>
                  <FoodCard food={food} />
                </GridItem>
              ))}
            </Grid>
          )}
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
