export interface UtilitiesContextState {
  colors: string[],
  afcPlayoffTeams: string[],
  nfcPlayoffTeams: string[],
  allPlayoffTeams: string[],
  addColor: (color: string) => void,
  deleteColor: (color: string) => void,
  editColor: (oldColor: string, newColor: string) => void,
  addAfcPlayoffTeam: (team: string) => void,
  addNfcPlayoffTeam: (team: string) => void,
  removeAfcPlayoffTeam: (team: string) => void,
  removeNfcPlayoffTeam: (team: string) => void,
  replaceAfcPlayoffTeam: (oldTeam: string, newTeam: string) => void,
  replaceNfcPlayoffTeam: (oldTeam: string, newTeam: string) => void,
}
