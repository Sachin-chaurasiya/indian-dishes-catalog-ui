import { Button, Grid, GridItem, Select, Text } from '@chakra-ui/react';
import { Filter, FoodItem } from 'food';
import { startCase, uniq } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchFoods } from '../api/food';
import CustomSpinner from '../components/CustomSpinner/CustomSpinner';
import FoodCardList from '../components/FoodCardList/FoodCardList';

const INITIAL_FILTER = { state: '', course: '' };

const SearchResults = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam] = useSearchParams();
  const [filter, setFilter] = useState<Filter>(INITIAL_FILTER);
  const [stateList, setStateList] = useState<string[]>([]);
  const [courseList, setCourseList] = useState<string[]>([]);

  const searchParamValue = useMemo(
    () => searchParam.get('search') ?? '',
    [searchParam]
  );

  const isFilterSelected = useMemo(
    () => Object.values(filter).some((value) => Boolean(value)),
    [filter]
  );

  const matchCount = useMemo(() => foods.length, [foods]);

  const fetchFoods = useCallback(async (search: string, filter: Filter) => {
    setIsLoading(true);
    try {
      const { data = [] } = await searchFoods(search, filter);
      setFoods(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClearFilter = () => setFilter(INITIAL_FILTER);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setFilter((previous) => ({ ...previous, [name]: value }));
  };

  const setFilterOptions = (foodList: FoodItem[]) => {
    const states = uniq(foodList.map((food) => food.state));
    const courses = uniq(foodList.map((food) => food.course));

    setStateList(states);
    setCourseList(courses);
  };

  useEffect(() => {
    fetchFoods(searchParamValue, filter);
  }, [searchParamValue, fetchFoods, filter]);

  useEffect(() => {
    if (!isFilterSelected) {
      setFilterOptions(foods);
    }
  }, [foods, isFilterSelected]);

  return (
    <>
      <Grid
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
        p={4}
      >
        <GridItem>
          <Select
            placeholder="Select state"
            name="state"
            value={filter.state}
            onChange={handleFilterChange}
          >
            {stateList.map((state) => (
              <option value={state} key={state}>
                {startCase(state)}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            placeholder="Select course type"
            name="course"
            value={filter.course}
            onChange={handleFilterChange}
          >
            {courseList.map((course) => (
              <option value={course} key={course}>
                {startCase(course)}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Button
            width="100%"
            disabled={!isFilterSelected}
            onClick={handleClearFilter}
          >
            Clear Filter
          </Button>
        </GridItem>
      </Grid>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {matchCount > 0 && <Text>About {matchCount} results</Text>}

          <FoodCardList foods={foods} searchTerm={searchParamValue} />
        </>
      )}
    </>
  );
};

export default SearchResults;
