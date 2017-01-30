"use strict";
// JavaScript Document

function initialize() {
  // Setup Dynamic Fields
  setupDynamicFields();
  // Setup Event Handlers
  setupEventHandlers();
  // Only Display One Payment Option
  $("#payment").val('credit card');
  // Hide color control until a theme is selected
  $("#colors-js-puns").hide();
  // Add hints to page
  setupHints();
	
  // Fire the payment change to show only default payment section
  handlePaymentChange();
}

function setupDynamicFields() {
    // Setup Other Job Role Field
	var $otherJobRole = $('<label for="other-title">Other:</label> <input type="text" id="other-title" placeholder="Your Job Role">');
	$otherJobRole.hide();
	$('#title').after($otherJobRole);
	
	// Setup Activities Total Field
	var $totalDiv = $('<div id="totalDiv">Your Total: <span id="activitiesTotal"></span></div>');
	$totalDiv.hide();
	$('.activities').after($totalDiv);
}

function setupEventHandlers() {
	$('#mail').on('keyup', validateEmail);
	$('#title').on('change',handleJobRoleChange);
	$('#design').on('change',handleThemeChange);
	$('.activities input[type="checkbox"]').on('change',handleActivityChange);
	$('#payment').on('change',handlePaymentChange);
	$('button[type="submit"]').on('click',handleSubmit);
}

function setupHints() {
	setupHint("nameHint", "Name is required", "input#name");
	setupHint("emailRequiredHint", "Email is required", "#mail");
	setupHint("emailValidHint","Email must be valid", "#mail");
	setupHint("activitiesHint","1 activity must be selected", ".activities label:last-child");
    setupHint("ccRequiredHint","CC # is required", "#cc-num");
	setupHint("ccValidHint", "CC # must be valid", "#cc-num");
    setupHint("zipRequiredHint", "Zip is required", "#zip");	
	setupHint("zipValidHint", "Zip must be valid", "#zip");
	setupHint("cvvRequiredHint", "CVV is required", "#cvv");
	setupHint("cvvValidHint", "CVV must be valid", "#cvv");
}

function setupHint(id, description, target) {
	var $hint = $('<span id="' + id + '" class="hint">' + description + '</span>');
	$hint.hide();
	$(target).after($hint);

}

// ***************** Event Handlers ***********************
function handleJobRoleChange(){
	if (this.value === 'other') {
       // Show Other Job Role Field		
	   $('#other-title').show();
	} else {
	   // Hide Other Job Role Field
		$('#other-title').hide();
	}
}

function handleThemeChange() {
	$('#color option').hide();
	if (this.value === 'js puns') {
		$("#color option[value='cornflowerblue']").show();
		$("#color option[value='darkslategrey']").show();		
		$("#color option[value='gold']").show();	
		$("#color").val("cornflowerblue");
		$("#colors-js-puns").show();
	} else if (this.value === 'heart js') {
		$("#color option[value='tomato']").show();			
		$("#color option[value='steelblue']").show();		
		$("#color option[value='dimgrey']").show();	
		$("#color").val("tomato");
		$("#colors-js-puns").show();
	} else {
		$("#colors-js-puns").hide();
	}
}

function handleActivityChange() {
	var total = 0;
	if ($('.activities input[name="all"]').is(":checked")) {
		total += 200;
	}

	if ($('.activities input[name="js-frameworks"]').is(":checked")) {
		total += 100;
		$('.activities input[name="express"]').prop("disabled", true);
	} else {
		$('.activities input[name="express"]').prop("disabled", false);
	}
	
	if ($('.activities input[name="js-libs"]').is(":checked")) {
		total += 100;
		$('.activities input[name="node"]').prop("disabled", true);
	} else {
		$('.activities input[name="node"]').prop("disabled", false);
	}
	
	if ($('.activities input[name="express"]').is(":checked")) {
		total += 100;
		$('.activities input[name="js-frameworks"]').prop("disabled", true);
	} else {
		$('.activities input[name="js-frameworks"]').prop("disabled", false);
	}
	
	if ($('.activities input[name="node"]').is(":checked")) {
		total += 100;
		$('.activities input[name="js-libs"]').prop("disabled", true);
	} else {
		$('.activities input[name="js-libs"]').prop("disabled", false);
	}
	
	if ($('.activities input[name="build-tools"]').is(":checked")) {
		total += 100;
	}
	
	if ($('.activities input[name="npm"]').is(":checked")) {
		total += 100;
	}
	
	if (total > 0) {
		$('#activitiesTotal').html("$" + total);
		$('#totalDiv').show();
	}
	else {
		$('#totalDiv').hide();
	}
}

