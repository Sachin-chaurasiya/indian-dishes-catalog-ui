import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  return (
    <Flex
      pl={4}
      pr={4}
      alignItems="center"
      justifyContent="space-between"
      mb={4}
      gap={4}
    >
      <Heading size="md" flexShrink={0}>
        Indian Dishes
      </Heading>
      <SearchBar />
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
