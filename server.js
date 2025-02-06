const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Para manejar CORS

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    // Configura el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'isaiascante40@gmail.com', // Tu correo de Gmail
        }
    });

    // Configura las opciones del correo
    const mailOptions = {
        from: 'isaiascante40@gmail.com',
        to: 'isaiascante40@gmail.com', // Correo donde quieres recibir los mensajes
        subject: `Nuevo mensaje: ${asunto}`,
        text: `
            Nombre: ${nombre}
            Correo: ${email}
            Teléfono: ${telefono}
            Asunto: ${asunto}
            Mensaje: ${mensaje}
        `
    };

    // Envía el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al enviar el correo: ' + error.message });
        }
        res.status(200).json({ success: true, message: 'Mensaje enviado correctamente' });
    });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
