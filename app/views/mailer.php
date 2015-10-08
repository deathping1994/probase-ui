<?
$json = file_get_contents('php://input');
$obj = json_decode($json);
$message = $obj->msg;
$to      = $obj->email_id;
$subject = $obj->subject;

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

$headers = 'From: poolclues.com' . "\r\n" .
    'Reply-To: invites@poolclues.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
echo json_encode({success:"mail sent!"});
?>