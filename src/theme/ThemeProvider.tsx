import { FC, ReactNode } from 'react';
import { ConfigProvider, ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorText: '#ffffff',
    colorSplit: '#ffffff',
  },
  components: {
    Button: {
      colorPrimary: '#21B6A8',
      algorithm: true,
      colorBgContainerDisabled: '#839c99',
      colorTextDisabled: '#3c5956',
    },
  }
};

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <ConfigProvider theme={ theme }>{ children }</ConfigProvider>
)
