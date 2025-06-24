import { renderHook, act } from '@testing-library/react';
import { useStepForm } from '@/hooks/useStepForm';

describe('useStepForm', () => {
  it('should start at step 1', () => {
    const { result } = renderHook(() => useStepForm(5));
    expect(result.current.step).toBe(1);
  });

  it('should go to the next step', () => {
    const { result } = renderHook(() => useStepForm(5));

    act(() => {
      result.current.next();
    });

    expect(result.current.step).toBe(2);
  });

  it('should not exceed maxSteps', () => {
    const { result } = renderHook(() => useStepForm(3));

    act(() => {
      result.current.next();
      result.current.next();
      result.current.next(); // Exceeds
    });

    expect(result.current.step).toBe(3); // maxSteps
  });

  it('should go back to previous step', () => {
    const { result } = renderHook(() => useStepForm(5));

    act(() => {
      result.current.next(); // step = 2
      result.current.prev(); // step = 1
    });

    expect(result.current.step).toBe(1);
  });

  it('should not go below step 1', () => {
    const { result } = renderHook(() => useStepForm(5));

    act(() => {
      result.current.prev(); // Already at 1
    });

    expect(result.current.step).toBe(1);
  });
});
