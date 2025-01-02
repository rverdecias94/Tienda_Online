
// src/context/CartContext.jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

  };

  const quitarDelCarrito = (productoId, cantidad = 1) => {
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
      if (productoExistente.cantidad <= cantidad) {
        setCarrito(carrito.filter(item => item.id !== productoId));
      } else {
        setCarrito(carrito.map(item =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - cantidad }
            : item
        ));
      }
    }
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, limpiarCarrito, calcularTotal }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};