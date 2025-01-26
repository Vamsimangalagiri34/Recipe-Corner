import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Recipes from './Recipes';
import Footer from './Footer';
import RecipeDetails from './RecipeDetails';  // Assuming you create this component later

function App() {
  return (
    <Router>
      <NavBar />  {/* NavBar will be displayed on all pages */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> You can create a Home component */}
        <Route path="/recipes" element={<Recipes />} />
        <Route path='/recipe-details' element ={<RecipeDetails/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
