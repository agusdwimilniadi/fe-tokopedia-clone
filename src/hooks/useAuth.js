// useAuth.js

import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/const';
import { useSignIn } from 'react-auth-kit';

const useAuth = () => {
  const signIn = useSignIn();
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(API_URL + 'auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const authToken = response.data.data.token;
        updateToken(authToken);
        setIsSuccess(true);
        signIn({
          token: authToken,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: response.data.data.user,
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (error) {
      if (error.response.status == 404 || error.response.status == 401) {
        setErrorMsg('Email atau password salah');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    updateToken(null);
  };

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('authToken');
      setToken(null);
    }
  };

  return {
    token,
    login,
    logout,
    isSuccess,
    isLoading,
    errorMsg,
    setErrorMsg,
  };
};

export default useAuth;
