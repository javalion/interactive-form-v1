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
	$('#title').on('change',handleJobRoleChange);
	$('#design').on('change',handleThemeChange);
	$('.activities input[type="checkbox"]').on('change',handleActivityChange);
	$('#payment').on('change',handlePaymentChange);
	$('button[type="submit"]').on('click',handleSubmit);
}

function setupHints() {
	var $nameHint = $('<span id="nameHint" class="hint">A name is required</span>');
	$nameHint.hide();
	$("input#name").after($nameHint);
	
	var $emailHint1 = $('<span id="emailRequiredHint" class="hint">An email is required</span>');
	$emailHint1.hide();
	$("input#mail").after($emailHint1);
	var $emailHint2 = $('<span id="emailValidHint" class="hint">Email must be valid</span>');
	$emailHint2.hide();
	$("input#mail").after($emailHint2);

	var $activitiesHint = $('<span id="activitiesHint" class="hint">Atleast one activity must be selected</span>');
	$activitiesHint.hide();
	$(".activities label:last-child").after($activitiesHint);

	var ccRequiredHint = $('<span id="ccRequiredHint" class="hint">CC # is required</span>');
	ccRequiredHint.hide();
	$("#cc-num").after(ccRequiredHint);
	
	var ccValidHint = $('<span id="ccValidHint" class="hint">CC # must be valid</span>');
	ccValidHint.hide();
	$("#cc-num").after(ccValidHint);
	
	var zipRequiredHint = $('<span id="zipRequiredHint" class="hint">Zip is required</span>');
	zipRequiredHint.hide();
	$("#zip").after(zipRequiredHint);
	
	var zipValidHint = $('<span id="zipValidHint" class="hint">Zip must be valid</span>');
	zipValidHint.hide();
	$("#zip").after(zipValidHint);

	var cvvRequiredHint = $('<span id="cvvRequiredHint" class="hint">CVV is required</span>');
	cvvRequiredHint.hide();
	$("#cvv").after(cvvRequiredHint);

	var cvvValidHint = $('<span id="cvvValidHint" class="hint">CVV must be valid</span>');
	cvvValidHint.hide();
	$("#cvv").after(cvvValidHint);
	
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
		} else if(!/[0-9]{13,16}/.test($("#cc-num").val())) {
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
			$("#zipValidHint").show();			
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

initialize();