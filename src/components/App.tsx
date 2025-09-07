import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Package from './package';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id/:agencyId/:userId" element={<Package />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
