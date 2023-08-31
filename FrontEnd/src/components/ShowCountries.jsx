import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';

const supabase = createClient("https://vncppionwaebafkldsxm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY3BwaW9ud2FlYmFma2xkc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyNTIwODEsImV4cCI6MjAwODgyODA4MX0.w0rqb0Dq6fMe7tZC1rfU_YRyjpo8Dy8ly2npuN5Vt4g");

const showCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-4'>
            <div className='d-grid mx-auto'>
              <button className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalCountries'>
                <i className='fa-solid fa-circle-plus'></i> Agregar País
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-fade'>

      </div>
      <h1>Lista de Países a</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>

        ))}
      </ul>
    </div>
  );
}

export default showCountries;