const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');  // Importar cors
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Ruta para manejar el registro
app.post('/register', (req, res) => {
    const { email, firstName } = req.body;

    // Configurar el contenido del correo
    const mailOptions = {
        from: 'IFTS.TECH@gmail.com',
        to: email,
        subject: 'Registro Exitoso',
        html: `<h1>Bienvenido, ${firstName}</h1>
               <p>Se ha registrado su usuario satisfactoriamente. Por favor, ingrese aquí: <a href="https://t.me/Iftstech16_bot">https://t.me/Iftstech16_bot</a> para agendar turnos.</p>`,
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo');
        }
        res.send('Correo de confirmación enviado');
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
