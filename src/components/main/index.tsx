import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { logout, selectRole } from '../auth-form/authFormSlice';
import { mainRoutes } from './routes';
import { ReactComponent as ReturnLogo } from 'src/assets/return-logo.svg';
import AccountSelect from './account-select';

const StyledLogo = styled(ReturnLogo)`
  height: 48px;
`;

const Page = styled.div`
  display: flex;
  background: #ffffff;
  width: 100vw;
  height: 100vh;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ role }) =>
    role === 'REGULAR_USER' ? '#0f274a' : '#02080e'};
  width: 270px;
  height: 100vh;
  padding-top: 32px;
  gap: 32px;

  a.active {
    cursor: initial;
    background-color: ${({ role }) =>
      role === 'REGULAR_USER' ? '#163667' : '#0f274a'};
  }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  color: #b6cae0;
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  text-transform: uppercase;
  margin: 0 0 8px 24px;
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 32px;
  padding-left: 24px;
  color: #ffffff;

  &:hover {
    color: #ffffff;
  }
`;

const MainContainer = styled.div`
  background: #ffffff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #ffffff;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(239, 239, 239, 0.97);
`;

const MainSection = styled.section`
  display: flex;
  background: #ffffff;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 32px 60px 0 60px;
`;

const Main: React.FunctionComponent = () => {
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch();

  return (
    <Page>
      <Sidebar role={role}>
        <AccountSelect />
        <Section>
          <SectionTitle>menu</SectionTitle>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
          <StyledLink to="/opportunities">Opportunities</StyledLink>
          {role !== 'REGULAR_USER' && (
            <>
              <StyledLink to="/content-index">Content Index</StyledLink>
              <StyledLink to="/users">Users</StyledLink>
            </>
          )}
          {role === 'SUPERADMIN' && (
            <StyledLink to="/sources">Sources</StyledLink>
          )}
        </Section>
        <Section>
          <SectionTitle>my content</SectionTitle>
          <StyledLink to="/tasks">Tasks & Updates</StyledLink>
          <StyledLink to="/shares">My Shares</StyledLink>
          <StyledLink to="/saves">My Saves</StyledLink>
        </Section>
        <Section>
          <SectionTitle>company</SectionTitle>
          <StyledLink to="/top-content">Top Content</StyledLink>
          <StyledLink to="/top-shared">Top Shared</StyledLink>
          <StyledLink to="/new-content">New Content</StyledLink>
        </Section>
      </Sidebar>
      <MainContainer>
        <Header>
          <StyledLogo />
          <Button onClick={() => dispatch(logout())}>logout</Button>
          {/* TODO show user avatar and logout button in dropdown */}
        </Header>
        <MainSection>
          <Switch>
            {mainRoutes.map(({ path, component }) => (
              <Route key={path} path={path}>
                {component}
              </Route>
            ))}
          </Switch>
        </MainSection>
      </MainContainer>
    </Page>
  );
};

export default Main;
