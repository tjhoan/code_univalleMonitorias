// Importar el módulo 'nodemailer'
const nodemailer = require("nodemailer");

// Crear un objeto transporter con la configuración para enviar correos a través de Gmail
const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com", // Servidor SMTP de Gmail
 port: 587, // Puerto utilizado por Gmail para envío de correos
 secure: false, // Conexión no segura (TLS)
 auth: {
   user: process.env.EMAIL_USER, // Obtener el usuario desde las variables de entorno
   pass: process.env.EMAIL_PASS, // Obtener la contraseña desde las variables de entorno
 }
});

// Objeto con las opciones para el correo electrónico
let mailOptions = {
 from: process.env.EMAIL_USER, // Remitente (obtenido desde las variables de entorno)
 to: "toro.jhoan@correounivalle.edu.co", // Destinatario
 subject: "Hello ✔", // Asunto del correo
 body: "Hello world" // Cuerpo del correo
};

// Exportar los objetos transporter y mailOptions como propiedades de un objeto
module.exports = {
 transporter,
 mailOptions
};