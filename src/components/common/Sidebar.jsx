
import PropTypes from 'prop-types';
import { Box, Stack, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Sidebar = ({ categoriaSeleccionada, setCategoriaSeleccionada }) => {
  return (
    <Box sx={{ width: { xs: 'auto', md: 'auto' }, p: 5, }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          mb: 2,
          background: { xs: "#f5f5f5", md: 'linear-gradient(45deg, #1976d2c7, #19d2bc)' },
          padding: 1,
          borderRadius: 2,
          color: { xs: "black", md: "white" },
          width: "auto"
        }}
      >
        <Typography variant="h5" sx={{ fontSize: "inherit" }}>Búsqueda por Categorías</Typography>
      </Stack>
      <FormControl component="fieldset" sx={{ color: { xs: "white", md: "black" } }}>
        <RadioGroup
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
          <FormControlLabel value="Confituras" control={<Radio />} label="Confituras" />
          <FormControlLabel value="Bebidas" control={<Radio />} label="Bebidas" />
          <FormControlLabel value="Lácteos" control={<Radio />} label="Lácteos" />
          <FormControlLabel value="Alimentos" control={<Radio />} label="Alimentos" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

Sidebar.propTypes = {
  categoriaSeleccionada: PropTypes.string.isRequired,
  setCategoriaSeleccionada: PropTypes.func.isRequired,
};

export default Sidebar;