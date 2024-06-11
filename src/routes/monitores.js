const express = require("express");
const router = express.Router();

const monitoresController = require("../controllers/monitoresController"); 

// Crear rutas, estas son las pestañas que se verán en el navegador
router.get("/monitores", monitoresController.list);
router.get("/estudiantes", monitoresController.listEstudiante);
router.get("/edicionEstudiante_update", monitoresController.listEdicionEstudiante_update);

router.get("/updateEstudiante/:codigo_estudiante", monitoresController.listEdicionEstudiante_update);
router.get("/deleteEstudiante/:codigo_estudiante", monitoresController.listEdicionEstudiante_delete);

router.get("/updateMonitor/:codigo_monitor", monitoresController.listEdicionMonitor_update);
router.get("/deleteMonitor/:codigo_monitor", monitoresController.listEdicionMonitor_delete);

router.get("/search/:codigo_monitor", monitoresController.PerfilMonitor)
 
router.get("/signUp", monitoresController.signUp);
router.get("/login", monitoresController.login);
router.get("/perfil_monitor", monitoresController.perfil_monitor);
router.get("/admin", monitoresController.admin);
router.get("/crear_estudiante", monitoresController.crear_estudiante)
router.get("/crear_monitor", monitoresController.crear_monitor)
router.get("/monitor_funciones", monitoresController.monitor_funciones);

// Crear rutas para los formularios
router.post("/form-login", monitoresController.loginForm)
router.post("/form-signUp", monitoresController.loginSignUp);
router.post("/updateEstudiante", monitoresController.editarEstudiante);
router.post("/updateMonitor", monitoresController.editarMonitor);
router.post("/email", monitoresController.sendEmail);
router.post("/save_estudiante", monitoresController.save_estudiante);
router.post("/save_monitor", monitoresController.save_monitor);

module.exports = router;  