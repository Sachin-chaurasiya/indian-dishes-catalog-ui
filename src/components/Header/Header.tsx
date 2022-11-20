import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex
      pl={4}
      pr={4}
      alignItems="center"
      justifyContent="space-between"
      mb={4}
      gap={4}
    >
      <Heading
        cursor="pointer"
        size="md"
        flexShrink={0}
        onClick={() => navigate('/', { replace: true })}
      >
        Indian Dishes
      </Heading>
      <SearchBar />
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
