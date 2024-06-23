<?php
// Require PHPMailer classes
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Check if form data is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $recipient_email = htmlspecialchars(trim($_POST['email']));
    $name = htmlspecialchars(trim($_POST['name'])); // Optional: You can use sender's name if needed

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true); // Set true for enabling exceptions

    // SMTP configuration 
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'diatech.ecotechsolutions@gmail.com'; // Your Gmail email address
    $mail->Password = 'pkwarzdgdsbvfcka'; // Your Gmail password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Sender and recipient
    $mail->setFrom('diatech.ecotechsolutions@gmail.com', 'Ansh Gupta'); // Sender's email and name
    $mail->addAddress($recipient_email, $name); // Recipient's email and name

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Confirmation';
    $mail->Body = "Dear $name,<br><br>

    Thank you for contacting Eco-Tech Solutions through our Contact Us form. This email confirms that we have received your message and appreciate your interest.<br><br>

    Our team is currently reviewing your inquiry, and we will respond to you as soon as possible. If your matter is urgent, please feel free to contact us directly at 055 578 8524.<br><br>

    We appreciate your patience and look forward to assisting you.<br><br>

    Best regards,<br><br>

    Armaghan Siddiqui<br>
    Co-Founder, Eco-Tech Solutions<br>
    Eco-Tech Solutions<br>
    Email: diatech.ecotechsolutions@gmail.com<br>
    Phone: 055 578 8524";

    $mail->AltBody = 'Test Alt Body';

    // Attempt to send the email
    try {
        $mail->send();
        // Redirect to success page after successful sending
        header('Location: success.html');
        exit; // Ensure script stops execution after redirection
    } catch (Exception $e) {
        // Handle exceptions
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
} else {
    // Handle case where form was not submitted properly
    echo 'Form submission error.';
}
?>
