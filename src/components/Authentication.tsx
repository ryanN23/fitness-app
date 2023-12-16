import React, { useState } from 'react';
import './Authentication.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, firestore } from './firebase-config'; 
import { doc, setDoc } from 'firebase/firestore';

const Authentication: React.FC = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerHeight, setRegisterHeight] = useState('');
  const [registerWeight, setRegisterWeight] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const switchToLogin = () => {
    setIsLoginView(true);
    clearErrorMessage();
  };

  const switchToRegister = () => {
    setIsLoginView(false);
    clearErrorMessage();
  };

  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      const userDocRef = doc(firestore, 'users', newUser.user.uid);
      await setDoc(userDocRef, {
        email: registerEmail,
        height: parseFloat(registerHeight),
        weight: parseFloat(registerWeight),
      });

      console.log(newUser);
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Password should be at least 6 characters.');
      } else {
        setErrorMessage('Error during registration.');
      }
    }
  };

  const login = async () => {
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(loggedInUser);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect email or password.');
      } else {
        setErrorMessage('Invalid login.');
      }
    }
  };

  return (
    <div className="Authentication">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {isLoginView ? (
        <div>
          <h3>Login</h3>
          <input
            className="input-field"
            placeholder="Email..."
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password..."
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <button className="action-button" onClick={login}>Login</button>
          <button className="switch-button" onClick={switchToRegister}>Don't have an account? Register</button>
        </div>
      ) : (
        <div>
          <h3>Register User</h3>
          <input
            className="input-field"
            placeholder="Email..."
            value={registerEmail}
            onChange={(event) => setRegisterEmail(event.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password..."
            value={registerPassword}
            onChange={(event) => setRegisterPassword(event.target.value)}
          />
          <input
            className="input-field"
            placeholder="Height (in inches)..."
            value={registerHeight}
            onChange={(event) => setRegisterHeight(event.target.value)}
          />
          <input
            className="input-field"
            placeholder="Weight (in pounds)..."
            value={registerWeight}
            onChange={(event) => setRegisterWeight(event.target.value)}
          />
          <button className="action-button" onClick={register}>Create User</button>
          <button className="switch-button" onClick={switchToLogin}>Already have an account? Login</button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
