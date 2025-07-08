import React, { useEffect, useState } from 'react'

function Search({ onSearch }) {
  const [searchUser, setSearchUser] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    // add a delay to only trigger search once user is done typing
    const handler = setTimeout(() => {
      setDebouncedSearch(searchUser);
    }, 1000); // 700ms delay

    return () => clearTimeout(handler);
  }, [searchUser])

  // only call onSearch when debouncedSearch updates
  useEffect(() => {
    if (debouncedSearch.trim() !== '') {

      // pass the updated search to parent component
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleChange = (event) => {
    setSearchUser(event.target.value);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchUser}
        onChange={handleChange}
      />
    </div>
  )
}

export default Search
