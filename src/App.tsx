import reactLogo from './assets/react.svg'
import './App.css';
import { useCounter, useIntEffect, useOptionalUpdateMemo, useLuckyQuotesEffect } from './hooks';
import { Button, Checkbox, Divider, Flex, Image, Typography, Input } from 'antd';
import { ThemeProvider } from './theme';
import { useMemo, useState } from 'react';
import { useUtilitiesContext } from './contexts/UtilitiesContext';
import { SuperBowlResult } from './components/SuperBowlResult';

function App() {

  const initialValue = 1;
  const [count, { increment, decrement, reset }] = useCounter(initialValue);

  const [boolArg, setBoolArg] = useState<boolean>(false);

  const countMemo = useOptionalUpdateMemo(count, boolArg);

  const [inputValue, setInputValue] = useState<string>('');

  const { colors, addColor } = useUtilitiesContext();

  useIntEffect(inputValue.length, () => {
    increment();
    console.log('This callback is triggered');
    addColor('#ffdc7d');
  });

  const luckyQuotes: string[] = useMemo(() => {
    return [
      'The harder I work, the luckier I get.',
      'Learn to recognize good luck when it’s waving at you, hoping to get your attention.',
      'Luck is great, but most of life is hard work.',
    ];
  }, []);

  const luckyQuote = useLuckyQuotesEffect(count, luckyQuotes);
  
  return (
    <ThemeProvider>
      <Flex justify="left" align="center">
        <a href="https://react.dev" target="_blank">
          <Image src={ reactLogo } className="logo react" alt="React logo" width="30" height="30" />
        </a>
        <Typography.Title level={ 3 }>React Hooks Practice</Typography.Title>
      </Flex>

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
      
      <SuperBowlResult boolArg={ boolArg } />
    </ThemeProvider>
  )
}

export default App
