import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ButtonGroup,
  Box,
  Modal,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import CloseIcon from '@mui/icons-material/Close';

// Datos de productos con imágenes de marcador de posición
const productos = [
  {
    id: 1,
    nombre: "Smartphone Pro X",
    precio: 599.99,
    imagen: "https://i.pinimg.com/736x/93/10/fb/9310fb24bc02f5285af319e6219215fa.jpg",
    categoria: "Electrónica",
    descripcion: "Potente smartphone con pantalla de alta resolución, cámara de última generación y batería de larga duración.",
    caracteristicas: [
      "Pantalla OLED 6.5 pulgadas",
      "Cámara principal de 108MP"
    ],
    stock: 12
  },
  {
    id: 2,
    nombre: "Laptop Ultradelgada",
    precio: 1299.99,
    imagen: "https://i.pinimg.com/736x/41/3e/57/413e57a588e047bce4c4519f54288123.jpg",
    categoria: "Electrónica",
    descripcion: "Laptop ultraligera con excelente rendimiento y diseño compacto ideal para profesionales.",
    caracteristicas: [
      "Pantalla Full HD de 15 pulgadas",
      "Procesador Intel i7 de última generación",
      "16GB RAM",
      "SSD de 512GB"
    ],
    stock: 5
  },
  {
    id: 3,
    nombre: "Auriculares Inalámbricos",
    precio: 199.99,
    imagen: "https://i.pinimg.com/736x/51/3b/8f/513b8fab7c1bbb64b7a57a4f19bb82f0.jpg",
    categoria: "Electrónica",
    descripcion: "Auriculares inalámbricos con cancelación de ruido y gran calidad de sonido.",
    caracteristicas: [
      "Bluetooth 5.0",
      "Cancelación activa de ruido",
      "Autonomía de hasta 20 horas",
      "Resistente al agua IPX5"
    ],
    stock: 15
  },
  {
    id: 4,
    nombre: "Zapatillas de hombre",
    precio: 599.99,
    imagen: "https://i.pinimg.com/736x/17/0f/70/170f70ef2273b7fd2e2a0de43a337546.jpg",
    categoria: "Ropa",
    descripcion: "Zapatillas deportivas cómodas y modernas para el uso diario o actividades deportivas.",
    caracteristicas: [
      "Material transpirable",
      "Suela antideslizante",
      "Diseño ergonómico",
      "Disponible en varios colores"
    ],
    stock: 8
  },
  {
    id: 5,
    nombre: "Zapatillas",
    precio: 1299.99,
    imagen: "https://i.pinimg.com/736x/98/4d/57/984d572835b623a9d2c8e1679a196627.jpg",
    categoria: "Ropa",
    descripcion: "Zapatillas premium con diseño innovador para un estilo único.",
    caracteristicas: [
      "Material de alta calidad",
      "Suela resistente al desgaste",
      "Amortiguación avanzada",
      "Estilo moderno"
    ],
    stock: 5
  },
  {
    id: 6,
    nombre: "Mayonesa",
    precio: 199.99,
    imagen: "https://i.pinimg.com/736x/86/08/f2/8608f2f30d0d81533fa83fe5403ef5d0.jpg",
    categoria: "Alimentos",
    descripcion: "Mayonesa cremosa y deliciosa ideal para acompañar tus comidas.",
    caracteristicas: [
      "Hecha con huevos frescos",
      "Sin conservantes artificiales",
      "Envase reciclable",
      "Formato de 500g"
    ],
    stock: 20
  },
  {
    id: 7,
    nombre: "Carne deshuesada",
    precio: 599.99,
    imagen: "https://i.pinimg.com/736x/9a/a4/84/9aa4842edd526e934aa71af5690e49f8.jpg",
    categoria: "Alimentos",
    descripcion: "Carne de alta calidad, lista para cocinar.",
    caracteristicas: [
      "Corte premium",
      "Libre de antibióticos",
      "Envasada al vacío",
      "Peso aproximado 1kg"
    ],
    stock: 12
  },
  {
    id: 8,
    nombre: "Aceite",
    precio: 1299.99,
    imagen: "https://i.pinimg.com/736x/6f/5b/8d/6f5b8dd08dff0f0aab4eaafc1fd96bec.jpg",
    categoria: "Alimentos",
    descripcion: "Aceite vegetal de alta calidad ideal para cocinar y freír.",
    caracteristicas: [
      "Libre de grasas trans",
      "Formato de 1 litro",
      "Sabor neutro",
      "Apto para veganos"
    ],
    stock: 0
  },
  {
    id: 9,
    nombre: "Harina de Trigo",
    precio: 199.99,
    imagen: "https://i.pinimg.com/736x/9f/61/62/9f61626b81643949a344e690346e961d.jpg",
    categoria: "Alimentos",
    descripcion: "Harina de trigo refinada ideal para panes, pasteles y más.",
    caracteristicas: [
      "Alto contenido de gluten",
      "Formato de 1kg",
      "100% natural",
      "Envasada en papel reciclable"
    ],
    stock: 25
  }
];

const TiendaOnline = ({ categoriaSeleccionada }) => {
  const { carrito, agregarAlCarrito, quitarDelCarrito } = useContext(CartContext);
  const [imagenGrandeAbierta, setImagenGrandeAbierta] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  const navigate = useNavigate();

  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaSeleccionada);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, position: 'relative', padding: '20px 0', }}>
        <Grid container spacing={3}>
          {productosFiltrados.map((producto, index) => {
            const itemEnCarrito = carrito.find(item => item.id === producto.id);
            const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

            return (
              <Grid item xs={12} sm={6} md={4} key={producto.id}>
                <Card
                  key={index}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={producto.imagen}
                    alt={producto.nombre}
                    sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5', cursor: 'pointer' }}
                    onClick={() => {
                      setImagenSeleccionada(producto.imagen);
                      setImagenGrandeAbierta(true);
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', position: 'relative' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {producto.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={producto.stock > 5 ? 'success.main' : 'error.main'}
                    >
                      {producto.stock > 0
                        ? `${producto.stock} items left - Order soon!`
                        : 'Currently out of stock'}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      ${producto.precio.toFixed(2)}
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
                      <Link
                        to={`/detalle/${producto.id}`}
                        state={{ producto }}
                        className="btn green-dark btn-circle-2x btn-outline btn-icon-only"
                        data-tip
                        data-for={"edit" + index}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate(`/detalle/${producto.id}`)}
                          sx={{ mt: 2, fontSize: 12 }}
                        >
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Modal
          open={imagenGrandeAbierta}
          onClose={() => setImagenGrandeAbierta(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '100%', maxHeight: '100%', }}
        >
          <Box sx={{ maxWidth: '90vw', maxHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: "relative", padding: "2%" }}>
            <IconButton onClick={() => setImagenGrandeAbierta(false)} sx={{ position: "absolute", right: 0, top: 0, color: "white" }}>
              <CloseIcon />
            </IconButton>
            <img src={imagenSeleccionada} alt="Producto" style={{ maxWidth: 400, maxHeight: 400, }} />
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};
TiendaOnline.propTypes = {
  categoriaSeleccionada: PropTypes.string.isRequired,
};

export default TiendaOnline;
