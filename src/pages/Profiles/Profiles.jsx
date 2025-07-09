import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserContext/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import '../Prs/Prs.css';

function Profiles() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [fetchedProfileData, setFetchedProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  const [fetchedStrengthPrs, setFetchedStrengthPrs] = useState([]);
  const [fetchedCardioPrs, setFetchedCardioPrs] = useState([]);
  const [strengthError, setStrengthError] = useState(null);
  const [cardioError, setCardioError] = useState(null);

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

  useEffect(() => {
    //console.log("Encoded username", encodeURIComponent(username));
    const encodedUsername = encodeURIComponent(username);
    // parallel fetching
    Promise.all([
      fetch(`https://passion-project-server.onrender.com/api/fetch-public-prs/${encodedUsername}`, {credentials: 'include',}),
      fetch(`https://passion-project-server.onrender.com/api/fetch-public-cardio-prs/${encodedUsername}`, {credentials: 'include',})
    ])
    .then(async ([strengthRes, cardioRes]) => {
      if (!strengthRes.ok || !cardioRes.ok) throw new Error("One or more pr fetches failed");
        const [strengthData, cardioData] = await Promise.all([strengthRes.json(), cardioRes.json()]);
        setFetchedStrengthPrs(strengthData);
        setFetchedCardioPrs(cardioData);
      })
      .catch((error) => {
        setStrengthError(error);
        setCardioError(error);
      });
  }, []);
  
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
          <div className='prs-section'>
            {/* display users prs only standardized lifts: bench, squat, and deadlift*/}
            <div className='strength'>
              <h3>{`${fetchedProfileData.username}'s Strength Prs`}</h3>
              {fetchedStrengthPrs.length > 0 ? (
                fetchedStrengthPrs.map((pr) => (
                  <div key={pr.key} className='box'>
                    <h3 className='exercise-name'>{pr.name}</h3>
                    <p>{pr.weight} lbs x {pr.reps} reps</p>
                    <p>Date: {new Date(pr.date).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>No strength prs yet</p>
              )
                    }
            </div>
            
            {/* display cardio prs running, biking, swimming, stairmaster */}
            <div className='cardio'>
              <h3>{`${fetchedProfileData.username}'s Cardio Prs`}</h3>
              {fetchedCardioPrs.length > 0 ? (
                fetchedCardioPrs.map((cardio) => (
                  <div key={cardio.key} className='box'>
                    <h3 className='exercise-name'>{cardio.name}</h3>
                      <p>{cardio.duration} minutes x {cardio.calories} calories burned</p>
                      <p>Date: {new Date(cardio.date).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>No cardio prs yet</p>
              )
              }
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Profiles
