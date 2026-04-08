const express = require("express");
const materialsController = require("../controllers/materialsController");

// invocamos la funcion Router() para crear una plantilla de rutas que debe hacer mi app si sucede tal cosa. Esta plantilla es aparte de otras plantillas. Pensalo como un menu de restaurant y es una seccion especifica del menu (Menu de Postres)
const router = express.Router();

// escribes la parte final de las rutas pasandole
router.get("/getMaterials", materialsController.getmaterials);

router.post("/createMaterials", materialsController.creatematerials);

router.put("/updateMaterials/increment/:idMaterial", materialsController.updatematerials);

router.put("/updateMaterials/decrement/:idMaterial", materialsController.buymaterials);


module.exports = router;
