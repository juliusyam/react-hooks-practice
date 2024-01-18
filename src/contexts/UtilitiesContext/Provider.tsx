import { UtilitiesContext } from './UtilitiesContext';
import { ReactNode, useMemo, useState } from 'react';

export function UtilitiesContextProvider({ children }: { children: ReactNode }) {

  const [colors, setColors] = useState<string[]>([
    '#DDFFE7', '#98D7C2', '#167D7F', '#29A0B1', '#FFC2C7', '#B6E5D8', '#FBE5C8', '#8FDDE7', '#E8B4B8', '#EED6D3'
  ]);
  const addColor = (color: string) => setColors(prevState => [...prevState, color]);
  const deleteColor = (color: string) => {
    setColors(prevState => {
      const index = prevState.findIndex(t => t === color);

      if (index !== -1) {
        const updatedColors = [...prevState];
        updatedColors.splice(index, 1);
        return updatedColors;
      }

      return prevState;
    });
  };  
  const editColor = (oldColor: string, newColor: string) => {
    setColors(prevState => {
      const index = prevState.findIndex(t => t === oldColor);

      if (index !== -1) {
        const updatedColors = [...prevState];
        updatedColors.splice(index, 1, newColor);
        return updatedColors;
      }
  
      // If the old team is not found, return the original array
      return prevState;
    });
  };
  
  // AFC Teams
  const [afcPlayoffTeams, setAfcPlayoffTeams] = useState<string[]>([
    'Ravens', 'Bills', 'Chiefs', 'Texans', 'Browns', 'Dolphins', 'Steelers'
  ]);
  const addAfcPlayoffTeam = (team: string) => setAfcPlayoffTeams(prevState => [...prevState, team]);
  const removeAfcPlayoffTeam = (team: string) => {
    setAfcPlayoffTeams(prevState => {
      const index = prevState.findIndex(t => t === team);

      if (index !== -1) {
        const updatedTeams = [...prevState];
        updatedTeams.splice(index, 1);
        return updatedTeams;
      }
        
      return prevState;
    });
  };

  const replaceAfcPlayoffTeam = (oldTeam: string, newTeam: string) => {
    setAfcPlayoffTeams(prevState => {
      const index = prevState.findIndex(t => t === oldTeam);

      if (index !== -1) {
        const updatedTeams = [...prevState];
        updatedTeams.splice(index, 1, newTeam);
        return updatedTeams;
      }
  
      return prevState;
    });
  };

  // NFC Teams
  const [nfcPlayoffTeams, setNfcPlayoffTeams] = useState<string[]>([
    '49ers', 'Cowboys', 'Lions', 'Buccaneers', 'Eagles', 'Rams', 'Packers'
  ]);
  const addNfcPlayoffTeam = (team: string) => setNfcPlayoffTeams(prevState => [...prevState, team]);
  const removeNfcPlayoffTeam = (team: string) => {
    setNfcPlayoffTeams(prevState => {
      const index = prevState.findIndex(t => t === team);
  
      if (index !== -1) {
        const updatedTeams = [...prevState];
        updatedTeams.splice(index, 1);
        return updatedTeams;
      }

      return prevState;
    });
  };

  const replaceNfcPlayoffTeam = (oldTeam: string, newTeam: string) => {
    setNfcPlayoffTeams(prevState => {
      const index = prevState.findIndex(t => t === oldTeam);
      
      if (index !== -1) {
        const updatedTeams = [...prevState];
        updatedTeams.splice(index, 1, newTeam);
        return updatedTeams;
      }
  
      return prevState;
    });
  };

  const allPlayoffTeams: string[] = useMemo(() => {
    return [
      ...afcPlayoffTeams, ...nfcPlayoffTeams
    ];
  }, [afcPlayoffTeams, nfcPlayoffTeams]);

  return (
    <UtilitiesContext.Provider value={ {
      colors, addColor, deleteColor, editColor,
      afcPlayoffTeams, addAfcPlayoffTeam, removeAfcPlayoffTeam, replaceAfcPlayoffTeam, 
      nfcPlayoffTeams, addNfcPlayoffTeam, removeNfcPlayoffTeam, replaceNfcPlayoffTeam,
      allPlayoffTeams
    } }>
      { children }
    </UtilitiesContext.Provider>
  );
}
