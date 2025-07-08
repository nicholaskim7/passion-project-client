import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserContext/UserContext';
import { useParams } from 'react-router-dom';

function Profiles() {
  const { username } = useParams();
  const [fetchedProfileData, setFetchedProfileData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // need to get the username from url and navigate to their public profile page
        const response = await fetch('https://passion-project-server.onrender.com/api/public-profile/:username', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const profileData = await response.json();
        setFetchedProfileData(profileData);
      } catch (error) {
        setError(error);
      }
    }
    fetchProfile();

  }, [username]);
  
  return (
    <div>
      <h3>{`@${fetchedProfileData.username}`}</h3>
      <img
        src={fetchedProfileData.avatar_path || '/default-avatar.png'}
        alt='Profile Avatar'
        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '1px solid yellowgreen', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}
      />
      
    </div>
  )
}

export default Profiles
