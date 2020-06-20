<?php
$recepient = "lisports.com.ua@gmail.com";
$recepient2 = isset($_POST["email"]) ? clearIncomingParameter($_POST["email"]) : null;

$sitename = "LISporst.com.ua";

$firstname = isset($_POST["name"]) ? clearIncomingParameter($_POST["name"]) : null;
$phone = isset($_POST["mobile"]) ? clearIncomingParameter($_POST["mobile"]) : null;

$message = "Name: $firstname " . PHP_EOL . "Phone: $phone ";

$pagetitle = "LISports.com.ua запит відповіді на питання";
$pagetitle2 = "\"$sitename\"";

$headerString = "Content-type: text/plain; charset=\"utf-8\"" . PHP_EOL . "From: LISports.com.ua";

$sendResult = mail($recepient, $pagetitle, $message, $headerString);
//logTemp($recepient, $pagetitle, $message, $headerString, $sendResult);

function clearIncomingParameter($stringParameter)
{
    if (empty($stringParameter) || !is_string($stringParameter)) {
        return '';
    }

    return htmlspecialchars(strip_tags(trim($stringParameter)));
}

function logTemp($recepient, $pagetitle, $message, $headerString, $sendResult)
{
    $fileName = __DIR__ . '/run_t_i_m_e/' . 'logt.log';

    $sendResultString = $sendResult !== true ? 'ne true' : 'true';

    $messageToLog = $recepient . PHP_EOL . $pagetitle . PHP_EOL . $message . PHP_EOL . $headerString . PHP_EOL. $sendResultString . PHP_EOL . PHP_EOL;

    file_put_contents($fileName, $messageToLog, FILE_APPEND);
}
$products = [];

$products[0]["id"] = ""; // id товара
$products[0]["name"] = ""; // название товара
$products[0]["costPerItem"] = ""; // цена
$products[0]["amount"] = ""; // количество
$products[0]["description"] = ""; // описание товарной позиции в заявке
$products[0]["discount"] = ""; // скидка, задается в % или в абсолютной величине
$products[0]["sku"] = ""; // артикул (SKU) товара

$_salesdrive_values = [
    "form" => "SHNvpLHpS2xkkvmNOzq7TUwvYkMzJVKx-K8fvfGkQyo5rIzvqDFR577KpcQcYfRFmX4wY3Fqbi6WHKsL",
    "products"=>$products, //Товары/Услуги
    "comment"=>"", // Комментарий
    "fName"=>"$firstname", // Имя
    "lName"=>"", // Фамилия
    "mName"=>"", // Отчество
    "phone"=>"$phone", // Телефон
    "email"=>"$email", // Email
    "con_comment"=>"", // Комментарий
    "shipping_address"=>"", // Адрес доставки
    "shipping_method"=>"", // Способ доставки
    "payment_method"=>"", // Способ оплаты
    "novaposhta"=> [
        "city" => "", // Название города на русском или украинском языке, или Ref города в системе Новой почты
        "ServiceType" => "", // возможные значения: DoorsDoors, DoorsWarehouse, WarehouseWarehouse, WarehouseDoors
        "WarehouseNumber" => "", // отделение Новой Почты в одном из форматов: номер, описание, Ref
        "Street" => "", // название и тип улицы, или Ref улицы в системе Новой почты
        "BuildingNumber" => "", // Номер дома
        "Flat" => "", // Номер квартиры
        "backwardDeliveryCargoType" => "" // возможные значения: None - без наложенного платежа, Money - с наложенным платежом
    ],
    "prodex24source_full"=>isset($_COOKIE["prodex24source_full"])?$_COOKIE["prodex24source_full"]:"",
    "prodex24source"=>isset($_COOKIE["prodex24source"])?$_COOKIE["prodex24source"]:"",
    "prodex24medium"=>isset($_COOKIE["prodex24medium"])?$_COOKIE["prodex24medium"]:"",
    "prodex24campaign"=>isset($_COOKIE["prodex24campaign"])?$_COOKIE["prodex24campaign"]:"",
    "prodex24content"=>isset($_COOKIE["prodex24content"])?$_COOKIE["prodex24content"]:"",
    "prodex24term"=>isset($_COOKIE["prodex24term"])?$_COOKIE["prodex24term"]:"",
    "prodex24page"=>isset($_SERVER["HTTP_REFERER"])?$_SERVER["HTTP_REFERER"]:"",
];

$_salesdrive_url = "https://lispirts.salesdrive.me/handler/";
$_salesdrive_ch = curl_init();
curl_setopt($_salesdrive_ch, CURLOPT_URL, $_salesdrive_url);
curl_setopt($_salesdrive_ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($_salesdrive_ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($_salesdrive_ch, CURLOPT_SAFE_UPLOAD, true);
curl_setopt($_salesdrive_ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($_salesdrive_ch, CURLOPT_POST, 1);
curl_setopt($_salesdrive_ch, CURLOPT_POSTFIELDS, json_encode($_salesdrive_values));
curl_setopt($_salesdrive_ch, CURLOPT_TIMEOUT, 10);

$_salesdrive_res = curl_exec($_salesdrive_ch);
$_salesdriveerrno = curl_errno($_salesdrive_ch);
$_salesdrive_error = 0;
if ($_salesdriveerrno or $_salesdrive_res != "") {
    $_salesdrive_error = 1;
}