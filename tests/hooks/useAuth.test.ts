import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../src/hooks/useAuth';
import * as authService from '../../src/services/authService';

vi.mock('../../src/services/authService');

describe('useAuth', () => {
  const mockLoginResponse = {
    access_token: 'mock-token',
    token_type: 'bearer',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with token from localStorage', () => {
    localStorage.setItem('token', 'saved-token');
    const { result } = renderHook(() => useAuth());

    expect(result.current.token).toBe('saved-token');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should log in and set token', async () => {
    vi.mocked(authService.login).mockResolvedValue(mockLoginResponse);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.token).toBe('mock-token');
    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should register a new user', async () => {
    vi.mocked(authService.register).mockResolvedValue({ message: 'User registered successfully' });

    const { result } = renderHook(() => useAuth());

    const message = await result.current.register('test@example.com', 'password');
    expect(message).toBe('User registered successfully');
  });

  it('should log out and clear token', () => {
    localStorage.setItem('token', 'saved-token');
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
