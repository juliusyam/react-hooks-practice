import { useMemo } from 'react';

export function useOptionalUpdateMemo(arg: number, boolArg: boolean): number {
  return useMemo(() => arg, [boolArg]);
}
