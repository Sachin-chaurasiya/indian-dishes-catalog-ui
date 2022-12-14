import {
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { FoodItem } from 'food';
import React, { CSSProperties, FC } from 'react';
import FoodImage from '../../assets/svg/indian-food.png';
import { CiTimer } from 'react-icons/ci';
import { BiFoodTag } from 'react-icons/bi';
import { uniqueId } from 'lodash';

interface Props {
  food: FoodItem;
}

const iconStyles: CSSProperties = {
  display: 'inline',
  verticalAlign: 'middle',
};

const FoodCard: FC<Props> = ({ food }) => {
  const timeIcon = <CiTimer style={iconStyles} />;

  const dietIcon = <BiFoodTag style={iconStyles} />;

  return (
    <Card shadow="md" border="1px">
      <CardBody>
        <Image margin="auto" borderRadius="lg" src={FoodImage} boxSize={250} />
        <Stack mt={2}>
          <Heading size="md">{food.name}</Heading>
          <Text color="GrayText">Ingredients</Text>
          <Flex alignItems="center" justifyContent="center" gap={2} wrap="wrap">
            {food.ingredients.split(',').map((ingredient) => (
              <Tag key={uniqueId()}>{ingredient}</Tag>
            ))}
          </Flex>
          <Divider />
          <Grid templateColumns="repeat(2, 1fr)">
            <Text color="GrayText">Preparation Time {timeIcon}</Text>
            <Text>{food.prep_time} min</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <Text color="GrayText">Cook Time {timeIcon}</Text>
            <Text>{food.cook_time} min</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <Text color="GrayText">Diet {dietIcon}</Text>
            <Text>{food.diet}</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <Text color="GrayText">State</Text>
            <Text>{food.state}</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <Text color="GrayText">Region</Text>
            <Text>{food.region}</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <Text color="GrayText">Flavor</Text>
            <Text>{food.flavor_profile}</Text>
          </Grid>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FoodCard;
