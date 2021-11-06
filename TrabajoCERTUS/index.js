const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const articulosRouter = require("./routes/articulo");

const PORT = process.env.PORT || 10801;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ articulos: [] }).write();

const app = express();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Librerias APIs - CERTUS",
            version: "1.0.0",
            description: "Demo de Librerias de Ventas API",
        },
        servers: [
            {
                url: "http://localhost:" + PORT,
            },
        ],
    },
    apis: ["./routers/*.js"],
};

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("articulos", articulosRouter);

app.listen(PORT, () => console.log(`El servidor esta corriendo en el puerto ${PORT}`));


