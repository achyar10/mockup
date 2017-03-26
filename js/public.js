/* Toastr configurations */
toastr.options = {
	"closeButton": true,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"showDuration": "0",
	"hideDuration": "0",
	"timeOut": "0",
	"extendedTimeOut": "0",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};

// Helper function
var H = H || {};
H.stringToJSON = function(str) {
    var res = typeof str == 'string' ? JSON.parse(str) : str;
    return res;
};

/**
 * Growl handler
 */
H.growl = function(type, message) {
	switch (type) {
		case 'success' :
			toastr.success(message, 'Sukses' );
			break;
		case 'info' :
			toastr.info(message, 'Info' );
			break;
		case 'warning' :
			toastr.warning(message, 'Peringatan' );
			break;
		case 'error' :
			toastr.error(message, 'Terjadi Kesalahan' );
			break;
		default :
			toastr.error(message, 'Terjadi Kesalahan');
	}
};

// Save Subscriber
function subscriber() {
	var values = {
		subscriber: $('#subscriber').val(),
		csrf_token: $('meta[name="csrf-token"]').attr('content')
	};
	$.post(_BASE_URL + 'public/subscriber/save', values, function(response) {
		var res = H.stringToJSON(response);
		if (res.type == 'token_error') {
			// window.location = 'https://google.com';
		} else {
			H.growl(res.type, res.message);
			$('#subscriber').val('');
			$('meta[name="csrf-token"]').attr('content', res.csrf_token);
		}
	});
}

// Save Pollings
function polling() {
	var values = {
		answer_id: $('input[name=answer_id]:checked').val(),
		csrf_token: $('meta[name="csrf-token"]').attr('content')
	};
	if (answer_id) {
		$.post(_BASE_URL + 'public/pollings/save', values, function(response) {
			var res = H.stringToJSON(response);
			if (res.type == 'token_error') {
				// window.location = 'https://google.com';
			} else {
				H.growl(res.type, res.message);
				$('meta[name="csrf-token"]').attr('content', res.csrf_token);
			}
		});
	} else {
		toastr.info('Anda belum memilih jawaban.', 'Info' );
	}
}

// Save Contact Us
function contact_us() {
	var values = {
		full_name: $('#full_name').val(),
		email: $('#email').val(),
		url: $('#url').val(),
		message: $('#message').val(),		
		captcha: $('#captcha').val(),
		csrf_token: $('meta[name="csrf-token"]').attr('content')
	};
	$.post(_BASE_URL + 'hubungi-kami/save', values, function(response) {
		var res = H.stringToJSON(response);
		if (res.type == 'token_error') {
			// window.location = 'https://google.com';
		} else {
			H.growl(res.type, res.message);
			if (res.type == 'success') {
				$('input[type="text"], textarea').val('');
			}
			$('meta[name="csrf-token"]').attr('content', res.csrf_token);
		}
	});
}

// Post Comment
function post_comment() {
	var values = {
		full_name: $('#full_name').val(),
		email: $('#email').val(),
		url: $('#url').val(),
		message: $('#message').val(),
		comment_post_id: $('#comment_post_id').val(),
		captcha: $('#captcha').val(),
		csrf_token: $('meta[name="csrf-token"]').attr('content')
	};
	$.post(_BASE_URL + 'public/post_comments', values, function(response) {
		var res = H.stringToJSON(response);
		if (res.type == 'token_error') {
			// window.location = 'https://google.com';
		} else {
			H.growl(res.type, res.message);
			if (res.type == 'success') {
				$('input[type="text"], textarea').val('');
			}
			$('meta[name="csrf-token"]').attr('content', res.csrf_token);
		}
	});
}

// Preview Gallery Photo
function preview(id) {
	var values = {
		'id': id
	};
	$.post( _BASE_URL + 'public/gallery_photos/preview', values, function(response) {
		if(response.count > 0) {
			$.magnificPopup.open({
				items: response.items,
				gallery: {
					enabled: true
				},
				type: 'image'
			});
		} else {
			H.growl('info', 'Photo tidak ditemukan !');
		}
	});
}

// Marquee
$(document).ready(function (){
	$("#marquee").marquee();
});

/* Biar pilihan 1 dan 2 tidak sama */
function check_options(el) {
	var select = $('#' + (el == 1 ? 'first':'second') + '_choice');
	if (el == 1) {
		var second = $('#second_choice');
		if (second.val() == select.val()) {
			second.val('');
		}
	} else {
		var first = $('#first_choice');
		if (first.val() == select.val()) {
			first.val('');
		}
	}
}

function change_country_field() {
	var citizenship = $('#citizenship').val();
	if (citizenship == 'WNA') {
		$('.country').show();
	} else {
		$('.country').hide();
	}
}

function change_kps_number_field() {
	var kps_receiver = $('#kps_receiver').val();
	if (kps_receiver == 'true') {
		$('.kps_number').show();
	} else {
		$('.kps_number').hide();
	}
}

