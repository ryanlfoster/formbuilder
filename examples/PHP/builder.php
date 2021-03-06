<?php

/************************************************
 *												*
 *		Project: formbuilder 					*
 *		Created by: Tjebbe Lievens				*
 *		https://github.com/TPWeb/formbuilder	*
 *												*
 *		PHP Builder 							*
 *												*
 ************************************************/


$couchdb_server = "http://127.0.0.1:5984/";
$couchdb_formbuilderdb = "formbuilder";
$couchdb_formviewerdb = "formdata";
$couchdb_proxy = "http://localhost:8080/formb/";
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Tjebbe's FormBuilder</title>

	<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">
	<script src="https://code.jquery.com/jquery-1.11.0.js"></script>
	<script src="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<script src="https://rawgit.com/douglascrockford/JSON-js/master/json2.js"></script>
	
	<script src="https://rawgit.com/TPWeb/formbuilder/master/libs/builder.min.js"></script>
	
	<!--
	<script src="script.js?v=7"></script>
	-->
	<script>
		$(function() {
			var loadForm = "";
			var fid = "";
			var rid = "";
<?php
if(isset($_GET['id'])) {
	$url = $couchdb_server . $couchdb_formbuilderdb . "/" . $_GET['id'];
	$curl = curl_init();
	curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => $url));
	$resp = curl_exec($curl);
	curl_close($curl);
	$d = json_decode($resp, true);
	echo 'loadForm = "' . $d['xml'] . '";';
	echo "\n";
	echo 'fid = "' . $_GET['id'] . '";';
	echo 'rid = "' . $d['_rev'] . '";';
}
?>

			$('.formuliermaker').FormBuilder({
				xml: loadForm,
				database: {
					'database':'couchdbproxy', 
					'dbname':'formbuilder',
					'username':'', 
					'password':'', 
					'server':'<?php echo $couchdb_proxy; ?>'},
				saveTo: 'app',
				formId: fid,
				formRev: rid,
				formUrl: 'index.php?action=createdocument&dbname=<?php echo $couchdb_formviewerdb; ?>',
			});
		});
	</script>
	<style>
		.formbuilder section {
			position: relative;
			border-bottom: 2px solid #DDD;
			padding-bottom: 5px;
			margin-bottom: 20px;
		}

		.formbuilder .row {
			border: 1px solid #DDD;
			position: relative;
		}
		.colomn {
			border: 1px solid #EEE;
			min-height: 50px;
		}


		.active {
			border: 1px solid #000;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-3 formuliermaker">
				<h2>Elementen</h2>
				<ul class="input"></ul>
				<h2>Instellingen</h2>
				<div class="settings" style="display: none;">
					<table class="table">
						<tr data-settings="name">
							<td>Name</td>
							<td><input type="text" name="name" value=""></td>
						</tr>
						<tr data-settings="label">
							<td>Label</td>
							<td><input type="text" name="label" value=""></td>
						</tr>
						<tr data-settings="value">
							<td>Value</td>
							<td><input type="text" name="value" value=""></td>
						</tr>
						<tr data-settings="placeholder">
							<td>Placeholder</td>
							<td><input type="text" name="placeholder" value=""></td>
						</tr>
						<tr data-settings="required">
							<td>Required</td>
							<td><input type="checkbox" name="required" value="true"></td>
						</tr>
						<tr data-settings="maxlength">
							<td>Maxlength</td>
							<td><input type="text" name="maxlength" value="100"></td>
						</tr>
						<tr data-settings="max">
							<td>Max</td>
							<td><input type="text" name="max" value="2147483647"></td>
						</tr>
						<tr data-settings="min">
							<td>Min</td>
							<td><input type="text" name="min" value="-2147483648"></td>
						</tr>
					</table>
					<div class="multi">
						<table class="table">
							<tr>
								<td>Label</td>
								<td>Value</td>
							</tr>
						</table>
						<input type="submit" value="Voeg rij toe" class="btn btn-primary"><br><br>
					</div>

					<input type="submit" value="Opslaan" class="btn btn-primary">
				</div>
				<h2>Exporteer</h2>
				<input type="submit" value="Genereer XML" class="btn btn-secondary xml">
				<input type="submit" value="Genereer HTML" class="btn btn-primary html">
				<h2>Import</h2>
				<textarea name="importxml" placeholder="XML File"></textarea><br>
				<input type="submit" value="Genereer HTML" class="btn btn-primary importxml">
				<h2>Opslaan</h2>
				<input type="submit" value="Save" class="btn btn-secondary save">
				<input type="submit" value="Publish" class="btn btn-primary publish">
			</div>
			<div class="col-md-9">
				<h2>Formulier</h2>
				<a href="javascript:void();" class="addSection">Add section</a><br>
				<div class="formbuilder">
				</div>
			</div>
		</div>
	</div>
</body>
</html>