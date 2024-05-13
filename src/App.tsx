import './App.css';
import { ThemeProvider } from './theme';
import Pusher from 'pusher-js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, LaravelEchoPage } from './pages';
import { Flex, Image, Typography } from 'antd';
import reactLogo from './assets/react.svg';

(window as any).Pusher = Pusher;

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/laravel-echo',
    element: <LaravelEchoPage />
  }
]);

function App() {
  return (
    <ThemeProvider>
      <Flex justify="left" align="center">
        <Image src={ reactLogo } className="logo react" alt="React logo" width="30" height="30" preview={ false } />
        <Typography.Title level={ 3 } style={ { margin: 0 } }>React Hooks Practice</Typography.Title>
      </Flex>

      <RouterProvider router={ router } />
    </ThemeProvider>
  )
}

export default App
