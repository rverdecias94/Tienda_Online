import React, { useContext } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { CartContext } from '../../context/CartContext';

import PropTypes from 'prop-types';

const CartDrawer = ({ open, onClose }) => {
  const { carrito, agregarAlCarrito, quitarDelCarrito, calcularTotal } = useContext(CartContext);

  const handleWhatsAppClick = () => {
    const mensaje = carrito.reduce((msg, item) => {
      return msg + `\n${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
    }, 'Hola! Me gustaría realizar el siguiente pedido:');

    const total = `\n\nTotal: $${calcularTotal()}`;
    const mensajeCompleto = encodeURIComponent(mensaje + total);

    window.open(`https://wa.me/56408532?text=${mensajeCompleto}`, '_blank');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 350, p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5">Tu Carrito</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {carrito.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ my: 4 }}>
            Tu carrito está vacío
          </Typography>
        ) : (
          <>
            <List>
              {carrito.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => quitarDelCarrito(item.id, item.cantidad)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={item.nombre}
                      secondary={`$${(item.precio * item.cantidad).toFixed(2)}`}
                    />
                    <ButtonGroup size="small" sx={{ mx: 2 }}>
                      <Button
                        onClick={() => quitarDelCarrito(item.id)}
                      >
                        <RemoveIcon />
                      </Button>
                      <Button disabled>{item.cantidad}</Button>
                      <Button
                        onClick={() => agregarAlCarrito(item)}
                      >
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 2, p: 2 }}>
              <Typography variant="h6" align="right" gutterBottom>
                Total: ${calcularTotal()}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                startIcon={<WhatsAppIcon />}
                onClick={handleWhatsAppClick}
                sx={{ mt: 2, backgroundColor: "#25D366" }}
              >
                Realizar Pedido por WhatsApp
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );

}

CartDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default CartDrawer;