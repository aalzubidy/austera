import { useEffect, useState, useContext } from 'react/cjs/react.development';
import { AuthContext, AuthActionsContext } from '../Contexts/AuthContext';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const NavigationHandler = () => {
  // Authorization
  const authActions = useContext(AuthActionsContext);
  const { token } = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Check if there is a refresh token in the cookies
    if (!token && isMounted) {
      authActions.renewToken().then((results) => {
        if (results) {
          setAuthenticated(true);
        }
      }).catch((e) => {
        console.log('No refresh token stored, all good, you don\'t need to do anything about it');
        setAuthenticated(false);
        return true;
      })
    } else if (isMounted && token) {
      setAuthenticated(true);
    }

    return () => isMounted = false;
  }, [token])

  return (
    authenticated ? <MainNavigation /> : <AuthNavigation />
  )
}

export default NavigationHandler;