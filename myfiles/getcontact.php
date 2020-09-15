<?php
$name=$_POST["InputName"];
$email=$_POST["InputEmail"];
$sub=$_POST['InputSubject'];
$msg = $_POST['InputMessage'];
// Multiple recipients
$to = 'chakrabortyd943@gmail.com'; // note the comma

// Subject
$sender_subject = 'Thank you for contacting';
$my_subject = 'Some-one messeged you';
$a="hi";
// Message
require "mail/phpmailer/PHPMailerAutoload.php";
$mail=new PHPMailer;
$mail->isSMTP();
$mail->Host="mail.diptanuchakraborty.in";
$mail->Port=587;
$mail->SMTPAuth=true;
$mail->SMTPSecure='tls';
$mail->Username="administrator@diptanuchakraborty.in";
$mail->Password="9774963614Dc";
$mail->setFrom('administrator@diptanuchakraborty.in','Diptanu chakraborty');
$mail->addAddress("$to");
$mail->addReplyTo("$email");
$mail->isHTML(true);
$mail->Subject="$my_subject";
$mail->Body="hi";

if(!$mail->Send()){
	echo "not sent";

}else{
	  
	echo "sent";
	return 1;   

}


?>