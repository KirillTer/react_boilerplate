import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';
import { selectIsAuthorized } from '../auth-form/authFormSlice';

const PrivateRoute: React.FunctionComponent<{
  children: React.ReactNode;
  path: string;
}> = ({ children, ...rest }) => {
  // const isAuthorized = useAppSelector(selectIsAuthorized);
  const isAuthorized = true;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
