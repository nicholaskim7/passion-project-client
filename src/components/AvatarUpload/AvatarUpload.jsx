import React, { useState } from 'react';
import { toast } from 'react-toastify';


function AvatarUpload() {
  // state to store user selected avatar
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('https://passion-project-server.onrender.com/api/upload-avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();

      toast.success('Upload successful!');
      console.log('Avatar URL:', data.avatarUrl);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    }
  };
  return (
    <div>
      <h2>Update avatar:</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default AvatarUpload
