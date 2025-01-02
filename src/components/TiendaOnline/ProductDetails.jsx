/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Container,
  Stack,
  ButtonGroup
} from '@mui/material';
import { useLocation } from 'react-router-dom';


import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartContext } from '../../context/CartContext';
import Header from '../common/Header';

const ProductDetail = () => {
  const { carrito, agregarAlCarrito, quitarDelCarrito } = useContext(CartContext);
  const location = useLocation();
  const { producto } = location.state || {};

  const [selectedImage, setSelectedImage] = useState(producto.imagen);

  useEffect(() => {
    if (producto !== undefined && producto !== null && producto.image)
      setSelectedImage(producto.imagen)
  }, [producto])

  const itemEnCarrito = carrito.find(item => item.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

  // Simulate reviews (you'd typically fetch real data)
  const reviews = {
    average: 4.5,
    count: 1234
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '10vh' }}>
        <Container maxWidth="lg" sx={{ marginLeft: '20vw', width: '80vw', position: 'relative' }}>
          <Grid container spacing={4}>
            {/* Image Gallery Section */}
            <Grid item xs={12} md={6} >

              <Stack direction="column" spacing={2}>
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    overflow: 'hidden',
                    height: { xs: 300, md: 500 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={selectedImage}
                    alt={producto.nombre}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>

                {/* Thumbnail images (if multiple images exist) */}
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    overflowX: 'auto',
                    pb: 2,
                    '&::-webkit-scrollbar': { display: 'none' }
                  }}
                >
                  {[producto.imagen].map((img, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 80,
                        height: 80,
                        border: selectedImage === img ? '2px solid blue' : '1px solid #e0e0e0',
                        borderRadius: 2,
                        cursor: 'pointer',
                        overflow: 'hidden'
                      }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Product Details Section */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {producto.nombre}
                </Typography>

                {/* Rating */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 1 }}
                >
                  <Rating
                    value={reviews.average}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    {reviews.count} vistas
                  </Typography>
                </Stack>

                {/* Price */}
                <Typography variant="h5" color="primary" gutterBottom>
                  ${producto.precio.toFixed(2)}
                </Typography>

                {/* Description */}
                <Typography variant="body1" color="text.secondary" paragraph>
                  {producto.descripcion}
                </Typography>

                {/* Features */}
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Características principales:
                  </Typography>
                  <ul style={{
                    paddingLeft: '20px',
                    margin: 0,
                    listStyleType: 'disc'
                  }}>
                    {producto.caracteristicas.map((feature, index) => (
                      <li key={index}>
                        <Typography variant="body2">{feature}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>

                <Typography
                  variant="body2"
                  color={producto.stock > 5 ? 'success.main' : 'error.main'}
                >
                  {producto.stock > 0
                    ? `${producto.stock} items left - Order soon!`
                    : 'Currently out of stock'}
                </Typography>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  {cantidadEnCarrito === 0 ? (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => agregarAlCarrito(producto)}
                      sx={{ mt: 2, backgroundColor: "#19d2bc", fontSize: 12 }}
                    >
                      Añadir al Carrito
                    </Button>
                  ) : (
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      sx={{ mt: 2 }}
                    >
                      <Button
                        color="primary"
                        onClick={() => quitarDelCarrito(producto.id)}
                      >
                        <RemoveIcon />
                      </Button>
                      <Button disabled>{cantidadEnCarrito}</Button>
                      <Button
                        color="primary"
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  )}
                </div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductDetail;