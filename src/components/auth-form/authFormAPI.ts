import request, { baseURL } from 'src/request';
import ClientOAuth2 from 'client-oauth2';

const githubAuth = new ClientOAuth2({
  clientId: 'test',
  clientSecret: 'secret',
  accessTokenUri: `${baseURL}oauth/token`,
});

export const sendAuthRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await githubAuth.owner.getToken(email, password);

  sessionStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);

  return res;
};

export const sendRefreshTokenRequest = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await request.post(
    `/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic dGVzdDpzZWNyZXQ=',
      },
    }
  );

  if (!res) {
    // TODO make sure that there is no response if refresh token is invalid
    sessionStorage.clear();
    localStorage.clear();
    return;
  }

  // todo if refresh token valid - update refresh token and access token
  return res;
};

request.interceptors.request.use(
  async (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    };
  },
  async (error) => {
    console.error('request err: ', error);
  }
);

request.interceptors.response.use(
  async (config) => config,
  async (error) => {
    if (!error?.response || error?.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
      // sendRefreshTokenRequest();
    }
  }
);

export const fetchUser = async () => {
  return await request.get('/session/user');
};

export const fetchAccounts = async () => {
  return await request.get('/api/v1/account');
};
