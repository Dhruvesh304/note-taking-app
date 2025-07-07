import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './Components/Notes';
import FullEditor from './Components/FullEditor';
import NavBar from './Components/NavBar';

import GlossaryViewer from './GlossaryViewer';



function App() {
  return (
    <>
    
   <div className='bg-gray-900'>
     <Router >
      <NavBar />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/editor" element={<FullEditor />} />          
        <Route path="/glossary" element={<GlossaryViewer />} />
      </Routes>
    </Router>

   </div>
    </>
  );
}

export default App;