import { useState } from 'react';

type CounterHook = [
  number,
  {
    increment: () => void,
    decrement: () => void,
    reset: () => void,
  }
]

export function useCounter(initialValue = 0): CounterHook {

  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount(prevState => prevState + 1);

  const decrement = () => setCount(prevState => prevState - 1);

  const reset = () => setCount(initialValue);

  return [count, { increment, decrement, reset }];
}
