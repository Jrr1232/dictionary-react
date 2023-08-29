import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router';
import './App.css';
import { theme } from './common/theme';
import Home from './components/Home';
import MultipleChoice from './components/MultipleChoice';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/multi' element={<MultipleChoice />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
