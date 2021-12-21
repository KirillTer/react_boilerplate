import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { RootState } from 'src/store/store';
import { fetchAccounts, fetchUser, sendAuthRequest } from './authFormAPI';

type Account = { id: string; name: string; userIds: Array<string> };
export interface AuthFormState {
  isAuthorized: boolean;
  role?: 'REGULAR_USER' | 'ADMIN' | 'SUPERADMIN';
  loading: boolean;
  accounts: Array<Account>;
  selectedAccountId?: string;
}

export const initialState: AuthFormState = {
  isAuthorized: !!sessionStorage.getItem('accessToken'),
  role: undefined,
  loading: false,
  accounts: [],
  selectedAccountId: undefined,
};

export const authorizeWithCredentials = createAsyncThunk(
  'auth/authorizeWithCredentials',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    const response = await sendAuthRequest(credentials);
    thunkAPI.dispatch(login());
    return response;
  }
);

export const updateUserRole = createAsyncThunk(
  'auth/updateUserRole',
  async (_: unknown, thunkAPI) => {
    const response = await fetchUser();
    thunkAPI.dispatch(setRole({ role: response.data.role }));
    thunkAPI.dispatch(
      setSelectedAccountId({ accountId: response.data.accountId })
    );
  }
);

export const getUserAccounts = createAsyncThunk(
  'account/getUserAccounts',
  async (_: unknown, thunkAPI) => {
    const response = await fetchAccounts();
    return thunkAPI.dispatch(setAccounts({ accounts: response.data }));
  }
);

export const authFormSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthorized = false;
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    },
    login: (state) => {
      state.isAuthorized = true;
    },
    setRole: (
      state,
      action: { payload: { role: 'ADMIN' | 'SUPERADMIN' | 'REGULAR_USER' } }
    ) => {
      state.role = action.payload.role;
    },
    setAccounts: (
      state,
      action: {
        payload: {
          accounts: Array<Account>;
        };
      }
    ) => {
      state.accounts = action.payload.accounts;
    },
    setSelectedAccountId: (
      state,
      action: { payload: { accountId: string } }
    ) => {
      state.selectedAccountId = action.payload.accountId;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authorizeWithCredentials.pending, (state) => {
        state.loading = true;
      })
      .addCase(authorizeWithCredentials.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(authorizeWithCredentials.rejected, (state, action) => {
        message.error(action.error.message);
        state.loading = false;
        state.isAuthorized = false;
      });
  },
});

export const { logout, login, setRole, setAccounts, setSelectedAccountId } =
  authFormSlice.actions;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectRole = (state: RootState) => state.auth.role;
export const selectCurrentAccountId = (state: RootState) =>
  state.auth.selectedAccountId;
export const selectAvailableAccounts = (state: RootState) =>
  state.auth.accounts;

export default authFormSlice.reducer;
