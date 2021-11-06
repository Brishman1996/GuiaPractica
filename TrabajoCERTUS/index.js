const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const articulosRouter = require("./routes/articulo");

const PORT = process.env.PORT || 10801;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ articulos: [] }).write();


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
const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.server, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/articulos", articulosRouter);

app.listen(PORT, () => console.log(`El servidor esta corriendo en el puerto ${PORT}`));