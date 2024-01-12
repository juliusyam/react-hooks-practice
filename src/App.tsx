import reactLogo from './assets/react.svg'
import './App.css';
import { useCounter, useIntEffect, useOptionalUpdateMemo, useLuckyQuotesEffect, useUpdateWinnerMemo } from './hooks';
import { Button, Checkbox, Divider, Flex, Image, Typography, Input } from 'antd';
import { ThemeProvider } from './theme';
import { useMemo, useState } from 'react';


function App() {

  const initialValue = 1;
  const [count, { increment, decrement, reset }] = useCounter(initialValue);

  const [boolArg, setBoolArg] = useState<boolean>(false);

  const countMemo = useOptionalUpdateMemo(count, boolArg);

  const [inputValue, setInputValue] = useState<string>('');

  useIntEffect(inputValue.length, () => {
    increment();
    console.log('This callback is triggered');
  });

  const luckyQuotes: string[] = useMemo(() => {
    return [
      'The harder I work, the luckier I get.',
      'Learn to recognize good luck when it’s waving at you, hoping to get your attention.',
      'Luck is great, but most of life is hard work.',
    ];
  }, []);

  const luckyQuote = useLuckyQuotesEffect(count, luckyQuotes);

  const colors: string[] = useMemo(() => {
    return ['#DDFFE7', '#98D7C2', '#167D7F', '#29A0B1', '#FFC2C7', '#B6E5D8', '#FBE5C8', '#8FDDE7', '#E8B4B8', '#EED6D3'];
  }, []);

  const afcTeams: string[] = useMemo(() => {
    return ['Ravens', 'Bills', 'Chiefs', 'Texans', 'Browns', 'Dolphins', 'Steelers'];
  }, []);

  const nfcTeams: string[] = useMemo(() => {
    return ['49ers', 'Cowboys', 'Lions', 'Buccaneers', 'Eagles', 'Rams', 'Packers'];
  }, []);

  const [updateSuperBowl, setUpdateSuperBowl] = useState<boolean>(false);

  const handleUpdateSuperBowl = () => {
    setUpdateSuperBowl(boolArg);
  };

  const superBowlResult = useUpdateWinnerMemo(afcTeams, nfcTeams, updateSuperBowl);

  return (
    <ThemeProvider>
      <Flex justify="left" align="center">
        <a href="https://react.dev" target="_blank">
          <Image src={ reactLogo } className="logo react" alt="React logo" width="30" height="30" />
        </a>
        <Typography.Title level={ 3 }>React Hooks Practice</Typography.Title>
      </Flex>

      <Divider />

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }>useCounter</Typography.Title>
        <Flex justify="center" align="center" gap="middle">
          <Button onClick={ decrement } type="primary">
            Decrement
          </Button>
          <Typography.Title level={ 3 }>Count: { count }</Typography.Title>
          <Button onClick={ increment } type="primary">
            Increment
          </Button>
          <Button onClick={ reset } disabled={ count == initialValue } type="default">
            Reset
          </Button>
        </Flex>
      </Flex>

      <Divider />

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }>useOptionalUpdateMemo</Typography.Title>
        <Flex justify="center" align="center" gap="middle">
          <Checkbox checked={ boolArg } onChange={ () => setBoolArg(prevState => !prevState) } />
          <Typography.Title level={ 3 }>Memo Count: { countMemo }</Typography.Title>
        </Flex>
      </Flex>

      <Divider />

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 } style={ { color: colors[inputValue.length % 10] ?? '#69aaac' } }>useIntEffect</Typography.Title>
        <Input showCount value={ inputValue } onChange={ e => setInputValue(e.target.value) } />
      </Flex>

      <Divider />

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }>New Lucky Quote = {luckyQuote}</Typography.Title>
      </Flex>

      <Divider />

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }>
          {'Super Bowl Result = '} 
          {superBowlResult.randomAFCTeam.teamName}: {superBowlResult.randomAFCTeam.score} 
          {' v '} 
          {superBowlResult.randomNFCTeam.teamName}: {superBowlResult.randomNFCTeam.score}
        </Typography.Title>
        <Flex gap="middle" justify="center" align="center" vertical>
        <Button onClick={handleUpdateSuperBowl} type="primary">
          Update Super Bowl Result
        </Button>
      </Flex>
      </Flex>
    </ThemeProvider>
  )
}

export default App
