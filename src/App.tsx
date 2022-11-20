import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';

import Footer from './components/Footer/Footer';

import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={4}>
          <Header />
          <AppRoutes />
        </Grid>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};
