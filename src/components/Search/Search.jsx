import React, { useEffect, useState, useRef } from 'react'
import './Search.css';
import { FaSearch } from 'react-icons/fa';

function Search({ onSelect }) {
  const [searchUser, setSearchUser] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  // const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);


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

  useEffect(() => {
    function handleClickOutside(event) {
      // when you click away the username suggestions will go away
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSearchSuggestions([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const fetchSuggestions = async (query) => {
    if (query.trim() === ''){
      setSearchSuggestions([]);
      return;
    }
    try {
      // fetch usernames that are similiar to what the user searched from the database
      const res = await fetch(`https://passion-project-server.onrender.com/api/search-users?q=${encodeURIComponent(query)}`, {
        credentials: 'include'
      });
      const data = await res.json();
      setSearchSuggestions(data.map(user => user.username));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchUser(value);
    // upon change we also want to fetch the similiar usernames of the new search query
    fetchSuggestions(value);
  };

  const handleKeyDown = (event) => {
    // trigger onSelect either by pressing enter or by clicking on a suggested username that is similiar to what was searched
    if (event.key === 'Enter' && searchUser.trim() !== '') {
      onSelect(searchUser); // onSelect will navigate to users public profile
      setSearchSuggestions([]);
      setSearchUser('');
    }
  };

  const handleIconClick = () => {
    setExpanded(!expanded);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  const handleSuggestionClick = (username) => {
    onSelect(username);
    setSearchSuggestions([]);
    setSearchUser('');
  };

  return (
    <div ref={containerRef} className={`search-container ${expanded ? 'expanded' : ''}`}>
      <FaSearch className="search-icon" onClick={handleIconClick} />
      {expanded && (
        <div className='search-dropdown'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search username'
            value={searchUser}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              // when we select the input field the suggested usernames will show up once again
              if (searchUser.trim() !== '') {
                fetchSuggestions(searchUser);
              }
            }}
            className='searchbar'
          />
          {searchSuggestions.length > 0 && (
            // show usernames that are similiar to what was searched
            <ul className="search-suggestions">
              {searchSuggestions.map((username) => (
                <li key={username} onClick={() => handleSuggestionClick(username)}>
                  {username}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
    </div>
  )
}

export default Search
