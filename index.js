let express = require("express");
let cors = require("cors");
let path = require("path");
let db_obj = require("./config/db");
let db = db_obj.client;
let app = express();
const PORT = 3000;

// Settings 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/uploads'));

app.set('views', path.join(__dirname,'views', 'ejs')); 
app.set('view engine', 'ejs'); 

// Middlewares
app.use(cors("*"));



(async ()=>{
    try {
        // crate
        await db.schema.createTable("users", table =>{
            table.increments("id").primary();
            table.string("name");
            table.string("lastname");
            table.integer("age");
            table.string("email");
        });

        await db.schema.createTable("partido", table =>{
            table.increments("id").primary();
            table.string("partido");
            table.integer("user_id").unsigned().references('users.id');
        })
        // let res = await db.from('producto').whereIn('id',[5,6,7]).update({precio: 23});
        // console.log(res);
    } catch (error) {
        console.log("ERROR", error);
    }
})();


app.get("/",async (req,res,next)=>{
    try {
        let personas = await db.from('users');
        console.log(personas);
        res.render('index', {personas} );
    } catch (error) {
        console.log(error);
    }
});

app.post("/personas",async (req,res,next)=>{
    try {
        console.log(req.body);
        let data = {
            name:req.body.nombre,
            lastname:req.body.apellido,
            age:req.body.edad,
            email:req.body.email
        }
        let respuesta = await db.from('users').insert(data);
        await db.from('partido').insert({"partido":req.body.partido, "user_id":respuesta[0]});
        console.log(respuesta);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});


app.listen(PORT, ()=>{
    console.log(`Mi servidor escuchando desde http://localhost:${PORT}`);
})