import Pokemon from './components/Pokemon';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
