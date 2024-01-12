import { useMemo } from 'react';

type Team = {
  teamName: string;
  score: number;
}

export function useUpdateWinnerMemo(teamAFC: string[], teamNFC: string[], shouldUpdate: boolean): {randomAFCTeam: Team, randomNFCTeam: Team} {
  const getRandomNumber = () => {
    let randomNum = Math.round(Math.random() * 56);
    if (randomNum >= 1) {
      randomNum++;
    }
    return randomNum;
  };

  const getRandomIndex = (array: string[]) => {
    return Math.floor(Math.random() * array.length);
  };

  const randomAFCTeam: Team = useMemo(() => {
    const randomIndex = getRandomIndex(teamAFC);
    return { teamName: teamAFC[randomIndex], score: getRandomNumber() };
  }, [teamAFC, shouldUpdate]);

  const randomNFCTeam: Team = useMemo(() => {
    const randomIndex = getRandomIndex(teamNFC);
    return { teamName: teamNFC[randomIndex], score: getRandomNumber() };
  }, [teamNFC, shouldUpdate]);


  return { randomAFCTeam,  randomNFCTeam };
}
