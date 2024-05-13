import { Button, Checkbox, Divider, Flex, Image, Input, Typography } from 'antd';
import reactLogo from '../assets/react.svg';
import { SuperBowlResult } from '../components/SuperBowlResult.tsx';
import { useCounter, useIntEffect, useLuckyQuotesEffect, useOptionalUpdateMemo } from '../hooks';
import { useMemo, useState } from 'react';
import { useUtilitiesContext } from '../contexts/UtilitiesContext';

export function HomePage() {

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
    <>
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

      <Divider/>

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }>useOptionalUpdateMemo</Typography.Title>
        <Flex justify="center" align="center" gap="middle">
          <Checkbox checked={ boolArg } onChange={ () => setBoolArg(prevState => !prevState) }/>
          <Typography.Title level={ 3 }>Memo Count: { countMemo }</Typography.Title>
        </Flex>
      </Flex>

      <Divider/>

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }
                          style={ { color: colors[inputValue.length % 10] ?? '#69aaac' } }>useIntEffect</Typography.Title>
        <Input showCount value={ inputValue } onChange={ e => setInputValue(e.target.value) }/>
      </Flex>

      <Divider/>

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }>New Lucky Quote = { luckyQuote }</Typography.Title>
      </Flex>

      <Divider/>

      <SuperBowlResult boolArg={ boolArg }/>
    </>
  )
}
