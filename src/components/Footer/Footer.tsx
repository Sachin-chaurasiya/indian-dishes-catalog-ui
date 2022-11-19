import { Box, Link } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <Box borderTop="1px" p={6} mt={8}>
        Made with ❤️ by{' '}
        <Link
          href="https://sachinchaurasiy.dev"
          textDecoration="underline"
          target="_blank"
        >
          Sachin Chaurasiya
        </Link>{' '}
        |{' '}
        <Link
          href="https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-2022-on-dev-2107"
          textDecoration="underline"
          target="_blank"
        >
          Dev.to X MongoDB Hackathon
        </Link>
      </Box>
    </footer>
  );
};

export default Footer;
