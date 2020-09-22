<?php
$name=$_POST["InputName"];
$email=$_POST["InputEmail"];
$sub=$_POST['InputSubject'];
$msg = $_POST['InputMessage'];
// Multiple recipients
$to = 'chakrabortyd943@gmail.com'; // note the comma
$sender_subject = 'Thank you for contacting';
$my_subject = 'Some-one messaged you';
// Subject
$a="hi";
$mailhost="mail.globaltadka.in" ;
$mailusername= "diptanuchakraborty@globaltadka.in";
$mailpass="9774963614Dc";
// Message
require_once "./phpmailer/PHPMailerAutoload.php";
$mail=new PHPMailer; 
$mail->isSMTP();
$mail->Host="$mailhost";
$mail->Port=587;
$mail->SMTPAuth=true;
$mail->SMTPSecure='tls';
$mail->Username="$mailusername";
$mail->Password="$mailpass";
$mail->setFrom('diptanuchakraborty@globaltadka.in','Diptanu chakraborty');
$mail->addAddress("$to");
$mail->addReplyTo("$email");
$mail->isHTML(true);
$mail->Subject="$my_subject";
$mail->Body="hi";

echo "hi";

if(!($mail->Send() )){

	



	echo "not sent";

}else{
	


	require_once "./phpmailer/PHPMailerAutoload.php";
	$mail2=new PHPMailer; 
	$mail2->isSMTP();
	$mail2->Host="$mailhost";
	$mail2->Port=587;
	$mail2->SMTPAuth=true;
	$mail2->SMTPSecure='tls';
	$mail2->Username="$mailusername";
	$mail2->Password="$mailpass";
	$mail2->setFrom('diptanuchakraborty@globaltadka.in','Diptanu chakraborty');
	$mail2->addAddress("$email");
	$mail2->addReplyTo("$to");
	$mail2->isHTML(true);
	$mail2->Subject="$my_subject";
	$mail2->Body="hi2";


	if(!($mail2->Send())){
		echo "nnsent";
		
	}else{
		echo "sent";
		return 1; 
	}

	
	 

}


?>