function save_registration_form() {
	var fill_data = new FormData();	
	fill_data.append('file', $('input[type=file]')[ 0 ].files[ 0 ]);
	fill_data.append('first_choice', $('#first_choice').val());
	fill_data.append('second_choice', $('#second_choice').val());
	fill_data.append('prev_exam_number', $('#prev_exam_number').val());
	fill_data.append('paud', $('#paud').val());
	fill_data.append('tk', $('#tk').val());
	fill_data.append('hobby', $('#hobby').val());
	fill_data.append('ambition', $('#ambition').val());
	fill_data.append('is_transfer', $('#is_transfer').val());
	fill_data.append('skhun', $('#skhun').val());
	fill_data.append('diploma_number', $('#diploma_number').val());
	fill_data.append('full_name', $('#full_name').val());
	fill_data.append('gender', $('#gender').val());
	fill_data.append('nisn', $('#nisn').val());
	fill_data.append('nik', $('#nik').val());
	fill_data.append('birth_place', $('#birth_place').val());
	fill_data.append('birth_date', $('#birth_date').val());
	fill_data.append('religion', $('#religion').val());
	fill_data.append('special_needs', $('#special_needs').val());
	fill_data.append('street_address', $('#street_address').val());
	fill_data.append('rt', $('#rt').val());
	fill_data.append('rw', $('#rw').val());
	fill_data.append('sub_village', $('#sub_village').val());
	fill_data.append('village', $('#village').val());
	fill_data.append('sub_district', $('#sub_district').val());
	fill_data.append('district', $('#district').val());
	fill_data.append('postal_code', $('#postal_code').val());
	fill_data.append('residence', $('#residence').val());
	fill_data.append('transportation', $('#transportation').val());
	fill_data.append('phone', $('#phone').val());
	fill_data.append('mobile_phone', $('#mobile_phone').val());
	fill_data.append('email', $('#email').val());
	fill_data.append('kps_receiver', $('#kps_receiver').val());
	fill_data.append('kps_number', $('#kps_number').val());
	fill_data.append('citizenship', $('#citizenship').val());
	fill_data.append('country', $('#country').val());
	fill_data.append('father_name', $('#father_name').val());
	fill_data.append('father_birth_year', $('#father_birth_year').val());
	fill_data.append('father_education', $('#father_education').val());
	fill_data.append('father_employment', $('#father_employment').val());
	fill_data.append('father_monthly_income', $('#father_monthly_income').val());
	fill_data.append('father_special_needs', $('#father_special_needs').val());
	fill_data.append('mother_name', $('#mother_name').val());
	fill_data.append('mother_birth_year', $('#mother_birth_year').val());
	fill_data.append('mother_education', $('#mother_education').val());
	fill_data.append('mother_employment', $('#mother_employment').val());
	fill_data.append('mother_monthly_income', $('#mother_monthly_income').val());
	fill_data.append('mother_special_needs', $('#mother_special_needs').val());
	fill_data.append('guardian_name', $('#guardian_name').val());
	fill_data.append('guardian_birth_year', $('#guardian_birth_year').val());
	fill_data.append('guardian_education', $('#guardian_education').val());
	fill_data.append('guardian_employment', $('#guardian_employment').val());
	fill_data.append('guardian_monthly_income', $('#guardian_monthly_income').val());
	fill_data.append('mileage', $('#mileage').val());
	fill_data.append('traveling_time', $('#traveling_time').val());
	fill_data.append('height', $('#height').val());
	fill_data.append('weight', $('#weight').val());
	fill_data.append('sibling_number', $('#sibling_number').val());
	fill_data.append('captcha', $('#captcha').val());
	fill_data.append('declaration', $('#declaration').prop('checked'));
	fill_data.append('csrf_token', $('meta[name="csrf-token"]').attr('content'));
	$.ajax({
		url: _BASE_URL + 'public/admission_form/save',
		type: 'POST',
		data: fill_data,
		contentType: false,
		processData: false,
		success : function( response ) {
			var res = H.stringToJSON(response);
			if (res.type == 'token_error') {
				// window.location = 'https://google.com';
			} else {
				H.growl(res.type, res.message);
				if (res.type == 'success') {
					window.open(_BASE_URL + 'media_library/students/' + res.file_name, '_self');
				}
			}
			$('meta[name="csrf-token"]').attr('content', res.csrf_token);
		}
	});
}

// Cetak Formulir PPDB/PMB
function print_pdf() {
	var values = {
		birth_date: $('#birth_date').val(),
		registration_number: $('#registration_number').val(),
		csrf_token: $('meta[name="csrf-token"]').attr('content')
	};
	$.post(_BASE_URL + 'public/admission_printing_form/pdf_generated', values, function(response) {
		var res = H.stringToJSON(response);
		if (res.type == 'token_error') {
			// window.location = 'https://google.com';
		} else if(res.type == 'success') {
			window.open(_BASE_URL + 'media_library/students/' + res.file_name,'_self');
		} else {
			H.growl(res.type, res.message);
			$('meta[name="csrf-token"]').attr('content', res.csrf_token);
		}
	});
}

// Hasil Seleksi PPDB/PMB
function selection_results() {
	var values = {
		birth_date: $('#birth_date').val(),
		registration_number: $('#registration_number').val(),
		csrf_token: $('meta[name="csrf-token"]').attr('content')
	};
	$.post(_BASE_URL + 'public/admission_selection_results/selection_results', values, function(response) {
		var res = H.stringToJSON(response);
		if (res.type == 'token_error') {
			// window.location = 'https://google.com';
		} else {
			H.growl(res.type, res.message);
			$('meta[name="csrf-token"]').attr('content', res.csrf_token);
		}
	});
}