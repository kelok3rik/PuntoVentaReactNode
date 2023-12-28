import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShowUsuarios from './components/ShowUsuarios.jsx';
import ShowProductos from './components/showProductos.jsx';
import ShowFacturacion from './components/showFacturacion.jsx';

import NavBar from './components/NavBar.jsx';
import showLobby from './components/showLobby.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <showLobby />} />

        <Route path="/showUsuarios" element={
          <ShowUsuarios />} />

        <Route path="/showProductos" element={
          <ShowProductos />} />

        <Route path="/showFacturacion" element={
          <ShowFacturacion />} />
        

        {/* <Route path="/showPrueba" element={
         <ShowUsuarios2Save />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

