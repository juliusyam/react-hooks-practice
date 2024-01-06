import reactLogo from './assets/react.svg'
import './App.css';
import { useCounter } from './hooks';
import { Button, Divider, Flex, Image, Typography } from 'antd';
import { ThemeProvider } from './theme';

function App() {

  const initialValue = 5;
  const [count, { increment, decrement, reset }] = useCounter(initialValue);

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
    </ThemeProvider>
  )
}

export default App
