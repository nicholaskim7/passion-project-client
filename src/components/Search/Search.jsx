import React, { useState } from 'react'

function Search({ onSearch }) {
  const [searchUser, setSearchUser] = useState('');

  const handleChange = (event) => {
    setSearchUser(event.target.value);
    
    // pass the updated search to parent component
    onSearch(event.target.value);
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
