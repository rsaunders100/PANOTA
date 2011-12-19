// App by Robert Saunders
// rsaunders.co.uk

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
	
	// Start of by provising an innitial caclulation based on the defaults
	reCalculate();
	
	// Enable tooltips
	$(".infoimage[title]").tooltip({ position: "center left"});	
	
	
	function handelChcekBoxChange(jQCheckbox) {
		
		var sublist = jQCheckbox.parent().parent().find(".sublist");
		
		// If checked
		if (jQCheckbox.is(":checked"))
		{
			// Show the hidden sub-div
			sublist.show("fast");
			
			// Check the first radio button
			sublist.find("input[type=radio]").first().attr('checked', true);
		}
		else
		{
			// Otherwise, hide it,
			sublist.hide("fast");
			
			// Un-check all the radio buttons
			sublist.find("input[type=radio]").attr('checked', false);
		}
		
		reCalculate();
	}
	
	// Add onclick handler to all checkboxs
  $("input[type=checkbox]").click(function(e) {
	
		// Stop the event from triggering twice
		e.stopPropagation();
		
		// Handle the change
		handelChcekBoxChange($(this));
  });
	
	$(".checkbox-row").click(function(e) {
		
		// Stop the event from triggering twice
		e.stopPropagation();
		
		// Toggle the checked state and handle change
		var jQCheckBox = $(this).find('input')
		jQCheckBox.attr('checked', !jQCheckBox.is(":checked"))
		handelChcekBoxChange($(this).find('input'));
	});
	
	// TODO CLICK ROWS TO TOGGLE CHECKBOX
	
	//
	// Methods to recalculate when the form changes
	//
	
	$("input[type=radio]").click(function(e) {
		
		// Stop the event from triggering twice
		e.stopPropagation();
		
		reCalculate();
	});
	$(".radio-row").click(function(e) {
		
		// Stop the event from triggering twice
		e.stopPropagation();
		
		// Toggle the checked state and handle change
		$(this).find('input').attr('checked', true)
		
		reCalculate();
	});
	$("input[type=text]").blur(function() {
		reCalculate();
	});
	$("input[type=text]").keypress(function(e) {
	  if (e.keyCode == '13') {
	     e.preventDefault();
	     reCalculate();
	   }
	});

	function reCalculate() {
		
		// Grab the data from the input
		var formHash = $('form').serializeArray();
		
		// Turn this into a simple model
		var model = new Object();
		jQuery.each(formHash, function(i, field){
      model[field.name] = field.value;
    });
		
		//console.log(model);
		
		// Will track the total number of days to build the app
		var days = 0;
		
		// This will be a mutiplication factor on the number of views in the app 
		// Any sort of complexity that will scale with the number of views 
		// should add to this number
		var viewsScaleFactor = 1.0;
		
		// Add a fixed abount for dev overhead, building uploading, setting up accounts etc...
		days += 1.0;
		
		
		//
		// Go thorugh form element and increase the estimate based 
		// on the options chosen.
		// If the if the parent X option is unchecked then the 
		// X-type option will be undefined therefore will not count
		//
		
		switch (model.platform) {
			case('iphone'): break; // No effect
			case('ipad'):
				days += 0.2;
				viewsScaleFactor += 0.15; 
			 	break;
			case('universal'): 
				days += 0.8;
				viewsScaleFactor += 0.7;
				break;
			default: break;
		}
		
		switch (model.target) {
			case('fourOrHigher'): break; // No effect
			case('lowerThanFour'):
				days += 0.6;
				viewsScaleFactor += 0.1; 
			 	break;
			default: break;
		}
		
		switch (model.orientation) {
			case('one'): break; // No effect
			case('mix'):
				days += 0.6;
				viewsScaleFactor += 0.05; 
			 	break;
			case('all'): 
				days += 0.8;
				viewsScaleFactor += 0.20;
				break;
			default: break;
		}
		
		switch (model.feeds) {
			case('none'): break; // No effect
			case('thirdParty'):
				days += 1.7;
			 	break;
			case('inHouseFeeds'): 
				days += 2.5;
				break;
			default: break;
		}
		
		switch (model['advert-type']) {
			case('iad'):
				days += 0.8;
				break;
			case('other-banner'):
				days += 1.2;
				break;
			case('interstitial'):
				days += 1.4;
				break;
			case('video'):
				days += 2.0;
				break;
			default: break;
		}
		
		switch (model['notification-type']) {
			case('local'):
				days += 0.6;
				break;
			case('push'):
				days += 1.8;
				break;
			default: break;
		}
		
		switch (model['mapView-type']) {
			case('simple'):
				days += 0.3;
				break;
			case('complex'):
				days += 0.7;
				break;
			case('offline'):
				days += 3.0;
				break;
			default: break;
		}
		
		switch (model['custon-ui-type']) {
			case('simple'):
				days += 0.3;
				break;
			case('complex'):
				days += 0.7;
				viewsScaleFactor += 0.1;
				break;
			default: break;
		}
		
		switch (model['caching-type']) {
			case('simple'):
				days += 0.6;
				break;
			case('complex'):
				days += 1.6;
				break;
			default: break;
		}
		
		switch (model['facebook-type']) {
			case('post'):
				days += 0.6;
				break;
			case('get'):
				days += 1.1;
				break;
			case('complex'):
				days += 1.5;
				break;
			default: break;
		}
		
		switch (model['twitter-type']) {
			case('post'):
				days += 0.5;
				break;
			case('get'):
				days += 1.0;
				break;
			case('complex'):
				days += 1.3;
				break;
			default: break;
		}
		
		if (model.email == 'yes') {
			days += 0.2;
		}
		
		if (model.camera == 'yes') {
			days += 0.2;
		}
		
		if (model.motion == 'yes') {
			days += 0.6;
		}
		
		switch (model['animation-type']) {
			case('simple'):
				days += 0.2;
				break;
			case('complex'):
				days += 0.7;
				break;
			default: break;
		}
		
		switch (model['video-type']) {
			case('simple'):
				days += 0.2;
				break;
			case('complex'):
				days += 0.7;
				break;
			default: break;
		}
		
		switch (model['audio-type']) {
			case('simple'):
				days += 0.2;
				break;
			case('complex'):
				days += 0.7;
				break;
			default: break;
		}
		
		// Lastly account for the number of views
		// The number of views should be a positive number 
		// if not we revert to the value 1 and update the view accordingly
		var numViews = parseInt(model.numViews);
		if (isNaN(numViews) || numViews <= 0) 
		{	
			numViews = 1;
			$("input[name=numViews]").attr('value', "1");
		}		 
		days += (numViews * 0.75 * viewsScaleFactor);
		
		//console.log("Days to complete: " + days);
		
		// Round to 1 d.p.
		var daysStr = "" + (Math.round(days * 10) / 10);
		if (daysStr.indexOf('.') == -1) daysStr += '.0';
		
		$(".result-days").html(daysStr);
		
	}
		
});