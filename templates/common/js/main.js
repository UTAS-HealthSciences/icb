require.config({
	paths: {
		'domReady': 'https://dementia.health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady',
		'jquery': ["https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min", 'https://dementia.health.utas.edu.au/templates/common/vendor/jquery-1.10.2.min'],
		'bootstrap': 'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap/3.1.1/js/bootstrap.min',
		'bootstrap-combobox': 'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap-combobox/1.1.6/js/bootstrap-combobox',
		'bootstrap-datepicker': 'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker',
		'bootstrap-datetimepicker': 'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap-datetimepicker/3.0.0/js/bootstrap-datetimepicker.min',
		'bootstrapValidator': 'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap-validator/0.4.5/js/bootstrapValidator',
		'fuelux': 'https://dementia.health.utas.edu.au/templates/common/vendor/fuelux/2.6.1/',
		'mask': 'https://dementia.health.utas.edu.au/templates/common/vendor/mask/1.6.4/jquery.mask.min',
		'select2': 'https://dementia.health.utas.edu.au/templates/common/vendor/select2/3.4.8/select2.min',
		'moment': 'https://dementia.health.utas.edu.au/templates/common/vendor/moment/2.6.0/min/moment.min',
		'icheck': '/common/vendor/iCheck/1.0.2/icheck.min'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'bootstrap-combobox': {
			deps: ['bootstrap']
		},
		'bootstrap-datepicker': {
			deps: ['bootstrap']
		},
		'bootstrap-datetimepicker': {
			deps: ['bootstrap', 'moment']
		},
		'bootstrapValidator': {
			deps: ['jquery', 'bootstrap']
		},
		'wizard': {
			deps: ['bootstrap']
		},
		'plugins': {
			deps: ['jquery']
		},
		'modal-adm': {
			deps: ['bootstrap']
		},
		'fuelux': {
			deps: ['jquery']
		},
		'mask': {
			deps: ['jquery']
		},
		'select2': {
			deps: ['jquery']
		},
		'icheck': {
			deps: ['jquery']
		}



	},
	waitSeconds: 600, //default is 7
	deps: ['jquery', 'plugins', 'bootstrap', 'modal-adm'] //load asap
});
