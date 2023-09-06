import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ShowCountries from './components/showCountries.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowCountries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://vncppionwaebafkldsxm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY3BwaW9ud2FlYmFma2xkc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyNTIwODEsImV4cCI6MjAwODgyODA4MX0.w0rqb0Dq6fMe7tZC1rfU_YRyjpo8Dy8ly2npuN5Vt4g");

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <div>
      <h1>Lista de Países</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
          
        ))}
      </ul>
    </div>
  );
}

export default App;

*/