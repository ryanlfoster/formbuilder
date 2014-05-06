<?php
/************************************************
 *												*
 *		Project: formbuilder 					*
 *		Created by: Tjebbe Lievens				*
 *		https://github.com/TPWeb/formbuilder	*
 *												*
 *		PHP Viewer 								*
 *												*
 ************************************************/

if(isset($_GET['id'])) {
$url = "http://127.0.0.1:5984/formbuilder/" . $_GET['id'];
$curl = curl_init();
curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => $url));
$resp = curl_exec($curl);
curl_close($curl);
$d = json_decode($resp, true);

echo $d['html'];
}
?>