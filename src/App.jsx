import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <div>
      <Navs />
      <BrowserRouter>
        <Routes>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/starred">
            <Starred />
          </Route>

          <Route>
            <div>Not found</div>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
