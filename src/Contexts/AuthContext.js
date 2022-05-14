import { useState, createContext, useRef } from "react/cjs/react.development";
import axios from 'axios';
// import { MMKV } from 'react-native-mmkv'
import * as SecureStore from 'expo-secure-store';
import publicIP from 'react-native-public-ip';
import { AUSTERA_BASE_URL } from '../Configs/generalConfigs';

export const AuthContext = createContext();

export const AuthActionsContext = createContext();

export function AuthProvider(props) {
  // Dynamic
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Static
  // const logoutEventName = 'austera-frontend-logout';
  const refreshTokenAsyncKey = 'austera-frontend-refresh-token';

  // Urls
  const baseUrl = AUSTERA_BASE_URL;
  const renewTokenUrl = '/renewTokenByCookie';
  const loginUrl = '/login';
  const logoutUrl = '/logoutByCookie';
  const registerUserUrl = '/register';
  const getUserUrl = '/account';

  // Timeout configurations
  const tokenTimeOutMS = 9 * 60 * 1000;
  const tokenTimeOutId = useRef(null);

  // Cancel renewing token timeout
  const cancelRenewTokenSchedule = () => {
    if (tokenTimeOutId.current) {
      clearTimeout(tokenTimeOutId.current);
    }
  };

  // Get in memory token
  const getToken = () => {
    return token;
  };

  // Set in memory token
  const setAccessToken = (accessToken) => {
    setToken(accessToken);
    getUser(accessToken);
    scheduleRenewToken();
  };

  // Set refresh token in SecureStore
  const setRefreshToken = async (refreshToken) => {
    try {
      await SecureStore.setItemAsync(refreshTokenAsyncKey, refreshToken);
    } catch (error) {
      console.log('could not store refresh token');
    }
  };

  // Delete token for logout
  const clearToken = () => {
    setToken(null);
    setUser(null);
    SecureStore.deleteItemAsync(refreshTokenAsyncKey);
    cancelRenewTokenSchedule();
  };

  //  Renew token by cookie
  const renewToken = async () => {
    // SecureStore.deleteItemAsync(refreshTokenAsyncKey);
    // return;

    try {
      const refreshTokenStorage = await SecureStore.getItemAsync(refreshTokenAsyncKey);

      const renewTokenResponse = await axios.post(baseUrl + renewTokenUrl, {}, {
        headers: {
          Cookie: `refresh_token=${refreshTokenStorage}`
        }
      });

      if (renewTokenResponse && renewTokenResponse.data && renewTokenResponse.data['data']) {
        await setAccessToken(renewTokenResponse.data['data']['accessToken']);
        setRefreshToken(renewTokenResponse.data['data']['refreshToken']);
        return renewTokenResponse.data['data']['accessToken'];
      } else {
        clearToken();
        return false;
      }
    } catch (error) {
      clearToken();
      throw error;
    }
  };

  // Call renewToken automatically before token expires
  const scheduleRenewToken = () => {
    tokenTimeOutId.current = setTimeout(() => {
      renewToken()
    }, tokenTimeOutMS);
  }

  // Disconnect all session
  // window.addEventListener('storage', (event) => {
  //   if (event.key === logoutEventName) {
  //     clearToken();
  //   }
  // });

  // Login and set access token
  const login = async (email, password) => {
    try {
      const ip = await publicIP();
      const loginResponse = await axios.post(baseUrl + loginUrl, {
        email,
        password,
        ip
      });

      if (loginResponse && loginResponse.data && loginResponse.data['data']) {
        setAccessToken(loginResponse.data['data']['accessToken']);
        setRefreshToken(loginResponse.data['data']['refreshToken']);
        return (loginResponse.data['data']['accessToken']);
      } else {
        clearToken();
        throw new Error('could not login');
      }
    } catch (error) {
      clearToken();
      throw error;
    }
  };

  // Logout user from backend and front end
  const logout = async () => {
    try {
      await axios.post(baseUrl + logoutUrl, {}, {
        headers: {
          token: accessToken,
          Cookie: `refresh_token=${await SecureStore.getItemAsync(refreshTokenAsyncKey)}`
        }
      });
      clearToken();
      return ('Logged out successful');
    } catch (error) {
      clearToken();
      throw new Error('Could not logout from backend');
    }
  };

  // Get user information
  const getUser = async (accessToken = token) => {
    try {
      const { data } = await axios.get(baseUrl + getUserUrl, { headers: { token: accessToken } });
      if (data) {
        const newUser = data.data;
        if (newUser && newUser.email && newUser.username) {
          setUser(newUser);
        } else {
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Generate a user pin and return backend results
  const registerUser = async (email, password, username) => {
    try {
      const ip = await publicIP();
      const response = await axios({
        method: 'post',
        url: baseUrl + registerUserUrl,
        data: {
          email,
          password,
          username,
          ip
        }
      });

      if (response && response.data && response.data['data']) {
        return (response.data);
      } else {
        clearToken();
        throw new Error('could not register user');
      }
    } catch (error) {
      clearToken();
      throw new Error(`Could not register new user ${error}`);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user }}>
      <AuthActionsContext.Provider value={{ getToken, login, logout, registerUser, renewToken, getUser }}>
        {props.children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}
