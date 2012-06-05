var SimplePress = (function ( win, $ ) {
	/*
		Make presentations using SimplePress, easy and fastly.
		@author <a href="mailto:kaique.developer@gmail.com">kaique.developer@gmail.com</a>
	*/
	var _ = function () {};

	var core = {
		object: {},
	};

	core.object.selectProperty = function ( target, selections ) {
		/*
			Select itens in object, by key in the @array: selections,
			using the @variable: target.
		*/
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
		win: win,
		jQuery: $,
		press: this.jQuery('.press'),
		mask: this.jQuery('.press .mask'),
		slide: this.jQuery('.press .mask .slide'),
		stamp: this.jQuery('.stamp'),
	};

	_.prototype.start = function ( settings ) {
		/*
			Start behavior of presentation
		*/
		var output = false,
			self = this,
			options = {},
			settings = settings || {},
			stamp = self.stamp,
			press = self.press,
			slide = self.slide;

		if ( settings ) {
			// Apply lettering js 
			stamp.lettering();
			// Demensions of presentation
			options.pressDimensions = core.object.selectProperty( 
				settings.holder, [
					'width', 
				 	'height',
				]
			);
			// Dimensions of slide
			options.slideDimensions = core.object.selectProperty(
				settings.slide, [
					'width',
					'height'
				]
			);

			if ( options.pressDimensions && options.slideDimensions ) {
				// Add style to press
				press.css( options.pressDimensions );
				// Add style to slide
				slide.css( options.slideDimensions );

				output = true;
			}
		}

		return output;
	};

	return new _;
} ( window, jQuery ));