import authFormReducer, {
  login,
  logout,
  initialState,
  setRole,
} from './authFormSlice';

describe('auth reducer', () => {
  const { location } = window;

  beforeAll(() => {
    // @ts-ignore
    delete window.location;

    window.location = {
      ...location,
      reload: jest.fn(),
    };
  });

  afterAll(() => {
    window.location = location;
  });

  it('should handle initial state', () => {
    expect(authFormReducer(initialState, { type: 'unknown' })).toEqual({
      isAuthorized: false,
      role: undefined,
      loading: false,
    });
  });

  it('should handle login', () => {
    const actual = authFormReducer(initialState, login());
    expect(actual.isAuthorized).toEqual(true);
  });

  it('should handle logout', () => {
    const actual = authFormReducer(initialState, logout());
    expect(actual.isAuthorized).toEqual(false);
    expect(window.location.reload).toBeCalled();
  });

  it('should handle setting role', () => {
    const actual = authFormReducer(initialState, setRole({ role: 'ADMIN' }));
    expect(actual.role).toEqual('ADMIN');
  });
});
