import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { get } from '../conections/dbconnect';
import { Fragment, useEffect, useState } from 'react';
import Checkout from './checkout';

function PricingContent() { 
  const [plans, setPlans] = useState([])
  const [check, setCheck] = useState(null)
  useEffect(()=>{
    async function plan(){
      const data = await get("plan")
      setPlans(data)
    }
    plan()
  },[])
  return check?<Checkout plan={check}/>:(
    <Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Adquiera uno de nuestros planes para poder crear y administrar sus proyectos
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {plans.map((plan) => (
            <Grid
              item
              key={plan.nombre}
              xs={12}
              sm={plan.nombre === 'Plan Premium' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={plan.nombre}
                  titleTypographyProps={{ align: 'center' }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {plan.precio} Bs
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mes
                    </Typography>
                  </Box>
                  <ul>
                    {plan.descripcion.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth onClick={ ()=>setCheck(plan)}
                  variant={plan.nombre==='Registrarse Gratis'?"outlined":"contained"}>
                    {plan.nombre==='Prueba Gratis'?"Comenzar":"Adquirir"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default function Pricing() {
  return <PricingContent/>;
}