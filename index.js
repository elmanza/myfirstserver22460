let express = require("express");
let moment = require("moment");
let app = express()
const PORT = 8080;
let totalVisitas = 0;

app.get("/",(req, res, next)=>{
    totalVisitas++;
    res.send("<p style='color:blue;'>Marisol trabaja como <b><i>Consultora de sistemas</i></b></p>");
});

app.get("/visitas",(req, res, next)=>{
    res.send(`La cantidad de visitas es ${totalVisitas}`);
});

app.get("/fyh",(req, res, next)=>{
    res.json({fyh:moment().format("DD/MM/YYYY HH:MM:SS")});
});


app.listen(PORT, ()=>{
    console.log(`Mi servidor escuchando desde http://localhost:${PORT}`);
})