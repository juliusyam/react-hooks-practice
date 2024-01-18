import { act, renderHook } from '@testing-library/react';
import { useUtilitiesContext } from '../UtilitiesContext.ts';
import { UtilitiesContextProvider } from '../Provider.tsx';

describe('UtilitiesContext', () => {

  it('should initialise and throw errors on mutate with no provider', () => {

    const { result } = renderHook(useUtilitiesContext);

    expect(() => result.current.addColor('#69aaac')).toThrowError('UtilitiesContext addColor NOT provided, please provide a Provider to consume this Context.');

  });

  it('should add a color', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    expect(result.current.colors).toEqual(['#DDFFE7', '#98D7C2', '#167D7F', '#29A0B1', '#FFC2C7', '#B6E5D8', '#FBE5C8', '#8FDDE7', '#E8B4B8', '#EED6D3']);

    act(() => result.current.addColor('#123456'));

    expect(result.current.colors).toEqual(expect.arrayContaining(['#123456']));

    // Edit Color,
  });

  it('should add a color', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    expect(result.current.colors).toEqual(['#DDFFE7', '#98D7C2', '#167D7F', '#29A0B1', '#FFC2C7', '#B6E5D8', '#FBE5C8', '#8FDDE7', '#E8B4B8', '#EED6D3']);

    act(() => result.current.addColor('#123456'));

    expect(result.current.colors).toEqual(expect.arrayContaining(['#123456']));

  });

  it('should remove color', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    expect(result.current.colors).toEqual(['#DDFFE7', '#98D7C2', '#167D7F', '#29A0B1', '#FFC2C7', '#B6E5D8', '#FBE5C8', '#8FDDE7', '#E8B4B8', '#EED6D3']);

    act(() => result.current.deleteColor('#DDFFE7'));

    expect(result.current.colors).not.toEqual(expect.arrayContaining(['#DDFFE7']));
    
  });

  it('should edit color', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    expect(result.current.colors).toEqual(['#DDFFE7', '#98D7C2', '#167D7F', '#29A0B1', '#FFC2C7', '#B6E5D8', '#FBE5C8', '#8FDDE7', '#E8B4B8', '#EED6D3']);

    act(() => result.current.editColor('#DDFFE7', '#ff0000'));

    expect(result.current.colors).not.toEqual(expect.arrayContaining(['#DDFFE7']));
    expect(result.current.colors).toEqual(expect.arrayContaining(['#ff0000']));
  });

  it('should check initial AFC playoff team Count', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    expect(result.current.afcPlayoffTeams).toEqual(['Ravens', 'Bills', 'Chiefs', 'Texans', 'Browns', 'Dolphins', 'Steelers']);
    expect(result.current.afcPlayoffTeams.length).toEqual(7);
  });

  it('should check can add an AFC playoff team', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    // Create a copy of the array before adding a team
    const prevAfcPlayoffTeams = [...result.current.afcPlayoffTeams];
    const prevAllPlayoffTeams = [...result.current.allPlayoffTeams];

    // Expect AFC Playoff teams to not include Raiders
    expect(prevAfcPlayoffTeams).not.toEqual(expect.arrayContaining(['Raiders']));

    // Add Raiders
    act(() => result.current.addAfcPlayoffTeam('Raiders'));

    // Create a copy of the array after adding a team
    const updatedAfcPlayoffTeams = [...result.current.afcPlayoffTeams];

    expect(result.current.afcPlayoffTeams.length).toEqual(8);
    expect(result.current.afcPlayoffTeams).toEqual(expect.arrayContaining(['Raiders']));
    expect(updatedAfcPlayoffTeams.length).toEqual(prevAfcPlayoffTeams.length + 1);
    expect(prevAfcPlayoffTeams).not.toEqual(result.current.afcPlayoffTeams);
    expect(prevAllPlayoffTeams).not.toEqual(result.current.allPlayoffTeams);

  });

  it('should check can remove an AFC playoff team', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    const prevAfcPlayoffTeams = [...result.current.afcPlayoffTeams];

    expect(prevAfcPlayoffTeams).toEqual(expect.arrayContaining(['Bills']));
    
    act(() => result.current.removeAfcPlayoffTeam('Bills'));

    expect(result.current.afcPlayoffTeams.length).toEqual(prevAfcPlayoffTeams.length - 1);
    expect(result.current.afcPlayoffTeams).not.toEqual(expect.arrayContaining(['Bills']));

  });

  it('should edit AFC playoff teams', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    const prevAfcPlayoffTeams = [...result.current.afcPlayoffTeams];

    expect(prevAfcPlayoffTeams).toEqual(expect.arrayContaining(['Bills']));

    act(() => result.current.replaceAfcPlayoffTeam('Bills', 'Jags'));

    expect(result.current.afcPlayoffTeams.length).toEqual(prevAfcPlayoffTeams.length);
    expect(result.current.afcPlayoffTeams).toEqual(expect.arrayContaining(['Jags']));
    
  });

  it('should check initial NFC playoff team Count', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    expect(result.current.nfcPlayoffTeams.length).toEqual(7);
  });

  it('should check can add an NFC playoff team', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    const prevNfcPlayoffTeams = [...result.current.nfcPlayoffTeams];

    expect(prevNfcPlayoffTeams).not.toEqual(expect.arrayContaining(['Saints']));

    act(() => result.current.addNfcPlayoffTeam('Saints'));

    const updatedNfcPlayoffTeams = [...result.current.nfcPlayoffTeams];

    expect(result.current.nfcPlayoffTeams).toEqual(expect.arrayContaining(['Saints']));
    expect(updatedNfcPlayoffTeams.length).toEqual(prevNfcPlayoffTeams.length + 1);
    expect(prevNfcPlayoffTeams).not.toEqual(result.current.nfcPlayoffTeams); 

  });

  it('should check can remove an NFC playoff team', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });
    const prevNfcPlayoffTeams = [...result.current.nfcPlayoffTeams];

    expect(prevNfcPlayoffTeams).toEqual(expect.arrayContaining(['Eagles']));
    
    act(() => result.current.removeNfcPlayoffTeam('Eagles'));

    expect(result.current.nfcPlayoffTeams.length).toEqual(prevNfcPlayoffTeams.length - 1);
    expect(result.current.nfcPlayoffTeams).not.toEqual(expect.arrayContaining(['Eagles']));
    
  });

  it('should edit NFC playoff teams', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });
    const prevNfcPlayoffTeams = [...result.current.nfcPlayoffTeams];

    expect(prevNfcPlayoffTeams).toEqual(expect.arrayContaining(['Eagles']));

    act(() => result.current.replaceNfcPlayoffTeam('Eagles', 'Saints'));

    expect(result.current.nfcPlayoffTeams.length).toEqual(prevNfcPlayoffTeams.length);
    expect(result.current.nfcPlayoffTeams).toEqual(expect.arrayContaining(['Saints']));
    
  });

  it('should check initial All playoff teams equal AFC/NFC teams combined', () => {

    const { result } = renderHook(useUtilitiesContext, {
      wrapper: UtilitiesContextProvider,
    });

    const combinedTeams = [...result.current.afcPlayoffTeams, ...result.current.nfcPlayoffTeams];

    expect(result.current.allPlayoffTeams).toEqual(combinedTeams);
    expect(result.current.allPlayoffTeams.length).toEqual(14);
    expect(result.current.allPlayoffTeams.length).toEqual(combinedTeams.length);
  });
});
