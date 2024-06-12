const express = require("express");
const router = express.Router();

const monitoresController = require("../controllers/monitoresController"); 

// Crear rutas, estas son las pestañas que se verán en el navegador
router.get("/monitores", monitoresController.list); // Listar Monitores
router.get("/estudiantes", monitoresController.listEstudiante); // Listar Estudiantes
router.get("/edicionEstudiante_update", monitoresController.listEdicionEstudiante_update); // Listar Estudiante en form de edicion

router.get("/updateEstudiante/:codigo_estudiante", monitoresController.listEdicionEstudiante_update); // Listar estudiante en Form para Editar Estudiante
router.get("/deleteEstudiante/:codigo_estudiante", monitoresController.listEdicionEstudiante_delete); // Listar estudiante en Form para Eliminar Estudiantes
router.get("/search/:codigo_monitor", monitoresController.PerfilMonitor) // Listar los datos del MOnitor en su Perfil

router.get("/updateMonitor/:codigo_monitor", monitoresController.listEdicionMonitor_update); // Listar monitor en Form para Editar monitor
router.get("/deleteMonitor/:codigo_monitor", monitoresController.listEdicionMonitor_delete); // Listar monitor en Form para Eliminar monitor

 
router.get("/login", monitoresController.login); // Renderizar la vista de login
router.get("/signUp", monitoresController.signUp); // Renderizar la vista de registro
router.get("/perfil_monitor", monitoresController.perfil_monitor); // Renderizar la vista de perfil del monitor
router.get("/monitor_funciones", monitoresController.monitor_funciones); // Renderizar la vista de las funciones del monitor
router.get("/crear_estudiante", monitoresController.crear_estudiante) // Renderizar la vista donde el admin crea estudiantes
router.get("/crear_monitor", monitoresController.crear_monitor) // Renderizar la vista donde el admin crea monitores

router.get("/admin", monitoresController.admin); // Listar Datos de Monitores y Estudiantes en las tablas

// Crear rutas para los formularios
router.post("/form-login", monitoresController.loginForm) // Form Login
router.post("/form-signUp", monitoresController.loginSignUp); // Form SignUp
router.post("/updateEstudiante", monitoresController.editarEstudiante); // Editar estudiante en BD
router.post("/updateMonitor", monitoresController.editarMonitor); // Editar monitor en BD
router.post("/email", monitoresController.sendEmail); // Enviar Correo

router.post("/save_estudiante", monitoresController.save_estudiante); // Guardar los datos del estudiante ingresados por el admin
router.post("/save_monitor", monitoresController.save_monitor); // Guardar los datos del monitor ingresados por el admin

module.exports = router;  