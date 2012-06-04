/* Author: kaique.developer@gmail.com */

var SimplePress = (function ( win, $ ) {
	var _ = function () {};

	var core = {
		object: {},
	};

	core.object.selectProperty = function ( target, selections ) {
		var output = {};

		if ( target && selections ) {
			for ( var targetItem in target ) {
				for ( var selectionItem in selections ) {
					if ( selections[ selectionItem ] === targetItem ) {
						output[ targetItem ] = target[ targetItem ];
					}
				}
			}
		}

		return output;
	};


	// Internals
	_.prototype = {
		self: this,
		win: win,
		jQuery: $,
		press: [],	
	};

	_.prototype.start = function ( settings ) {
		var output = [],
			settings = settings || {},
			press = $('.press');

		if ( settings ) {
			if ( 'width' in settings && 'height' in settings ) {
				var selectedPropertys = core.object.selectProperty( settings, [ 'width', 'height']);

				press.css( selectedPropertys );

				_.prototype.press = output = press;
			}
		}

		return output;
	};

	return new _;
} ( window, jQuery ));