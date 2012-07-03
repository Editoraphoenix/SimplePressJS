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
		jQuery: $,
		win: this.jQuery( win ),
		press: this.jQuery('.press'),
		mask: this.jQuery('.press .mask'),
		slide: this.jQuery('.press .mask .slide'),
		stamp: this.jQuery('.stamp'),
        controls: this.jQuery('.navigation'),
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
			mask = self.mask,
			slide = self.slide,
            controls = self.controls,
            slideCurrentPointer = 0,
            slideCurrentPosition = 0,
            changeSpace = 1175;

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
			options.pressDimensions['position'] = 'relative';
			options.pressDimensions['overflow'] = 'hidden';
			// Space betweem slides
			options.slideSpace = (function ( defaultValue ) {
				var output = defaultValue;
				var option = core.object.selectProperty( settings.slide, [
					'spaceBetween',
				]);

				if ( option ) {
					output = option[ 'spaceBetween' ];
				}

				return output;
			} ( 10 ));
			// Mask dimensions based on slide
			options.maskDimensions = core.object.selectProperty(
				settings.slide, [
					'width',
				]
			);
			options.maskDimensions['minWidth'] = ( options.maskDimensions.width.replace('px', '') + options.slideSpace ) * slide.length;
			options.maskDimensions['height'] = '100%';
			options.maskDimensions['position'] = 'relative';
			options.maskDimensions['overflow'] = 'hidden';
			// Dimensions of slide
			options.slideDimensions = core.object.selectProperty(
				settings.slide, [
					'width',
					'height'
				]
			);
			
            options.slideDimensions['float'] = 'left';
			options.slideDimensions['margin'] = '0 ' + options.slideSpace + 'px';

            

			if ( options.pressDimensions && options.maskDimensions && options.slideDimensions ) {
				// Add style to press
				press.css( options.pressDimensions );
				// Add style to mask based on slide
				mask.css( options.maskDimensions );
				// Add style to slide
				slide.css( options.slideDimensions );
            
                // Control for slide
                controls.find('.back').on('click', function () {
                    slideCurrentPointer -= 1;
                    if ( slideCurrentPointer >= 0 ) {
                        slideCurrentPosition += changeSpace;
                        mask.animate({
                            left:  slideCurrentPosition + 'px',
                        });
                    } if ( slideCurrentPointer <= 0 ) {
                        slideCurrentPointer = 0;    
                    } 
                });
                
                controls.find('.next').on('click', function () {
                    slideCurrentPointer += 1;
                    if ( slideCurrentPointer < slide.length || slideCurrentPointer === ( slide.length - 1 ) ) {
                        slideCurrentPosition -= changeSpace;
                        mask.animate({
                            left: slideCurrentPosition + 'px',
                        });
                    } if ( slideCurrentPointer > ( slide.length - 1 ) ) {
                        slideCurrentPointer = ( slide.length - 1 );    
                    }
                    console.log( slideCurrentPointer );
                });

                $('html').on('keypress', function ( e ) {
                	if ( e.keyCode === 98 ) {
                		controls.find('.back').delay( 700 ).trigger('click');
                	} if ( e.keyCode === 110 ) {
                		controls.find('.next').delay( 700 ).trigger('click');
                	}
                });

				output = true;
			}
		}

		return output;
	};

	return new _;
} ( window, jQuery ));
