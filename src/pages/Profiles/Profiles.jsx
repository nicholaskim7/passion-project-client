import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserContext/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

function Profiles() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [fetchedProfileData, setFetchedProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // encode the user name as spaces give trouble in URL
        const encodedUsername = encodeURIComponent(username);

        // need to get the username from url and navigate to their public profile page
        const response = await fetch(`https://passion-project-server.onrender.com/api/public-profile/${encodedUsername}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 404) {
            setNotFound(true);

            // add delay so user can see that they searched for non existing username before navigating back home
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
          throw new Error('Network response was not ok');
        }
        const profileData = await response.json();
        setFetchedProfileData(profileData);
      } catch (error) {
        setError(error);
      } finally {
        // either we found the user or we didnt we dont want user to wait forever
        setLoading(false);
      }
    }
    fetchProfile();

  }, [username]);
  
  return (
    <div>
      {loading ? (
        <h3>Loading profile...</h3>
      ) : notFound ? (
        <h3>User not found</h3>
      ) : (
        <>
          <h3>{`@${fetchedProfileData.username}`}</h3>
          <img
            src={fetchedProfileData.avatar_path || '/default-avatar.png'}
            alt='Profile Avatar'
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '1px solid yellowgreen', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}
          />
        </>
      )}
    </div>
  )
}

export default Profiles
