$(function() {
	$('section:gt(0)').hide();
	$('.next').click(function(e) {
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
	$('.prev').click(function(e) {
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

	$('form').submit(function(e) {
		$('input').each(function() {
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
			e.preventDefault();
		}
	});
});