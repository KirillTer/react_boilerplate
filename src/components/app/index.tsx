import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'src/pages/auth/index';
import Main from 'src/components/main';
import { mainRoutes } from 'src/components/main/routes';
import PrivateRoute from 'src/components/private-route';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import {
  selectIsAuthorized,
  updateUserRole,
} from 'src/components/auth-form/authFormSlice';

const App: React.FunctionComponent = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(updateUserRole({}));
    }
  }, [isAuthorized]);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        {mainRoutes.map(({ path }) => (
          <PrivateRoute path={path} key={path}>
            <Main />
          </PrivateRoute>
        ))}
        <Route component={() => <Redirect to={{ pathname: '/dashboard' }} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
