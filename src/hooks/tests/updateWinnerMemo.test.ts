import { renderHook } from '@testing-library/react';
import { useUpdateWinnerMemo } from '../updateWinnerMemo';

describe('useUpdateWinnerMemo', () => {
  for (let i = 0; i < 10; i++) {
    it('It should return two teams with a score for each', () => {
      const teamAFC = ['TeamA', 'TeamB', 'TeamC'];
      const teamNFC = ['TeamX', 'TeamY', 'TeamZ'];
      const shouldUpdate = false;
      const { randomAFCTeam, randomNFCTeam } = renderHook(() => useUpdateWinnerMemo(teamAFC, teamNFC, shouldUpdate)).result.current;
  
      expect(randomAFCTeam).toHaveProperty('score');
      expect(teamAFC).toContain(randomAFCTeam.teamName);
      expect(randomAFCTeam.score).toBeGreaterThanOrEqual(0);

      expect(randomNFCTeam).toHaveProperty('score');
      expect(teamNFC).toContain(randomNFCTeam.teamName);
      expect(randomNFCTeam.score).toBeGreaterThanOrEqual(0);

    });
  }
});
