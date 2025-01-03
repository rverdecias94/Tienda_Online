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
    nombre: "Galleticas Comapan",
    precio: 160,
    imagen: "https://comapan.com.co/wp-content/uploads/2023/11/Galleticas-surtidas-No.-1-Coco-fresa-naranja-Paquete-x-6-1.webp",
    categoria: "Confituras",
    descripcion: "Galleticas surtidas de coco, fresa y naranja, ideales para acompañar tus desayunos o meriendas.",
    caracteristicas: [
      "Hechas con ingredientes naturales",
      "Sin conservantes artificiales",
    ],
    stock: 12
  },
  {
    id: 2,
    nombre: "Galleticas Tommy",
    precio: 140,
    imagen: "https://img1.elyerromenu.com/images/fagales-market/galleticas-redonditas/img.webp",
    categoria: "Confituras",
    descripcion: "Galleticas redonditas de mantequilla, perfectas para disfrutar en cualquier momento del día.",
    caracteristicas: [
      "Elaboradas con mantequilla de alta calidad",
      "Sabor suave y delicioso",
      "Formato de 12 unidades",
      "Peso neto 300g"
    ],
    stock: 5
  },
  {
    id: 3,
    nombre: "Galletas Maria",
    precio: 300,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKSCD-tOjP_WFsmQmIjIGI1BlyoA42J6zPAzRVTf0T6ZFBzYBmwt_avVeK3Pb-FAErmk&usqp=CAU",
    categoria: "Confituras",
    descripcion: "Galletas Maria de fabricación artesanal, ideales para acompañar tus bebidas calientes.",
    caracteristicas: [
      "Elaboradas con ingredientes naturales",
      "Sabor clásico y delicioso",
      "Formato de 24 unidades",
      "Peso neto 500g"
    ],
    stock: 15
  },
  {
    id: 4,
    nombre: "Nutela",
    precio: 2500,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEntXKRTS1dBx6fJGEIWnWItt2QsGisouuhQ&s",
    categoria: "Confituras",
    descripcion: "Crema de avellanas y cacao, perfecta para untar en pan, galletas o frutas.",
    caracteristicas: [
      "Elaborada con ingredientes de alta calidad",
      "Sin aceite de palma",
      "Formato de 750g",
      "Envase reciclable"
    ],
    stock: 8
  },
  {
    id: 5,
    nombre: "Jugo de Piña",
    precio: 250,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgOHlT9BKsN_rjtzU_lzOypz9CsR_dqP2Gw&s",
    categoria: "Bebidas",
    descripcion: "Jugo de piña natural, sin azúcares añadidos ni conservantes artificiales.",
    caracteristicas: [
      "Elaborado con piñas frescas",
      "Alto contenido de vitamina C",
      "Contenido neto 250ml",

    ],
    stock: 5
  },
  {
    id: 6,
    nombre: "Mayonesa",
    precio: 1200,
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
    precio: 3780,
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
    precio: 850,
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
    precio: 1000,
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
  },
  {
    id: 10,
    nombre: "Arroz Integral",
    precio: 550,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKNvaxCXI9JwvOY2CsSglhbT1-hLnujCZzQ&s",
    categoria: "Alimentos",
    descripcion: "Arroz integral de grano largo, rico en fibra y nutrientes.",
    caracteristicas: [
      "Grano largo y entero",
      "Formato de 1kg",
      "Ideal para dietas saludables",
    ],
    stock: 5
  },
  {
    id: 11,
    nombre: "Sidra",
    precio: 1100,
    imagen: "https://vinoteca.gt/cdn/shop/products/La_Gaita_Sidra_sin_Alcohol_750ml_600x.jpg?v=1650382333",
    categoria: "Bebidas",
    descripcion: "Sidra sin alcohol, perfecta para brindar en ocasiones especiales.",
    caracteristicas: [
      "Elaborada con manzanas frescas",
      "Sin alcohol ni azúcares añadidos",
      "Contenido neto 750ml",
    ],
    stock: 5
  },
  {
    id: 12,
    nombre: "Helado Gustó",
    precio: 800,
    imagen: "https://alawao.com/wp-content/uploads/2023/03/cuba-alimentos-restuarantes-viajes-envios-medicina-pote-helado-chocolate-1Lt-HG-942024.jpeg",
    categoria: "Lácteos",
    descripcion: "Helado de chocolate, perfecto para disfrutar",
    caracteristicas: [
      "Contenido neto 1L",
      "Sabor chocolate",
      "Envase reciclable",
    ],
    stock: 5
  },
  {
    id: 13,
    nombre: "Helado Cid",
    precio: 1000,
    imagen: "https://grangcuba.com/tiendacu/wp-content/uploads/2023/10/10_e2672c-362x503.png",
    categoria: "Lácteos",
    descripcion: "Helado de vainilla, perfecto para disfrutar",
    caracteristicas: [
      "Contenido neto 1L",
      "Sabor vainilla",
      "Envase reciclable",
    ],
    stock: 5
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
