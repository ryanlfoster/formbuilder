(function($){
    $.fn.extend({
        FormViewer: function(options) {
 			var defaults = {
 					databaseData: {
 						'database':'couchdb',
						'dbname':'formbuilder', 
 						'username':'', 
 						'password':'', 
 						'server':'http://127.0.0.1:5984'},
 					database: {
 						'database':'couchdb',
						'dbname':'formbuilder', 
 						'username':'', 
 						'password':'', 
 						'server':'http://127.0.0.1:5984'},
 					saveTo:'',	/* NOT USED??? */
 					dataId:'',
 					dataRev:'',
 					formId:''
 			};
 			var CONTAINER = $(this);
 			var FORM = $(this).find('.formbuilder');

            var options = $.extend(defaults, options);
			var selectedIndex = 0;
			var selectedElement = "";

			if(defaults.dataId.length == 0) {
				defaults.dataId = guid();
			}

			loadHTML();



			function loadHTML() {
				var html = "";
				if(defaults.database.database == "couchdb") {
					$.couch.urlPrefix = defaults.database.server;
					if(defaults.database.username.length > 0) {
						$.couch.login({
    						name: defaults.database.username,
    						password: defaults.database.password
						});
					}
					var db = $.couch.db(defaults.database.dbname);
					db.openDoc(defaults.formId, {
    					success: function (d) { 
    						if(d.html !== undefined) {
    							html = d.html;
    						} else {
    							alert('Formulier kon niet worden geladen.');
    						}
    					},
    					error: function () { 
    						alert ("Formulier kon niet worden geladen."); 
    					}
					});
				} else if(defaults.database.database == "couchdbproxy") {
					$.ajax({
    					url: defaults.database.server + '/?action=createdatabase',
    					type: "POST",
    					crossDomain: true,
    					data: {'dbname':defaults.database.dbname},
    					success: function(res) {
    						var r = eval('(' + res + ')');
	    					if(r.ok == true || r.error == "file_exists" || r.db_name == defaults.database.dbname) {
								$.ajax({
    								url: defaults.database.server + '/?action=getdocument&dbname=' + defaults.database.dbname + '&id=' + defaults.formId,
    								type: "GET",
    								success: function(res) {
    									var r = eval('(' + res + ')');
    									if(r.id == defaults.formId) {
    										html = r.html;
    									} else {
    										alert("Fout tijdens laden van formulier.");
    									}
    								},
    								error: function(jqXHR, textStatus, errorThrown) {
    									alert("Kan formulier niet laden.");
    								}
								});
        					} else {
        						alert('Fout tijdens aanmaken database');
        					}
    					},
    					error: function(jqXHR, textStatus, errorThrown) {
    						alert("Kan geen connectie maken met server.");
    					}
					});
				} else {
					alert('No database connected!');
				}
				$('html').html(html);
			}

			
			function guid() {
  				function s4() {
    				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  				}
  				return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
			}
		}
    });
})(jQuery);