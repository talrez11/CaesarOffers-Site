/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {

	//Pre select UK
	$("option[value='220']").attr('selected','selected');

	function fading() {
		var offerHeading = $('div.table_wrap h2');
		offerHeading
			.fadeOut(500)
			.fadeIn(500);
	}

	setInterval(fading, 1000);

	//Redirect users to 2nd step
		$('form').on('dialog-show', function(success) {
			if (success) {
				// get data from server and redirect
				new Communicator('offers')
					.on_success(function(lead_id) {
						// register Google AdWords conversion
						var google_conversion_id = 962137208;
						var google_conversion_label = "rJh8COPexlgQ-JjkygM";
						image = new Image(1,1);

						image.addEventListener('load', function() {
							window.location.replace('http://my.caesartrade.com/AccountSignup/API?liveLeadID='+lead_id);
						});

						image.src = 'http://www.googleadservices.com/pagead/conversion/' + google_conversion_id + '/?label=' + google_conversion_label + '&script=0&guid=ON';
					})
					.get('json_get_account_id');

				// prevent dialog from showing
				return false;
			}
		});

};


// connect document `load` event with handler function
$(Site.on_load);
