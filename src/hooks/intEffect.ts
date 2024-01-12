import { useEffect } from 'react';

export function useIntEffect(arg: number, callback: () => void) {

  useEffect(() => {
    console.log(`useEffect is called with updated value: ${ arg }`);

    callback();
  }, [arg]);
}
