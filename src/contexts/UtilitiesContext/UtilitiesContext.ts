import { createContext, useContext } from 'react';
import { UtilitiesContextState } from './interface.ts';

export const UtilitiesContext = createContext<UtilitiesContextState>({
  colors: [],
  afcPlayoffTeams: [],
  nfcPlayoffTeams: [],
  allPlayoffTeams: [],
  addColor: () => {
    throw new Error('UtilitiesContext addColor NOT provided, please provide a Provider to consume this Context.');
  },
  deleteColor: () => {
    throw new Error('UtilitiesContext deleteColor NOT provided, please provide a Provider to consume this Context.');
  },
  editColor: () => {
    throw new Error('UtilitiesContext editColor NOT provided, please provide a Provider to consume this Context.');
  },
  addAfcPlayoffTeam: () => {
    throw new Error('UtilitiesContext addAfcTeam NOT provided, please provide a Provider to consume this Context.');
  },
  addNfcPlayoffTeam: () => {
    throw new Error('UtilitiesContext addNfcTeam NOT provided, please provide a Provider to consume this Context.');
  },
  removeAfcPlayoffTeam: () => {
    throw new Error('UtilitiesContext addAfcTeam NOT provided, please provide a Provider to consume this Context.');
  },
  removeNfcPlayoffTeam: () => {
    throw new Error('UtilitiesContext addNfcTeam NOT provided, please provide a Provider to consume this Context.');
  },
  replaceAfcPlayoffTeam: () => {
    throw new Error('UtilitiesContext replaceAfcPlayoffTeam NOT provided, please provide a Provider to consume this Context.');
  },
  replaceNfcPlayoffTeam: () => {
    throw new Error('UtilitiesContext addNfcTeam NOT provided, please provide a Provider to consume this Context.');
  }

});

export const useUtilitiesContext = () => useContext(UtilitiesContext);
