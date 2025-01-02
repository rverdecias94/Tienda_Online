import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import OnlineShop from '../TiendaOnline/OnlineShop';
import Header from './Header';

const MainContainer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <Header toggleSidebar={toggleSidebar} />


      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

        <Box
          sx={{
            width: { xs: '100%', md: '20%' },
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            transition: 'all 0.2s ease-in',
            background: { xs: 'linear-gradient(45deg, #a9c0d6, #488ec7)', md: '#ffffff' },
            height: '100%',
            position: sidebarOpen ? { xs: 'absolute', md: 'relative' } : 'fixed',
            zIndex: { xs: '10', md: '0' },
          }}
        >
          <Sidebar
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
          />
        </Box>


        <Box
          sx={{
            flexGrow: 1,
            width: sidebarOpen ? { xs: '100%', md: '80%' } : '80%',
            transform: sidebarOpen ? "translateX(0)" : "translateX(0%)",
            transition: 'width 0.2s ease-in-out',
            height: 'auto',
            overflow: 'auto',
            padding: '20px',
            paddingBottom: '20px',
            marginLeft: sidebarOpen ? { xs: '0', md: '0' } : 0,
            background: "#f5f5f5"
          }}
        >
          <OnlineShop categoriaSeleccionada={categoriaSeleccionada} />
        </Box>
      </Box>
    </Box>
  );
};

export default MainContainer;
