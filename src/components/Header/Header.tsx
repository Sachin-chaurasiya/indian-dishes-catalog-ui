import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Header = () => {
  return (
    <Flex pl={4} pr={4} alignItems="center" justifyContent="space-between">
      <Heading size="md" justifySelf="flex-start">
        Indian Dishes
      </Heading>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};

export default Header;
