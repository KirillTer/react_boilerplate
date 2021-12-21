import React from 'react';
import styled from 'styled-components';
import { AuthForm } from 'src/components/auth-form';

const Page = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: #07274d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Auth: React.FunctionComponent = () => {
  return (
    <Page>
      <AuthForm />
    </Page>
  );
};

export default Auth;
