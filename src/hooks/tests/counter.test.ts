import { renderHook } from '@testing-library/react';
import { useCounter } from '../counter';

describe('useCounter', () => {

  it('setups initially correctly', () => {

    const { result: resultWithDefaultInitial } = renderHook(useCounter);

    expect(resultWithDefaultInitial.current[0]).toBe(0);

    const { result: resultWithCustomInitial } = renderHook(() => useCounter(11));

    expect(resultWithCustomInitial.current[0]).toBe(11);

  });

  // Increment Test

  // Decrement Test

  // Reset Test
  // both with default initial value and with custom initial value
});
