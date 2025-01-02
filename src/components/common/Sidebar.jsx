
import PropTypes from 'prop-types';
import { Box, Stack, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Sidebar = ({ categoriaSeleccionada, setCategoriaSeleccionada }) => {
  return (
    <Box sx={{ width: { xs: '100%', md: '20vw' }, transition: 'width 0.3s', backgroundColor: '#f5f5f5', p: 2 }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          mb: 2,
          background: "cadetblue",
          padding: 1,
          borderRadius: 2,
          color: "white"
        }}
      >
        <Typography variant="h5" sx={{ fontSize: "inherit" }}>Búsqueda por Categorías</Typography>
      </Stack>
      <FormControl component="fieldset">
        <RadioGroup
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
          <FormControlLabel value="Electrónica" control={<Radio />} label="Electrónica" />
          <FormControlLabel value="Ropa" control={<Radio />} label="Ropa" />
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