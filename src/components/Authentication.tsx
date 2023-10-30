import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  Auth,
  User
} from 'firebase/auth';
import { auth } from './firebase-config';

const Authentication: React.FC = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(newUser);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const loggedInUser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(loggedInUser);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  return (
    <div className="Authentication">
      <div>
        <h3>Register User</h3>
        <input
          placeholder="Email..."
          value={registerEmail}
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
        <input
          placeholder="Password..."
          value={registerPassword}
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
        <button onClick={register}>Create User</button>
      </div>

      <div>
        <h3>Login</h3>
        <input
          placeholder="Email..."
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          placeholder="Password..."
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>

      <h4>User Logged In:</h4>
      {user ? user.email : 'No user logged in'}

      {user && <button onClick={logout}>Sign Out</button>}
    </div>
  );
};

export default Authentication;
