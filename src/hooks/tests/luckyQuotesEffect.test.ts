import { renderHook } from '@testing-library/react';
import { useLuckyQuotesEffect } from '../luckyQuotesEffect';

describe('useLuckyQuotesEffect', () => {

  // An array of lucky quotes
  // Add more lucky quotes
  const luckyQuotes = [
    'The harder I work, the luckier I get.',
    'Learn to recognize good luck when it’s waving at you, hoping to get your attention.',
    'Luck is great, but most of life is hard work.',
  ];

  it('should set the quote based on the initial lucky number', () => {
    const { result, rerender } = renderHook(({ initialLuckyNumber, quotes }) => useLuckyQuotesEffect(initialLuckyNumber, quotes), {
      initialProps: { initialLuckyNumber: 2, quotes: luckyQuotes },
    });

    expect(result.current).toBe(luckyQuotes[1]);

    // Rerender with a different initialLuckyNumber
    rerender({ initialLuckyNumber: 1, quotes: luckyQuotes });
    expect(result.current).toBe(luckyQuotes[0]);
  });

  it('should set a response for an invalid lucky number', () => {
    const { result } = renderHook(() => useLuckyQuotesEffect(0, luckyQuotes));

    expect(result.current).toBe('Invalid lucky number. Please choose a number between 1 and ' + luckyQuotes.length);
  });

  it('should handle a valid range of initial lucky numbers', () => {
    for (let i = 1; i <= luckyQuotes.length; i++) {
      const { result } = renderHook(() => useLuckyQuotesEffect(i, luckyQuotes));
      expect(result.current).toBe(luckyQuotes[i - 1]);
    }
  });
});
