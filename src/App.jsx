import './App.css'
import { Header } from './common/Header/Header'
import { Body } from './pages/Body/Body'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

export default function App() {
  return (
    <MantineProvider>
      <Header />
      <Body />
    </MantineProvider>
  )
}