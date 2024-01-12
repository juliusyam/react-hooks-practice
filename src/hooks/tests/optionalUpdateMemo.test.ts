import { renderHook } from '@testing-library/react';
import { useOptionalUpdateMemo } from '../optionalUpdateMemo';

describe('useOptionalUpdateMemo', () => {
  it('should memoize the value based on boolArg changes', () => {
    // Arrange
    let arg = 42;
    const { result, rerender } = renderHook((boolArg) => useOptionalUpdateMemo(arg, boolArg), {
      initialProps: false, // Initial value for boolArg
    });

    // Act
    const initialValue = result.current;

    // Assert
    expect(result.current).toBe(initialValue);

    arg = 34;

    expect(result.current).toBe(initialValue);

    // Rerender with a different boolArg value
    rerender(true);
    
    // Assert that the value has changed due to boolArg change
    expect(result.current).toBe(arg);
  });
});