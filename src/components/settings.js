import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import './settings.css';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [riotUsername, setRiotUsername] = useState('');
  const [riotTagline, setRiotTagline] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirm delete modal
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setEmail(user.email);
          setRiotUsername(userSnap.data().riotUsername);
          setRiotTagline(userSnap.data().riotTagline);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload(); 
    } catch (err) {
      setError('Error logging out.');
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      setError('Please enter both old and new passwords.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setNewPassword('');
      setOldPassword('');
      setError(null);
      alert('Password updated successfully!');
      setShowModal(false); // Close the modal after password change
    } catch (err) {
      setError('Error updating password or invalid credentials.');
    }
  };

  const handleDataDelete = async () => {
    try {
      const userDoc = doc(db, 'users', user.uid);
      await deleteDoc(userDoc);
      alert('Account data deleted successfully!');
      await signOut(auth); // Log out after data deletion
    } catch (err) {
      setError('Error deleting data.');
    }
  };

  const handleRiotUsernameChange = async () => {
    if (riotUsername) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { riotUsername }, { merge: true });
      alert('Riot username updated successfully!');
    }
  };

  const handleRiotTaglineChange = async () => {
    if (riotTagline) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { riotTagline }, { merge: true });
      alert('Riot tagline updated successfully!');
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center' }} className="settings-container">
        <h1 >Settings</h1>
        <p>You must be logged in to access the user settings page. Please log in first.</p>
        <div className="section">
        <h3 style={{}}>Contact</h3>
        <p>If you need support, reach out to: support@valoranttracker.com</p>
      </div>
      </div>
      
    );
  }

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-sections">
        {/* Account Settings */}
        <div className="settings-box">
          <h3>Account Settings</h3>
          <div style={{width: '100%'}}><p>Email: {email}</p></div>
          <button style={{marginBottom: '25px', marginTop   : '30px'}} onClick={() => setShowModal(true)}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
          <button style={{marginTop   : '25px'}} onClick={() => setShowConfirmModal(true)} className="delete-btn">
            Delete Account Data
          </button>
        </div>

        {/* Privacy & Security */}
        <div className="settings-box">
          <h3>Privacy & Security</h3>
          <div className="input-container">
            <label>
              Riot Username:
              <input
                type="text"
                value={riotUsername}
                onChange={(e) => setRiotUsername(e.target.value)}
              />
            </label>
            <button onClick={handleRiotUsernameChange}>Update Riot Username</button>
          </div>
          <div className="input-container">
            <label>
              Riot Tagline:
              <input
                type="text"
                value={riotTagline}
                onChange={(e) => setRiotTagline(e.target.value)}
              />
            </label>
            <button onClick={handleRiotTaglineChange}>Update Riot Tagline</button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }} className="section">
        <h3>Contact</h3>
        <p>If you need support, reach out to: support@valoranttracker.com</p>
      </div>

      {/* Modal for password change */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Change Password</h2>
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            {error && <div className="error">{error}</div>}
            <button onClick={handlePasswordChange}>Update Password</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Data Deletion */}
      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure?</h2>
            <p>
              Deleting your account data will remove the following:
              <ul>
                <li>Riot username</li>
                <li>Riot tagline</li>
                <li>Any other personal information associated with your account</li>
              </ul>
            </p>
            <button onClick={handleDataDelete}>Yes, Delete Data</button>
            <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
