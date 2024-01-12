import { useState, useEffect } from 'react';

export function useLuckyQuotesEffect(initialLuckyNumber: number, quotes: string[]) {
  const [quote, setQuote] = useState('');

  useEffect(() => {

    // Check if the luckyNumber is within the valid range
    if (initialLuckyNumber >= 1 && initialLuckyNumber <= quotes.length) {
      // Set the quote based on the luckyNumber
      setQuote(quotes[initialLuckyNumber - 1]);
    } else {
      // Set a respons where the luckyNumber is invalid
      setQuote('Invalid lucky number. Please choose a number between 1 and ' + quotes.length);
    }
  }, [initialLuckyNumber]); 

  return quote;
}