function handlePaymentChange() {
	var paymentType = $("#payment").val();
	if (paymentType === "credit card") {
		$("#paypal").hide();
		$("#bitcoin").hide();
		$("#credit-card").show();
	} else if (paymentType === "paypal") {
		$("#paypal").show();
		$("#bitcoin").hide();
		$("#credit-card").hide();
	} else if (paymentType === "bitcoin") {
		$("#paypal").hide();
		$("#bitcoin").show();
		$("#credit-card").hide();
	}
}

function handleSubmit(evt) {
	var error = false;
	
	// Check Name
	var name = $('#name').val().trim();
	if (name.length === 0) {
		$('#name').focus();
		$('#name').addClass("error");
		$('#nameHint').show();
		error = true;
	} else {
		$('#nameHint').hide();
		$('#name').removeClass("error");
	}
	
	// Check EMail
    validateEmail(true);	
	// Check Activities
	if ($(".activities input[type='checkbox']:checked").length === 0) {
		$(".activities").addClass("error");
		$("#activitiesHint").show();
		error = true;
	} else {
		$(".activities").removeClass("error");
		$("#activitiesHint").hide();
	}
	
	// Check Credit Card
	if ($("#payment").val() === "credit card") {
		if($("#cc-num").val().length === 0) {
          $("#cc-num").addClass("error");
		  $("#ccRequiredHint").show();
		  $("#ccValidHint").hide();			
		  error = true;
		} else if(!/[0-9]{16}/.test($("#cc-num").val())) {
          $("#cc-num").addClass("error");
		  $("#ccRequiredHint").hide();		
		  $("#ccValidHint").show();						
		  error = true;   
		} else {
		  $("#cc-num").removeClass("error");
		  $("#ccRequiredHint").hide();	
		  $("#ccValidHint").hide();						
		}
		
		
		if ($("#zip").val().length === 0){
			$("#zipRequiredHint").show();
			$("#zipValidHint").hide();			
			$("#zip").addClass("error");
			error = true;
		} else if (!/[0-9]{5}/.test($("#zip").val())){
			$("#zipRequiredHint").hide();
			$("#zipValidHint").show();			
			$("#zip").addClass("error");
			error = true;
		} else {
			$("#zipRequiredHint").hide();
			$("#zipValidHint").hide();			
			$("#zip").removeClass("error");
		}
		
		if ($("#cvv").val().length === 0) {
			$("#cvv").addClass("error");
			$("#cvvRequiredHint").show();
			$("#cvvValidHint").hide();			
		} else if (!/[0-9]{3}/.test($("#cvv").val())) {
            $("#cvv").addClass("error");
			$("#cvvRequiredHint").hide();	
			$("#cvvValidHint").show();			
			error = true;
		} else {
			$("#cvvRequiredHint").hide();
			$("#cvvValidHint").hide();			
			$("#cvv").removeClass("error");
		}
	}
		
	if (error){
		evt.preventDefault();
	}
}

function validateEmail(){
	var error = false;
		var email = $('#mail').val().trim();
	if (email.length === 0){
 		 $('#mail').addClass("error");
		 $('#emailRequiredHint').show();
		 $('#emailValidHint').hide();	
		 error = true;		
	} else if (!/^[\w._]+@[\w]+\.[\w]+/.test(email)){
		$('#mail').addClass("error");
		$('#emailRequiredHint').hide();
		$('#emailValidHint').show();	
		error = true;
	} else {
		$('#mail').removeClass("error");
		$('#emailRequiredHint').hide();
		$('#emailValidHint').hide();	
	}
	return error;
}

initialize();