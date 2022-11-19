import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { FoodItem } from 'food';
import React, { FC } from 'react';
import FoodCard from '../FoodCard/FoodCard';

interface Props {
  foods: FoodItem[];
}

const FoodCardList: FC<Props> = ({ foods }) => {
  return (
    <>
      {foods.length === 0 ? (
        <Heading>No Dishes Found</Heading>
      ) : (
        <Grid
          mt={4}
          pr={4}
          pl={4}
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
    </>
  );
};

export default FoodCardList;
