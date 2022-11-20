import { Button, Flex, Input, InputProps } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const [search, setSearch] = useState<string>('');

  const searchParamValue = useMemo(
    () => searchParam.get('search') ?? '',
    [searchParam]
  );

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSearch = () => {
    if (search) {
      navigate({ pathname: '/', search: `search=${search}` });
    } else {
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    setSearch(searchParamValue);
  }, [searchParamValue]);

  return (
    <Flex width="50%" gap={4} alignItems="center">
      <Input
        border="1px"
        type="search"
        placeholder="Search dishes..."
        size="lg"
        value={search}
        onChange={handleSearchOnChange}
      />
      <Button onClick={handleSearch}>Search</Button>
    </Flex>
  );
};

export default SearchBar;
