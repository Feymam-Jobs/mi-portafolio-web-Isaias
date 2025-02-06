<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'isaiascanate40@gmail.com';  // Tu correo
        $mail->Password = 'tu-app-password';   // Usa una "App Password" de Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($_POST["correo"], $_POST["nombre"]);
        $mail->addAddress('tuemail@gmail.com'); 

        $mail->Subject = "Nuevo mensaje de contacto: " . $_POST["tema"];
        $mail->Body = "Nombre: " . $_POST["nombre"] . "\nTeléfono: " . $_POST["telefono"] . "\nCorreo: " . $_POST["correo"] . "\n\nMensaje:\n" . $_POST["mensaje"];

        $mail->send();
        echo "✅ ¡Mensaje enviado con éxito!";
    } catch (Exception $e) {
        echo "❌ Error al enviar el mensaje: {$mail->ErrorInfo}";
    }
}
?>

