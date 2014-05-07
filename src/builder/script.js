(function($){
    $.fn.extend({
        FormBuilder: function(options) {
 			var defaults = {
 					INPUT_TYPES: [
 						"submit",
 						"nextbutton",
 						"prevbutton",
 						"hidden",

						"text",
 						"textarea",

 						"password", 
 						"email", 
 						"url", 

 						"select",
 						"checkbox",
 						"radio",

 						"number",
 						"range",
 						"tel",
 						"color",

 						"date",
 						"datetime",
 						"time",
 						"month",
 						"week",

 						"h1",
 						"h2",
 						"h3",
 						"h4",
 						"p",
 					],
 					preview: false,
 					newRow: '<div class="row"><a href="javascript:void(0);" class="addColomn">Voeg colom toe</a><br><div class="col-md-12 colomn"></div></div>',
 					newSection: '<section><a href="javascript:void();" class="addRow">add row</a><br><div class="row"><a href="javascript:void(0);" class="addColomn">Voeg colom toe</a><br><div class="col-md-12 colomn active" data-frm-label="label" data-name="h1"><h1>label</h1></div></div></section>',
 					existSection: '<section><a href="javascript:void();" class="addRow">add row</a><br></section>',
 					formUrl: 'submit.html',
 					xml: '',
 					database: {
 						'database':'couchdb',
						'dbname':'formbuilder', 
 						'username':'', 
 						'password':'', 
 						'server':'http://127.0.0.1:5984'},
 					saveTo:'',	/* NOT USED??? */
 					formId:'',
 					formRev:'',
 					basicHTML:'<!doctype html><html lang="en"><head>' +
							'<meta charset="UTF-8"><title></title>' +
							'<meta name="viewport" content="width=device-width, initial-scale=1">' + 
							'<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">' +
							'<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">' +
							'<script src="https://code.jquery.com/jquery-2.1.0.js"></script>' +
							'<script src="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>' +
							'<script src="https://rawgit.com/TPWeb/formbuilder/master/libs/viewer.min.js"></script>' +
							'</head>' + 
							'<body><div class="container">{form}</div></body></html>',
 					basicHTMLUrl:'',
 			};
 			var CONTAINER = $(this);
 			var FORM = $(this).find('.formbuilder');
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

            var options = $.extend(defaults, options);
			var selectedIndex = 0;
			var selectedElement = "";

			if(defaults.xml.length > 0) {
				loadXML();
			}

			if(defaults.formId.length == 0) {
				defaults.formId = guid();
			}

			$.each(defaults.INPUT_TYPES, function(i, v) {
				var field = FIELD[v];
				if(field  !== undefined && field.name  !== undefined) {
					CONTAINER.find('.input').append('<li data-name="' + v + '">' + field.name + '</li>');
				}
			});

			$('.addSection').click(function(e) {
				e.preventDefault();
				var section = $(defaults.newSection);
				$('.formbuilder').append(section);
			});

			$('.formbuilder').on('click', '.addRow', function(e) {
				e.preventDefault();
				var row = $(defaults.newRow);
				$(this).parent().append(row);
				$(".colomn").removeClass('active');
				row.find('.colomn').addClass('active');
			});


			$('.formbuilder').on('click', '.addColomn', function(e) {
				e.preventDefault();
				var aantal = $(this).parent().find('div.colomn').length;
				aantal++;
				var c = "col-md-" + Math.floor(12/aantal);
				var colomn = $(this).parent().find('.colomn');
				colomn.removeClass('col-md-1');
				colomn.removeClass('col-md-2');
				colomn.removeClass('col-md-3');
				colomn.removeClass('col-md-4');
				colomn.removeClass('col-md-5');
				colomn.removeClass('col-md-6');
				colomn.removeClass('col-md-7');
				colomn.removeClass('col-md-8');
				colomn.removeClass('col-md-9');
				colomn.removeClass('col-md-10');
				colomn.removeClass('col-md-11');
				colomn.removeClass('col-md-12');
				colomn.addClass(c);
				$(this).parent().append('<div class="' + c + ' colomn"></div>');

			});

			$('.formbuilder').on('click', '.colomn', function(e) {
				e.preventDefault();
				$(".colomn").removeClass('active');
				$(this).addClass('active');
				loadSettings();
			});

			$('.input').on('click', 'li', function(e) {
				e.preventDefault();
				if($('.formbuilder .colomn.active').length > 0) {
					var txt = $(this).attr('data-name');
					var field = FIELD[txt];
					if(field  !== undefined && field.name  !== undefined) {
						createForm(txt);
						loadSettings();
					}
				}
			});

			$('.settings > input[type=submit]').click(function(e) {
				e.preventDefault();
				var frm = $('.formbuilder .colomn.active');
				var field = FIELD[frm.attr('data-name')];
				if(field  !== undefined && field.name  !== undefined) {
					//load settings
					var settings = field.options.split(",");
					$.each(settings, function(index, value) {
						if(value == 'required') {
							if($('input[name=required]').is(':checked')) {
								setSettings('required', 'required');
							} else {
								setSettings('required', 'false');
							}
						} else {
							setSettings(value, $('.settings [name=' + value + ']').val());
						}
					});
					if(frm.attr('data-name') == "select") {
						var json = "[";
						frm.find('select').html('');
						$('.settings .multi table tr:gt(0)').each(function() {
							json += "{'label':'" + $(this).find('[name=m-label]').val() + "', 'value':'" + $(this).find('[name=m-value]').val() + "'},";
							frm.find('select').append('<option value="' + $(this).find('[name=m-value]').val() + '">' + $(this).find('[name=m-label]').val() + '</option>');
						});
						json += "]";
						frm.attr('data-frm-multi', json);
					} else if(frm.attr('data-name') == "checkbox") {
						var json = "[";
						frm.find('input').remove();
						$('.settings .multi table tr:gt(0)').each(function() {
							json += "{'label':'" + $(this).find('[name=m-label]').val() + "', 'value':'" + $(this).find('[name=m-value]').val() + "'},";
							frm.append('<label><input type="checkbox" name="' + $('.settings [name=name]').val() + '[]" value="' + $(this).find('[name=m-value]').val() + '">' + $(this).find('[name=m-label]').val() + '</label>');
						});
						json += "]";
						frm.attr('data-frm-multi', json);
					} else if(frm.attr('data-name') == "radio") {
						var json = "[";
						frm.find('input').remove();
						$('.settings .multi table tr:gt(0)').each(function() {
							json += "{'label':'" + $(this).find('[name=m-label]').val() + "', 'value':'" + $(this).find('[name=m-value]').val() + "'},";
							frm.append('<label><input type="radio" name="' + $('.settings [name=name]').val() + '" value="' + $(this).find('[name=m-value]').val() + '">' + $(this).find('[name=m-label]').val() + '</label>');
						});
						json += "]";
						frm.attr('data-frm-multi', json);
					}
				}
			});


			$('.settings .multi input[type=submit]').click(function(e) {
				e.preventDefault();
				$('.multi table').append('<tr><td><input type="text" name="m-label"></td><td><input type="text" name="m-value"></td></tr>');
			});

			$('input[type=submit].xml').click(function(e) {
				e.preventDefault();
				alert(generateXML());
			});

			$('input[type=submit].html').click(function(e) {
				e.preventDefault();
				alert(generateHTML());
			});

			$('input[type=submit].importxml').click(function(e) {
				e.preventDefault();
				defaults.xml = $('textarea[name="importxml"]').val();
				loadXML();
			});

			$('input[type=submit].save').click(function(e) {
				e.preventDefault();
				push_to_server(0);
			});


			$('input[type=submit].publish').click(function(e) {
				e.preventDefault();
				push_to_server(1);
			});


			/* REMOVE */
			$('.formbuilder').on('mouseenter', '.colomn', function() {
				$(this).append('<div class="delete" style="position: absolute; right: 0; top: 0;"><a href="javascript:void(0);" class="deleteColomn">X</a></div>');
			});
			$('.formbuilder').on('mouseleave', '.colomn', function() {
				$(this).find('div.delete').remove();
			});

			$('.formbuilder').on('click', '.deleteColomn', function(e) {
				e.preventDefault();
				tCol = $(this).parent().parent();

				var aantal = tCol.parent().find('div.colomn').length;
				aantal--;
				if(aantal > 0) {
					var c = "col-md-" + Math.floor(12/aantal);
					var colomn = tCol.parent().find('div.colomn');
					colomn.removeClass('col-md-1');
					colomn.removeClass('col-md-2');
					colomn.removeClass('col-md-3');
					colomn.removeClass('col-md-4');
					colomn.removeClass('col-md-5');
					colomn.removeClass('col-md-6');
					colomn.removeClass('col-md-7');
					colomn.removeClass('col-md-8');
					colomn.removeClass('col-md-9');
					colomn.removeClass('col-md-10');
					colomn.removeClass('col-md-11');
					colomn.removeClass('col-md-12');
					colomn.addClass(c);
				}
				tCol.remove();
			});

			$('.formbuilder').on('mouseenter', '.row', function() {
				$(this).append('<div class="delete" style="position: absolute; right: 0; top: 0;"><a href="javascript:void(0);" class="deleteRow">X</a></div>');
			});
			$('.formbuilder').on('mouseleave', '.row', function() {
				$(this).find('div.delete').remove();
			});

			$('.formbuilder').on('click', '.deleteRow', function(e) {
				e.preventDefault();
				$(this).parent().parent().remove();
			});

			$('.formbuilder').on('mouseenter', 'section', function() {
				$(this).append('<div class="delete" style="position: absolute; right: 0; top: 0;"><a href="javascript:void(0);" class="deleteSection">X</a></div>');
			});
			$('.formbuilder').on('mouseleave', 'section', function() {
				$(this).find('div.delete').remove();
			});

			$('.formbuilder').on('click', '.deleteSection', function(e) {
				e.preventDefault();
				$(this).parent().parent().remove();
			});



			function generateXML() {
				var str = "<formulier>";
				$('.formbuilder section').each(function(i) {
					str += "<section>";
					$(this).find('.row').each(function(i) {
						str += "<row>";
						$(this).find('.colomn').each(function(i) {
							var colomn = $(this);
							var field = FIELD[$(this).attr('data-name')];
							str += "<colomn>";
							var width = 0;
							for(i = 1; i <= 12; i++) {
								if(colomn.hasClass('col-md-' + i)) {
									width = i;
								}
							}
							str += "<width>" + width + "</width>";
							if(field  !== undefined && field.name  !== undefined) {
								str += "<field>" + $(this).attr('data-name') + "</field>";

								var settings = field.options.split(",");
								$.each(settings, function(index, value) {
									var waarde = "";
									if(colomn.attr('data-frm-' + value) !== undefined) {
										waarde = colomn.attr('data-frm-' + value);
									}
									str += "<" + value + ">" + waarde + "</" + value + ">";
								});
								if(colomn.attr('data-name') == "select" || colomn.attr('data-name') == "checkbox" ||colomn.attr('data-name') == "radio") {
									if(colomn.attr('data-frm-multi') !== undefined) {
										var json = eval('(' + colomn.attr('data-frm-multi') + ')');
										$.each(json, function(i, value) {
											str += "<multi><value>" + value.value + "</value><label>" + value.label + "</label></multi>";
										});
									}
								}
							}
							str += "</colomn>";
						});
						str += "</row>";
					});
					str += "</section>";
				});

				str += "</formulier>";
				return str;
			}

			function generateHTML() {
				var form = '<form></form>';
				form = $(form);
				$('.formbuilder section').each(function(i) {
					var section = $('<section></section>')
					$(this).find('.row').each(function(i) {
						var row = $('<div class="row"></div>');
						$(this).find('.colomn').each(function(i) {
							var field = FIELD[$(this).attr('data-name')];
							var width = "col-md-12";
							var colomn = $(this);
							for(var i = 1; i <= 12; i++) {
								if($(this).hasClass('col-md-' + i)) {
									width = "col-md-" + i;
								}
							}
							var c = $('<div class="' + width + '"></div>');
							if(field  !== undefined && field.name  !== undefined) {
								var settings = field.options.split(",");
								var html = field.field;
								$.each(settings, function(index, value) {
									html = html.replace('{' + value + '}', colomn.attr('data-frm-' + value));
								});
								$(c).append(html);
								$.each(settings, function(index, value) {
									if(colomn.attr('data-frm-' + value) !== undefined) {
										$(c).find('input').attr(value, colomn.attr('data-frm-' + value));
										$(c).find('select').attr(value, colomn.attr('data-frm-' + value));
										$(c).find('textarea').attr(value, colomn.attr('data-frm-' + value));
									}
								});

								if(colomn.attr('data-name') == "select") {
									var json = "[";
									$(c).find('select').html('');
									var j = eval('(' + colomn.attr('data-frm-multi') + ')');
									$.each(j, function(i, value) {
										json += "{'label':'" + value.label + "', 'value':'" + value.value + "'},";
										$(c).find('select').append('<option value="' + value.value + '">' + value.label + '</option>');
									});
									json += "]";
									//$(c).attr('data-frm-multi', json);
								} else if(colomn.attr('data-name') == "checkbox") {
									var json = "[";
									$(c).find('input').remove();
									var j = eval('(' + colomn.attr('data-frm-multi') + ')');
									$.each(j, function(i, value) {
										json += "{'label':'" + value.label + "', 'value':'" + value.value + "'},";
										$(c).append('<label><input type="checkbox" name="' + colomn.attr('data-frm-name') + '[]" value="' + value.value + '">' + value.label + '</label>');
									});
									json += "]";
									//$(c).attr('data-frm-multi', json);
								} else if(colomn.attr('data-name') == "radio") {
									var json = "[";
									$(c).find('input').remove();
									var j = eval('(' + colomn.attr('data-frm-multi') + ')');
									$.each(j, function(i, value) {
										json += "{'label':'" + value.label + "', 'value':'" + value.value + "'},";
										$(c).append('<label><input type="radio" name="' + colomn.attr('data-frm-name') + '" value="' + value.value + '">' + value.label + '</label>');
									});
									json += "]";
									//$(c).attr('data-frm-multi', json);
								}
							}
							row.append(c);
						});
						section.append(row);
					});
					form.append(section);
				});
				return '<form action="' + defaults.formUrl + '" method="POST">' + form.html() + '</form>';
			}

			function loadXML() {
				var xmlDoc = $.parseXML(defaults.xml);
				var form = "";
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
									c.attr('data-name', colomn.find('field').text());

									var settings = field.options.split(",");
									var html = field.field;
									$.each(settings, function(index, value) {
										html = html.replace('{' + value + '}', colomn.find(value).eq(0).text());
										if(c.attr('data-frm-' + value) !== undefined) {
											$(html).find('input').attr(value, colomn.find(value).eq(0).text());
											$(html).find('select').attr(value, colomn.find(value).eq(0).text());
											$(html).find('textarea').attr(value, colomn.find(value).eq(0).text());
										}
										c.attr('data-frm-' + value, colomn.find(value).eq(0).text());
									});
									c.append(html);

									if(colomn.find('field').text() == "select") {
										var json = "[";
										$(c).find('select').html('');
										colomn.find('multi').each(function() {
											json += "{'label':'" + $(this).find('label').text() + "', 'value':'" + $(this).find('value').text() + "'},";
											$(c).find('select').append('<option value="' + $(this).find('value').text() + '">' + $(this).find('label').text() + '</option>');
										});
										json += "]";
										$(c).attr('data-frm-multi', json);
									} else if(colomn.find('field').text() == "checkbox") {
										var json = "[";
										$(c).find('input').remove();
										$(colomn).find('multi').each(function() {
											json += "{'label':'" + $(this).find('label').text() + "', 'value':'" + $(this).find('value').text() + "'},";
											$(c).append('<label><input type="checkbox" name="' + c.attr('data-frm-name') + '[]" value="' + $(this).find('value').text() + '">' + $(this).find('label').text() + '</label>');
										});
										json += "]";
										$(c).attr('data-frm-multi', json);
									} else if(colomn.find('field').text() == "radio") {
										var json = "[";
										$(c).find('input').remove();
										$(colomn).find('multi').each(function() {
											json += "{'label':'" + $(this).find('label').text() + "', 'value':'" + $(this).find('value').text() + "'},";
											$(c).append('<label><input type="radio" name="' + c.attr('data-frm-name') + '" value="' + $(this).find('value').text() + '">' + $(this).find('label').text() + '</label>');
										});
										json += "]";
										$(c).attr('data-frm-multi', json);
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
				$('.formbuilder').html(form);
			}

			function loadSettings() {
				var frm = $('.formbuilder .colomn.active');
				var field = FIELD[frm.attr('data-name')];
				if(field  !== undefined && field.name  !== undefined) {
					//load settings
					$('.settings').show();
					$('.settings > table tr').hide();
					$('.settings .multi').hide();
					$('.settings .multi tr:gt(0)').remove();
					var settings = field.options.split(",");
					$.each(settings, function(index, value) {
						if(value == 'required') {
							if(frm.attr('data-frm-' + value) == 'required') {
								$('.settings [data-settings=' + value + '] input').attr('checked', true);
								$('.settings [data-settings=' + value + '] select').attr('checked', true);
								$('.settings [data-settings=' + value + '] textarea').attr('checked', true);
							} else {
								$('.settings [data-settings=' + value + '] input').attr('checked', false);
								$('.settings [data-settings=' + value + '] select').attr('checked', false);
								$('.settings [data-settings=' + value + '] textarea').attr('checked', false);
							}
							$('.settings [data-settings=' + value + ']').show();
						} else {
							$('.settings [data-settings=' + value + ']').show().find('input').val(frm.attr('data-frm-' + value));
						}
					});
					if(frm.attr('data-name') == "select" || frm.attr('data-name') == "checkbox" || frm.attr('data-name') == "radio") {
						$('.settings .multi').show();
						if(frm.attr('data-frm-multi') !== undefined) {
							var json = eval('(' + frm.attr('data-frm-multi') + ')');
							$.each(json, function(i, value) {
								$('.settings .multi table').append('<tr><td><input type="text" name="m-label" value="' + value.label + '"></td><td><input type="text" name="m-value"  value="' + value.value + '"></td></tr>');
							});
						} else {
							$('.settings .multi table').append('<tr><td><input type="text" name="m-label"></td><td><input type="text" name="m-value"></td></tr>');
						}
					}
				} else {
					$('.settings').hide();
				}
			}

			function setSettings(field, value) {
				var frm = $('.formbuilder .colomn.active');
				var f = FIELD[frm.attr('data-name')];
				if(f  !== undefined && f.name  !== undefined) {
					var settings = f.options.split(",");
					$.each(settings, function(index, val) {
						if(val == field) {
							frm.attr('data-frm-' + val, value);
						}
					});
					createForm(frm.attr('data-name'));
				}
			}

			function createForm(field) {
				var frm = $('.formbuilder .colomn.active');
				var f = FIELD[field];
				if(f  !== undefined && f.name  !== undefined) {
					frm.html( createFieldA(f.options, f.field) );

					var settings = f.options.split(",");
					for(var i = 0; i < settings.length; i++) {
						var v = frm.attr('data-frm-' + settings[i]);
						if(v == undefined) {
							v = ''; //settings[i];
						}
						frm.attr('data-frm-' + settings[i], v);
						frm.find('input').attr(settings[i], v);
						frm.find('select').attr(settings[i], v);
						frm.find('textarea').attr(settings[i], v);
					}
					frm.attr('data-name', field);
				}
			}

			function createField(data, field) {
				var str = field;
				$.each(data, function(i, v) {
					str = str.replace('{' + i + '}', v);
				});
				return str;
			}

			function createFieldA(f, field) {
				var frm = $('.formbuilder .colomn.active');
				var str = field;
				var settings = f.split(",");
				for(var i = 0; i < settings.length; i++) {
					var v = frm.attr('data-frm-' + settings[i]);
					if(v == undefined) {
						v = ''; //settings[i];
						if(settings[i] == 'name' || settings[i] == "label") {
							v = settings[i];
						}
					}
					str = str.replace('{' + settings[i] + '}', v);
					frm.attr('data-frm-' + settings[i], v);
				}
				return str;
			}

			function setAttr(data, field) {
				$.each(data, function(i, v) {
					field.attr('data-frm-' + i, v);
				});
			}

			function generateFullHTML() {
				var str = "";
				if(defaults.basicHTMLUrl.length == 0) {
					var split = defaults.basicHTML.split("{form}");
					str = split[0] + generateHTML() + split[1];
				} else {
					$.get(defaults.basicHTMLUrl, function(value) {
						var split = value.split("{form}");
						str = split[0] + generateHTML() + split[1];
					});
				}
				return str;
			}
			
			function guid() {
  				function s4() {
    				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  				}
  				return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
			}

			function push_to_server(publish) {
				if(defaults.database.database == "couchdb") {
					$.couch.urlPrefix = defaults.database.server;
					if(defaults.database.username.length > 0) {
						$.couch.login({
    						name: defaults.database.username,
    						password: defaults.database.password
						});
					}
					var db = $.couch.db(defaults.database.dbname);
					var data = {_id:defaults.formId, 'html':generateFullHTML(), 'xml':generateXML(), 'publish': publish};
					if(defaults.formRev != null && defaults.formRev !== undefined && defaults.formRev.length > 0) {
						data._rev = defaults.formRev;
					}
					db.saveDoc (data, {
    					success: function (d) { 
    						defaults.formRev = d._rev;
    						if(publish == 1) {
    							alert("Formulier is gepubliseerd!");
    						} else {
    							alert("Formulier is opgeslagen");
    						}
    					},
    					error: function () { 
    						alert ("Kan formulier niet opslaan."); 
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
	    						if(defaults.formRev.length == 0) {
	    							str = {'publish':publish, 'xml':generateXML(), 'html':generateFullHTML()};
	    						} else {
	    							str = {'publish':publish, '_rev':defaults.formRev, 'xml':generateXML(), 'html':generateFullHTML()};
	    						}
								$.ajax({
    								url: defaults.database.server + '/?action=createdocument&dbname=' + defaults.database.dbname + '&id=' + defaults.formId,
    								type: "POST",
    								data: str,
    								success: function(res) {
    									var r = eval('(' + res + ')');
    									if(r.id == defaults.formId) {
    										if(publish == 1) {
    											alert("Formulier is gepubliseerd!");
    										} else {
    											alert("Formulier is opgeslagen");
    										}
    									} else {
    										alert("Fout tijdens opslagen van formulier.");
    									}
    								},
    								error: function(jqXHR, textStatus, errorThrown) {
    									alert("Kan formulier niet opslaan.");
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
			}
		}
    });
})(jQuery);