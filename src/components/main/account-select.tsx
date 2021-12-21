import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  getUserAccounts,
  selectAvailableAccounts,
  selectCurrentAccountId,
  selectRole,
  setSelectedAccountId,
} from 'src/components/auth-form/authFormSlice';

const StyledButton = styled(Button)`
  margin: 0 24px;
`;

const AccountSelect: React.FunctionComponent = () => {
  const role = useAppSelector(selectRole);
  const accounts = useAppSelector(selectAvailableAccounts);
  const currentAccountId = useAppSelector(selectCurrentAccountId);

  const currentAccount = accounts.find(
    (account) => account.id === currentAccountId
  ) || { name: 'default' };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (role === 'SUPERADMIN' && !accounts.length) {
      dispatch(getUserAccounts({}));
    }
  }, [role, accounts]);

  const menu = (
    <Menu
      onClick={() => {
        console.log('menu click');
      }}
    >
      {accounts.map((account) => (
        <Menu.Item
          key={account.id}
          onClick={() =>
            dispatch(setSelectedAccountId({ accountId: account.id }))
          }
        >
          {account.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  if (role !== 'SUPERADMIN') {
    return null;
  }

  return (
    <Dropdown overlay={menu}>
      <StyledButton>
        {currentAccount.name} <UserOutlined />
      </StyledButton>
    </Dropdown>
  );
};

export default AccountSelect;
