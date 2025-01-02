import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';

const Header = ({ toggleSidebar }) => {
  const { carrito } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ width: '100%', margin: 0, padding: 0, position: "fixed", height: "10vh", zIndex: 1 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tienda Online
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Productos
          </Button>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={carrito.reduce((total, item) => total + item.cantidad, 0)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
};
Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};


export default Header;