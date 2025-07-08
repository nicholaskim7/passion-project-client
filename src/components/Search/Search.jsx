import React, { useEffect, useState, useRef } from 'react'
import './Search.css';
import { FaSearch } from 'react-icons/fa';

function Search({ onSearch }) {
  const [searchUser, setSearchUser] = useState('');
  // const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  // useEffect(() => {
  //   // add a delay to only trigger search once user is done typing
  //   const handler = setTimeout(() => {
  //     setDebouncedSearch(searchUser);
  //   }, 1000); // 1 sec delay

  //   return () => clearTimeout(handler);
  // }, [searchUser])

  // // only call onSearch when debouncedSearch updates
  // useEffect(() => {
  //   if (debouncedSearch.trim() !== '') {

  //     // pass the updated search to parent component
  //     onSearch(debouncedSearch);
  //   }
  // }, [debouncedSearch]);

  const handleChange = (event) => {
    setSearchUser(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchUser.trim() !== '') {
      onSearch(searchUser);
    }
  }

  const handleIconClick = () => {
    setExpanded(!expanded);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <div className={`search-container ${expanded ? 'expanded' : ''}`}>
      <FaSearch className="search-icon" onClick={handleIconClick} />
      {expanded && (
        <input
          ref={inputRef}
          type='text'
          placeholder='Search username'
          value={searchUser}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='searchbar'
        />
      )}
    </div>
  )
}

export default Search
