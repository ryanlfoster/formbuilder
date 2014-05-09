(function($){
    $.fn.extend({
        FormViewer: function(options) {
 			var defaults = {
 					databaseData: {
 						'database':'couchdb',
						'dbname':'formdata', 
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
 					formId:'',



                    newRow: '<div class="row"><div class="col-md-12 colomn"></div></div>',
                    newSection: '<section><div class="row"><div class="col-md-12 colomn active" data-frm-label="label" data-name="h1"><h1>label</h1></div></div></section>',
                    existSection: '<section></section>',
                    
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

            var FIELD = new Array();



            FIELD['text'] = {
                'name':'tekst veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="text" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="text" name="" value="Hier komt de tekst">',
                'options':'name,label,value,placeholder,required,maxlength'};

            FIELD['password'] = {
                'name':'wachtwoord veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="password" name="{name}" value="" class="form-control"></div>', 
                'preview':'<input type="password" name="" value="Hier komt de tekst">',
                'options':'name,label,placeholder,required'};

            FIELD['email'] = {
                'name':'E-mail veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="email" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="email" name="" value="example@example.com">',
                'options':'name,label,value,placeholder,required'};

            FIELD['url'] = {
                'name':'url veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="url" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="email" name="" value="http://www.example.com">',
                'options':'name,label,value,placeholder,required'};

            FIELD['submit'] = {
                'name':'Verzend knop', 
                'field':'<div class="form-group"><input type="submit" value="{value}" class="btn btn-primary"></div>', 
                'preview':'<input type="submit" value="Verzenden">',
                'options':'value'};

            FIELD['nextbutton'] = {
                'name':'Volgende knop', 
                'field':'<div class="form-group"><input type="submit" value="{value}" class="btn btn-primary next"></div>', 
                'preview':'<input type="submit" value="Volgende">',
                'options':'value'};

            FIELD['prevbutton'] = {
                'name':'Vorige knop', 
                'field':'<div class="form-group"><input type="submit" value="{value}" class="btn btn-primary prev"></div>', 
                'preview':'<input type="submit" value="Vorige">',
                'options':'value'};

            FIELD['select'] = {
                'name':'Keuze lijst', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><select name="{name}" class="form-control">{option}</select></div>', 
                'preview':'<label for="">Keuze lijst:</label><select name=""><option value="">Optie 1</option><optino value="">Optie 2</option></select>',
                'options':'name,label,required'};

            FIELD['checkbox'] = {
                'name':'Keuze vakjes', 
                'field':'<div class="form-group"><label for="{name}">{label}</label></div>', 
                'preview':'<label for="">Keuze vakjes:</label><label for=""><input type="checkbox" name="" value="checkbox"> vakje1</label><label for=""><input type="checkbox" name="" value="checkbox"> vakje2</label>',
                'options':'name,label'};

            FIELD['radio'] = {
                'name':'Keuze rondjes', 
                'field':'<div class="form-group"><label for="{name}">{label}</label></div>', 
                'preview':'<label for="">Keuze rondjes:</label><label for=""><input type="radio" name="" value="radio"> rondje1</label><label for=""><input type="radio" name="" value="radio"> rondje2</label>',
                'options':'name,label'};

            FIELD['hidden'] = {
                'name':'Verborgen veld', 
                'field':'<input type="hidden" name="{name}" value="{value}">', 
                'preview':'<input type="hidden" name="{name}" value="{value}">',
                'options':'name,value'};

            FIELD['textarea'] = {
                'name':'groot tekst veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><textarea name="{name}" class="form-control">{value}</textarea></div>', 
                'preview':'<textarea name="{name}" class="form-control">Hier komt je tekst</textarea>',
                'options':'name,label,value,placeholder,required'};

            FIELD['number'] = {
                'name':'nummer veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="number" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="number" name="" value="23">',
                'options':'name,label,value,placeholder,required,max,min'};

            FIELD['date'] = {
                'name':'datum veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="date" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="date" name="" value="2014-01-01">',
                'options':'name,label,value,placeholder,required'};

            FIELD['datetime'] = {
                'name':'datum en tijd veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="datetime" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="date" name="" value="2014-01-01 12:00:00">',
                'options':'name,label,value,placeholder,required'};

            FIELD['time'] = {
                'name':'tijd veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="time" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="time" name="" value="12:00:00">',
                'options':'name,label,value,placeholder,required'};

            FIELD['range'] = {
                'name':'range veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="range" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="range" name="" value="10" min="0" max="30">',
                'options':'name,label,value,placeholder,required,min,max'};

            FIELD['color'] = {
                'name':'kleur veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="color" name="{name}" class="form-control"></div>', 
                'preview':'<input type="color" name="">',
                'options':'name,label,placeholder,required'};

            FIELD['month'] = {
                'name':'maand veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="month" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="color" name="">',
                'options':'name,label,value,placeholder,required'};

            FIELD['week'] = {
                'name':'week veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="week" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="week" name="" value="">',
                'options':'name,label,value,placeholder,required'};

            FIELD['tel'] = {
                'name':'telefoon veld', 
                'field':'<div class="form-group"><label for="{name}">{label}</label><input type="tel" name="{name}" value="{value}" class="form-control"></div>', 
                'preview':'<input type="tel" name="" value="">',
                'options':'name,label,value,placeholder,required'};

            FIELD['h1'] = {
                'name':'Heading 1', 
                'field':'<h1>{label}</h1>', 
                'preview':'<h1>Heading 1</h1>',
                'options':'label'};

            FIELD['h2'] = {
                'name':'Heading 2', 
                'field':'<h2>{label}</h2>', 
                'preview':'<h2>Heading 2</h2>',
                'options':'label'};

            FIELD['h3'] = {
                'name':'Heading 3', 
                'field':'<h3>{label}</h3>', 
                'preview':'<h3>Heading 3</h3>',
                'options':'label'};

            FIELD['h4'] = {
                'name':'Heading 4', 
                'field':'<h4>{label}</h4>', 
                'preview':'<h4>Heading 4</h4>',
                'options':'label'};

            FIELD['p'] = {
                'name':'Paragraph', 
                'field':'<p>{label}</p>', 
                'preview':'<p>Hier komt je tekst</p>',
                'options':'label'};

            $('html').on('click', '.next', function(e) {
                e.preventDefault();
                var section = $(this).parent().parent().parent().parent();
                var goed = true;
                section.find('input').each(function() {
                    if($(this).attr('required') == "required" || $(this).attr('required') == "true") {
                        if($(this).val().length < 1) {
                            alert($(this).attr('label') + ' moet verplicht worden ingevuld.');
                            goed = false;
                        }
                    } 
                    if($(this).attr('maxlength') !== undefined && parseInt($(this).attr('maxlength')) > 0) {
                        if($(this).val().length > parseInt($(this).attr('maxlength'))) {
                            alert($(this).attr('label') + ' is te lang. Dit mag maximum ' + $(this).attr('maxlength') + ' karakters lang zijn.');
                            goed = false;
                        }
                    } 
                    if($(this).attr('max') !== undefined) {
                        if(parseInt($(this).val()) > parseInt($(this).attr('max'))) {
                            alert($(this).attr('label') + ' is te hoog. De maximum waarde is ' + $(this).attr('max'));
                            goed = false;
                        }
                    }
                    if($(this).attr('min') !== undefined) {
                        if(parseInt($(this).val()) < parseInt($(this).attr('min'))) {
                            alert($(this).attr('label') + ' is te laag. De minimum waarde is ' + $(this).attr('min'));
                            goed = false;
                        }
                    }
                });
                if(goed) {
                    section.hide();
                    section.next().show();
                }
            });

            $('html').on('click', '.prev', function(e) {
                e.preventDefault();
                var section = $(this).parent().parent().parent().parent();
                var goed = true;
                section.find('input').each(function() {
                    if($(this).attr('required') == "required" || $(this).attr('required') == "true") {
                        if($(this).val().length < 1) {
                            alert($(this).attr('label') + ' moet verplicht worden ingevuld.');
                            goed = false;
                        }
                    } 
                    if($(this).attr('maxlength') !== undefined) {
                        if($(this).val().length > parseInt($(this).attr('maxlength'))) {
                            alert($(this).attr('label') + ' is te lang. Dit mag maximum ' + $(this).attr('maxlength') + ' karakters lang zijn.');
                            goed = false;
                        }
                    } 
                    if($(this).attr('max') !== undefined) {
                        if(parseInt($(this).val()) > parseInt($(this).attr('max'))) {
                            alert($(this).attr('label') + ' is te hoog. De maximum waarde is ' + $(this).attr('max'));
                            goed = false;
                        }
                    }
                    if($(this).attr('min') !== undefined) {
                        if(parseInt($(this).val()) < parseInt($(this).attr('min'))) {
                            alert($(this).attr('label') + ' is te laag. De minimum waarde is ' + $(this).attr('min'));
                            goed = false;
                        }
                    }
                });
                if(goed) {
                    section.hide();
                    section.prev().show();
                }
            });
            
            $(document).on('submit', 'form', function(e) {
                e.preventDefault();
                var goed = true;
                $(this).find('input').each(function() {
                    if($(this).attr('required') == "required" || $(this).attr('required') == "true") {
                        if($(this).val().length < 1) {
                            alert($(this).attr('label') + ' moet verplicht worden ingevuld.');
                            goed = false;
                        }
                    } 
                    if($(this).attr('maxlength') !== undefined) {
                        if($(this).val().length > parseInt($(this).attr('maxlength'))) {
                            alert($(this).attr('label') + ' is te lang. Dit mag maximum ' + $(this).attr('maxlength') + ' karakters lang zijn.');
                            goed = false;
                        }
                    } 
                    if($(this).attr('max') !== undefined) {
                        if(parseInt($(this).val()) > parseInt($(this).attr('max'))) {
                            alert($(this).attr('label') + ' is te hoog. De maximum waarde is ' + $(this).attr('max'));
                            goed = false;
                        }
                    }
                    if($(this).attr('min') !== undefined) {
                        if(parseInt($(this).val()) < parseInt($(this).attr('min'))) {
                            alert($(this).attr('label') + ' is te laag. De minimum waarde is ' + $(this).attr('min'));
                            goed = false;
                        }
                    }
                });
                
                if(!goed) {

                } else {
                    if(defaults.databaseData.database == "couchdb") {
                        $.couch.urlPrefix = defaults.databaseData.server;
                        if(defaults.databaseData.username.length > 0) {
                            $.couch.login({
                                name: defaults.databaseData.username,
                                password: defaults.databaseData.password
                            });
                        }
                        var db = $.couch.db(defaults.databaseData.dbname);

                        var o = {};
                        var a = $(this).serializeArray();
                        $.each(a, function() {
                            if (o[this.name] !== undefined) {
                                if (!o[this.name].push) {
                                    o[this.name] = [o[this.name]];
                                }
                                o[this.name].push(this.value || '');
                            } else {
                                o[this.name] = this.value || '';
                            }
                        });

                        db.saveDoc (o, {
                            success: function (d) { 
                                defaults.dataRev = d._rev;
                                defaults.dataId = d._id;
                                alert("Formulier is verzonden!");
                            },
                            error: function () { 
                                alert("Kan formulier niet verzenden."); 
                            }
                        });
                    }
                }
            });

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
    							//html = d.html;
                                $('body').html(loadXML(d.xml));
                                formLoaded();
    						} else {
    							alert('Formulier kon niet worden geladen.');
    						}
    					},
    					error: function () { 
    						alert("Formulier kon niet worden geladen."); 
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
                                            $('body').html(loadXML(r.xml));
                                            formLoaded();
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
				} else if(defaults.database.database == "couchbase") {
                    $.ajax({
                        url: defaults.database.server + '/' + defaults.database.dbname,
                        type: "GET",
                        crossDomain: true,
                        success: function(res) {
                            $.ajax({
                                url: defaults.database.server + '/' + defaults.database.dbname+'/' + defaults.formId,
                                type: "GET",
                                success: function(res) {
                                    var r = eval('(' + res + ')');
                                    if(r.id == defaults.formId) {
                                        $('body').html(loadXML(r.xml));
                                        formLoaded();
                                    } else {
                                        alert("Fout tijdens laden van formulier.");
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    alert("Kan formulier niet laden.");
                                }
                            });
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert("Kan geen connectie maken met server.");
                        },
                        dataType:'json'
                    });
                } else {
					alert('No database connected!');
				}
			}

            function loadXML(xml) {
                var xmlDoc = $.parseXML(xml);
                var form = "<form action='' method='post'>";
                $(xmlDoc).find('formulier').each(function(){
                    $(this).find('section').each(function() {
                        var section = $(defaults.existSection);
                        $(this).find('row').each(function() {
                            var row = $(this);
                            var r = $(defaults.newRow);
                            r.find('.colomn').remove();
                            $(this).find('colomn').each(function() {
                                var colomn = $(this);
                                var field = FIELD[colomn.find('field').text()];
                                if(field  !== undefined && field.name  !== undefined) {
                                    var c = $('<div class="col-md-' + colomn.find('width').text() + ' colomn"></div>');
                                    //c.attr('data-name', colomn.find('field').text());

                                    var settings = field.options.split(",");
                                    var html = field.field;
                                    $.each(settings, function(index, value) {
                                        html = html.replace('{' + value + '}', colomn.find(value).eq(0).text());
                                    });
                                    $.each(settings, function(index, value) {
                                       // alert($(html).find('input').val());
                                            //$(html).find('input').attr(value, colomn.find(value).eq(0).text());
                                            //alert(value + ' : ' + $(html).find('input').attr(value));
                                            $(html).find('select').attr(value, colomn.find(value).eq(0).text());
                                            $(html).find('textarea').attr(value, colomn.find(value).eq(0).text());
                                    
                                        

                                        c.attr('data-frm-' + value, colomn.find(value).eq(0).text());
                                    });
                                    alert(html);
                                    c.append(html);

                                    if(colomn.find('field').text() == "select") {
                                        var json = "[";
                                        $(c).find('select').html('');
                                        colomn.find('multi').each(function() {
                                            json += "{'label':'" + $(this).find('label').text() + "', 'value':'" + $(this).find('value').text() + "'},";
                                            $(c).find('select').append('<option value="' + $(this).find('value').text() + '">' + $(this).find('label').text() + '</option>');
                                        });
                                        json += "]";
                                       // $(c).attr('data-frm-multi', json);
                                    } else if(colomn.find('field').text() == "checkbox") {
                                        var json = "[";
                                        $(c).find('input').remove();
                                        $(colomn).find('multi').each(function() {
                                            json += "{'label':'" + $(this).find('label').text() + "', 'value':'" + $(this).find('value').text() + "'},";
                                            $(c).append('<label><input type="checkbox" name="' + c.attr('data-frm-name') + '[]" value="' + $(this).find('value').text() + '">' + $(this).find('label').text() + '</label>');
                                        });
                                        json += "]";
                                        //$(c).attr('data-frm-multi', json);
                                    } else if(colomn.find('field').text() == "radio") {
                                        var json = "[";
                                        $(c).find('input').remove();
                                        $(colomn).find('multi').each(function() {
                                            json += "{'label':'" + $(this).find('label').text() + "', 'value':'" + $(this).find('value').text() + "'},";
                                            $(c).append('<label><input type="radio" name="' + c.attr('data-frm-name') + '" value="' + $(this).find('value').text() + '">' + $(this).find('label').text() + '</label>');
                                        });
                                        json += "]";
                                       // $(c).attr('data-frm-multi', json);
                                    }
                                    r.append(c);
                                }
                            });
                            section.append(r);
                            //form += '<div class="row">' + r.html() + '</div>';
                        });
                        form += "<section>" + section.html() + "</section>";
                    });
                });
                form += "</form>";
                return form;
            }

			
			function guid() {
  				function s4() {
    				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  				}
  				return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
			}

            function formLoaded() {
                $('section:gt(0)').hide();
            }
		}
    });
})(jQuery);