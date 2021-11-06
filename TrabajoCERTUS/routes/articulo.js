const express = require('express');
const router = express.router();

const { nanoid } = require("nanoid");

//obtener la lista de articulacion
router.get("/", (req, res)=> {
    const articulo = req.app.db.get("articulos").find({ id: req,params.id }).value();

    if(!articulo){
        res.sendStatus(404)
    }

        res.send(articulo);       
});