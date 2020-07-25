<?php
$recepient = "sasha.yakovina@gmail.com";
$recepient2 = isset($_POST["email"]) ? clearIncomingParameter($_POST["email"]) : null;

$sitename = "LISporst.com.ua";

$firstname = isset($_POST["name"]) ? clearIncomingParameter($_POST["name"]) : null;
$email = isset($_POST["email"]) ? clearIncomingParameter($_POST["email"]) : null;
$phone = isset($_POST["mobile"]) ? clearIncomingParameter($_POST["mobile"]) : null;
$fullprice = isset($_POST["foolamount"]) ? clearIncomingParameter($_POST["foolamount"]) : null;
$fullamount = isset($_POST["totalprice"]) ? clearIncomingParameter($_POST["totalprice"]) : null;
$arrGoods = array();

$aDoor = $_POST['other'];
$comma_separated = implode(",", $aDoor);
var_dump($aDoor);


foreach ($aDoor as &$value) {

}
?>
