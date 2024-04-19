import DateTimeHelper from './modules/datetime-helper.js'
import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from
"./modules/omdb-wrapper.js"
import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
import validacionesHelper from './modules/validaciones-helper.js';
const app = express();
const port = 3001;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => { // EndPoint "/"
    res.status(200).send('Ya estoy respondiendo')});

app.get('/saludar/:nombre', (req, res) => { 
    res.status(200).send(`Hola ${req.params.nombre}`);
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const {ano, mes, dia} = req.params;
    const fechaAString = `${ano}/ ${mes}/ ${dia}`
    const fecha = Date.parse(fechaAString);
    if(fecha){
        res.status(200).send('OK' );
    }
    else{
        res.status(400).send('Bad Request');
    }

    })
    app.get('/matematica/sumar', (req, res) => { 
        const num1 = validacionesHelper.getIntegerOrDefault(req.query.n1, 0);
        const num2 = validacionesHelper.getIntegerOrDefault(req.query.n2, 0);
        const resultado = sumar(num1, num2);
        res.status(200).send(`El resultado es: ${resultado}`);
    })

    app.get('/matematica/restar', (req, res) => { 
        const num1 = validacionesHelper.getIntegerOrDefault(req.query.n1, 0);
        const num2 = validacionesHelper.getIntegerOrDefault(req.query.n2, 0);
        const resultado = restar(num1, num2);
        res.status(200).send(`El resultado es: ${resultado}`);
    })

    app.get('/matematica/multiplicar', (req, res) => { 
        const num1 = validacionesHelper.getIntegerOrDefault(req.query.n1, 0);
        const num2 = validacionesHelper.getIntegerOrDefault(req.query.n2, 0);
        const resultado = multiplicar(num1, num2);
        res.status(200).send(`El resultado es: ${resultado}`);
    })

    app.get('/matematica/dividir', (req, res) => { 
        const num1 = validacionesHelper.getIntegerOrDefault(req.query.n1, 0);
        const num2 = validacionesHelper.getIntegerOrDefault(req.query.n2, 0);
        const resultado = dividir(num1, num2);
        if(num2 == 0){
            res.status(400).send('El divisor no puede ser cero');
        }
        else{
            
            res.status(200).send(`El resultado es: ${resultado}`);
        }
        
    })
    
    app.get('/omdb-wrapper/searchbypage', async (req, res) => { 
        const busqueda = validacionesHelper.getStringOrDefault(req.query.search,"Cars");
        const pagina = validacionesHelper.getStringOrDefault(req.query.p,"1");
        let resultado = await OMDBSearchByPage(busqueda, pagina);
        res.status(200).send(resultado)
    })

    app.get('/omdb-wrapper/searchcomplete', async (req, res) => { 
        const busqueda = validacionesHelper.getStringOrDefault(req.query.search,"Cars");
        const pagina = validacionesHelper.getIntegerOrDefault(req.query.p,"1");
        let resultado = await OMDBSearchComplete(busqueda, pagina);
        res.status(200).send(resultado)
    })

    app.get('/omdb-wrapper/getbyomdbid', async (req, res) => { 
        const imdbID = validacionesHelper.getIntegerOrDefault(req.query.imdbID, "tt1285016");
        let resultado = await OMDBGetByImdbID(imdbID);
        res.status(200).send(resultado)
    })
    
const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));   
app.get('/alumnos', (req, res) => { // EndPoint "/"
    res.status(200).send(alumnosArray)});

app.get('/alumnos/:dni', (req, res) => {
    const dni = validacionesHelper.getIntegerOrDefault(req.params.dni, 0)
    const found = alumnosArray.find(a => a.dni === dni);
    res.status(200).send(found);
})
app.post('/alumnos', (req, res) => {
    let objRecibido = validacionesHelper.req.body;
    alumnosArray.push(new Alumno(objRecibido));
    res.status(200).json(objRecibido);
})
app.delete("/alumnos", (req, res) => {
    const dni = validacionesHelper.getIntegerOrDefault(req.body.dni);

    console.log(dni)
    console.log(alumnosArray)
    const index = alumnosArray.findIndex(alumno => alumno.dni === dni);
    console.log(index)
    if (index !== -1) {
      alumnosArray.splice(index, 1);
      res.status(200).send("Alumno eliminado correctamente" );
    } else {
      res.status(404).send("Alumno no encontrado" );
    }
  });

  
let strFecha = '1972-07-13';
let fechaNacimiento = new Date(strFecha);
console.log('edadActual (Date)' , DateTimeHelper.getEdadActual(fechaNacimiento));
console.log('edadActualError (string)' , DateTimeHelper.getEdadActual(strFecha));

// Importa la clase DateTimeHelper si no está ya importada
// Endpoint GET "/fechas/isDate"
app.get("/fechas/isDate", (req, res) => {
  const fecha = req.query.fecha;
  if (DateTimeHelper.isDate(fecha)) {
    res.status(200).send("Fecha válida");
  } else {
    res.status(400).send("Fecha inválida");
  }
});

// Endpoint GET "/fechas/getEdadActual"
app.get("/fechas/getEdadActual", (req, res) => {
  const fechaNacimiento = req.query.fechaNacimiento;
  const edad = DateTimeHelper.getEdadActual(fechaNacimiento);
  if (edad !== -1) {
    res.status(200).json({ edad });
  } else {
    res.status(400).send("Fecha inválida");
  }
});

// Endpoint GET "/fechas/getDiasHastaMiCumple"
app.get("/fechas/getDiasHastaMiCumple", (req, res) => {
  const fechaNacimiento = req.query.fechaNacimiento;
  const dias = DateTimeHelper.getDiasHastaMiCumple(fechaNacimiento);
  if (dias !== -1) {
    res.status(200).json({ dias });
  } else {
    res.status(400).send("Fecha inválida");
  }
});

// Endpoint GET "/fechas/getDiaTexto"
app.get("/fechas/getDiaTexto", (req, res) => {
  const fecha = req.query.fecha;
  const abr = req.query.abr === 'true';
  const diaTexto = DateTimeHelper.getDiaTexto(fecha, abr);
  if (diaTexto) {
    res.status(200).json({ dia: diaTexto });
  } else {
    res.status(400).send("Fecha inválida");
  }
});

// Endpoint GET "/fechas/getMesTexto"
app.get("/fechas/getMesTexto", (req, res) => {
  const fecha = req.query.fecha;
  const abr = req.query.abr === 'true';
  const mesTexto = DateTimeHelper.getMesTexto(fecha, abr);
  if (mesTexto) {
    res.status(200).json({ mes: mesTexto });
  } else {
    res.status(400).send("Fecha inválida");
  }
});


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
