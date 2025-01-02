import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContainer from './components/common/MainContainer';
import ProductDetail from './components/TiendaOnline/ProductDetails';
import AdminPanel from './Admin/AdminPanel';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;

