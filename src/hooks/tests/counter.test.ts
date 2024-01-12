import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../counter';

describe('useCounter', () => {

  it('setups initially correctly', () => {

    const { result: resultWithDefaultInitial } = renderHook(useCounter);

    expect(resultWithDefaultInitial.current[0]).toBe(0);

    const { result: resultWithCustomInitial } = renderHook(() => useCounter(11));

    expect(resultWithCustomInitial.current[0]).toBe(11);

  });

  // Increment Test

  it('Increment count', () => {
    const { result } = renderHook(() => useCounter(11));

    act(() => result.current[1].increment());

    expect(result.current[0]).toBe(12);

  });

  // Decrement Test
  it('Decrement count', () => {
    const { result } = renderHook(() => useCounter(11));

    act(() => result.current[1].decrement());

    expect(result.current[0]).toBe(10);

  });

  // Reset Test
  // both with default initial value and with custom initial value
  it('Reset initial value', () => {
    const { result } = renderHook(useCounter);
    
    act(() => result.current[1].increment());

    expect(result.current[0]).toBe(1);

    act(() => result.current[1].reset());

    expect(result.current[0]).toBe(0);

  });

  it('Reset Custom value', () => {
    const { result } = renderHook(() => useCounter(8));

    act(() => result.current[1].increment());

    expect(result.current[0]).toBe(9);

    act(() => result.current[1].reset());
    
    expect(result.current[0]).toBe(8);

  });
});
