import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import OnlineShop from '../TiendaOnline/OnlineShop';
import Header from './Header';

const MainContainer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header toggleSidebar={toggleSidebar} />
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '10vh' }}>
        {sidebarOpen && (
          <Box sx={{ width: { xs: '100%', md: '20vw' }, transition: 'width 0.3s' }}>
            <Sidebar categoriaSeleccionada={categoriaSeleccionada} setCategoriaSeleccionada={setCategoriaSeleccionada} />
          </Box>
        )}
        <Box sx={{ flexGrow: 1, width: sidebarOpen ? { xs: '100%', md: '80vw' } : '100%', transition: 'width 0.3s' }}>
          <OnlineShop categoriaSeleccionada={categoriaSeleccionada} />
        </Box>
      </Box>
    </Box>
  );
};

export default MainContainer;
