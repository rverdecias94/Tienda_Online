import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';

const Header = ({ toggleSidebar, page = "Home" }) => {
  const { carrito } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ width: '100%', margin: 0, padding: 0, zIndex: 1 }}>
        <Toolbar>
          {page === "Home" &&
            <IconButton color="inherit" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tienda Online
          </Typography>
          <Button color='inherit' sx={{ border: "1px solid white" }} onClick={() => navigate('/')}>
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
  page: PropTypes.string.isRequired,
};


export default Header;