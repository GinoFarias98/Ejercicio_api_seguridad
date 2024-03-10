const express = require('express');
const productosRouter = require('./routes/productos');
const { auth } = require("express-oauth2-jwt-bearer");
const errorHaandler = require('./middleware/errorHandler');

const jwtCheck = auth({
    audience: 'http://localhost:3000/api/productos',
    issuerBaseURL: 'https://dev-48g2drh4nensuvyp.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

const app = express();
app.use(express.json());

//Validar para todas las rutas.
//app.use(jwtCheck);

//ruta base
app.get('/productos',(req,res)=>{
    res.send("API de productos");
});

//ruta productos
//validar algunas rutas, usamos jwtchek como parametro.
app.use("/api/productos",jwtCheck , productosRouter);

//usamos aca el middleware dado que necesitamos que la app corra
// y en caso de dar un error el MW lo agarre
app.use(errorHaandler);

const port = process.env.port || 3000;

app.listen(3000, ()=>{
    console.log(`API de productos corriendo en el puerto ${port}`);
});