import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Input, Button, Form } from 'antd';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import {
  selectIsAuthorized,
  authorizeWithCredentials,
  selectRole,
} from './authFormSlice';
import { ReactComponent as ReturnLogo } from 'src/assets/return-logo.svg';

const StyledForm = styled(Form)`
  background-color: white;
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 20px;

  .ant-form-item-control {
    width: 100%;
  }
`;

const StyledLogo = styled(ReturnLogo)`
  width: 200px;
  height: 54px;
`;

const inputStyles = css`
  height: 36px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  ${inputStyles}
  width: 100%;
  margin-top: 12px;
`;

const StyledInput = styled(Input)`
  ${inputStyles}
`;

const StyledPasswordInput = styled(Input.Password)`
  ${inputStyles}
`;

const StyledFormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
`;

const Text = styled.span`
  font-size: 18px;
  margin: 16px 0 8px 0;
`;

export const AuthForm = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch();

  const shouldRedirect = isAuthorized && role;

  return shouldRedirect ? (
    <Redirect
      to={{
        pathname: role === 'REGULAR_USER' ? '/dashboard' : '/opportunities',
      }}
    />
  ) : (
    <StyledForm
      onFinish={(values) => {
        const { email, password } = values as {
          email: string;
          password: string;
        };
        dispatch(authorizeWithCredentials({ email, password }));
      }}
    >
      <StyledLogo />
      <Text>Close Deals Faster</Text>
      <StyledFormItem label="Email" name="email">
        <StyledInput
          type="email"
          placeholder="Enter your email"
          data-test="email-input"
        />
      </StyledFormItem>
      <StyledFormItem label="Password" name="password">
        <StyledPasswordInput
          placeholder="Enter your password"
          visibilityToggle
          data-test="password-input"
        />
      </StyledFormItem>
      <StyledButton htmlType="submit" type="primary" data-test="submit-button">
        log in
      </StyledButton>
    </StyledForm>
  );
};
