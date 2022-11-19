import { Spinner, SpinnerProps } from '@chakra-ui/react';
import React from 'react';

const CustomSpinner = (props: SpinnerProps) => {
  return (
    <Spinner
      margin="auto"
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal.500"
      size="xl"
      {...props}
    />
  );
};

export default CustomSpinner;
