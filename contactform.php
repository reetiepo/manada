<?php
$proj_name = $_POST['proj-name'];
$email    = $_POST['email'];
$message  = $_POST['message'];

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= "From: The test site" . "\r\n";

if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
    echo "E-mail address not valid";
}

if (mail("reetiepo@gmail.com", "Projeto", "Mensagem", $headers)) 
    echo "OK";
else
    echo $proj_name." - ".$email." - ".$message." - ".$headers;
?>