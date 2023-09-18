import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleMovie from './pages/SingleMovie';
import Error from './pages/Error';

const App = () => {
  return (
    <>
    
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='movie/:id' element={<SingleMovie />} />
         <Route path='*' element={<Error />}/>
      </Routes>
   
    </>
  )
}

export default App