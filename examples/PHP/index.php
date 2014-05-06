<?php
/************************************************
 *												*
 *		Project: formbuilder 					*
 *		Created by: Tjebbe Lievens				*
 *		https://github.com/TPWeb/formbuilder	*
 *												*
 *		PHP Example proxy 						*
 *												*
 ************************************************/

$couchdbServer = "http://127.0.0.1:5984/";
$dbname = "formbuilder"; //index

header('Access-Control-Allow-Origin: *'); //header


/* PROXY: CREATE DATABASE in Couchdb */
/* POST PARAMETERS
	dbname: name of database.
*/
if(isset($_GET['action']) && $_GET['action'] == "createdatabase") {
	$url = $couchdbServer . $_POST['dbname'];
	$content = "";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($content)));
	curl_setopt($ch, CURLOPT_VERBOSE, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); 
	curl_setopt($ch, CURLOPT_POSTFIELDS,$content);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	$chresult = curl_exec($ch);
	curl_close($ch);
	echo $chresult;
	exit;
}

/* PROXY: CREATE DOCUMENT in Couchdb */
/* GET PARAMETERS:
	id: GUID for document
	dbname: name of database
*/
/* POST PARAMETERS:
	Content for database.
*/
else if(isset($_GET['action']) && $_GET['action'] == "createdocument") {
	if(isset($_GET['id'])) {
		$id = $_GET['id'];
	} else {
		$id = uniqid('', true);
	} 
	$url = $couchdbServer . $_GET['dbname'] ."/" . $id;
	$content = json_encode($_POST);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($content)));
	curl_setopt($ch, CURLOPT_VERBOSE, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); 
	curl_setopt($ch, CURLOPT_POSTFIELDS,$content);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	$result = curl_exec($ch);
	curl_close($ch);
	echo $result;
	exit;
}

/* PROXY: GETDOCUMENT in Couchdb */
/* GET PARAMETERS
	ID: GUID of document
	*/
else if(isset($_GET['action']) && $_GET['action'] == "getdocument") {
	$id = $_GET['id'];
	$url = $couchdbServer . $_GET['dbname'] ."/" . $id;
	$ch = curl_init();
	curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => $url));
	$result = curl_exec($ch);
	curl_close($ch);
	echo $result;
	exit;
}

/* PROXY: GETDOCUMENT in Couchdb */
/* GET PARAMETERS
	dbname: name of database.
	*/
else if(isset($_GET['action']) && $_GET['action'] == "getalldocument") {
	$url = $couchdbServer . $_GET['dbname'] ."/_all_docs";
	$ch = curl_init();
	curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => $url));
	$result = curl_exec($ch);
	curl_close($ch);
	echo $result;
	exit;
}


/* INDEX: document overview */
else {
	$url =  $couchdbServer . $dbname . "/_all_docs";
	$ch = curl_init();
	curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => $url));
	$result = curl_exec($ch);
	curl_close($ch);

	$docs = json_decode($result, true);
	$i = 1;
	echo "<a href='builder.php'>New form</a><br>";
	echo "<table>";
	foreach($docs['rows'] as $row) {
		echo "<tr><td>Formulier " . $i++ . "</td><td><a href='builder.php?id=" . $row['id'] . "'>Build</a></td><td><a href='viewer.php?id=" . $row['id'] . "'>View</a></td></tr>";
	}
	echo "</table>";
}
?>