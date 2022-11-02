import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { regUser } from '../conections/dbconnect';
import { Fragment, useState } from 'react';

export default function AddressForm(item) {
  const [register, setRegister] = useState(false)
  const [update, setUpdate] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    regUser(data.get('email'), 
            data.get('password'),
            data.get('firstName'),
            data.get('lastName'),
            item.plan
          )
    setUpdate(true)
    setTimeout(function(){
      setRegister(true)
    }, 3000);
    
  };
  return register?(
    <Fragment>
      <Typography variant="h5" gutterBottom>
        Gracias por su compra
      </Typography>
      <Typography variant="subtitle1">
        Se ha creado su cuenta con {item.plan} presione el boton para comenzar a trabajar
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button href='/' variant="contained"
          sx={{ mt: 3, ml: 1 }}>
          Empezar
        </Button>
      </Box>          
    </Fragment>
  ):(
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Registrar usuario
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="password2"
            label="Confirmar contraseña"
            type="password"
            id="password2"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              disabled={update}>
                {update?"Registrando...":"Registrar"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      </Box>
    </Fragment>
  );
}