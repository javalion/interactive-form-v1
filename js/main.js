"use strict";
// JavaScript Document

function initialize() {
  // Setup Dynamic Fields
  setupDynamicFields();
  // Setup Event Handlers
  setupEventHandlers();
  // Only Display One Payment Option
  $("#payment").val('credit card');
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
	} else {
		$("#color option[value='tomato']").show();			
		$("#color option[value='steelblue']").show();		
		$("#color option[value='dimgrey']").show();	
		$("#color").val("tomato");
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
		alert("Name is required");
		error = true;
	} 
	
	// Check EMail
	var email = $('#mail').val().trim();
    if (!/^[\w._]+@[\w]+\.[\w]+/.test(email)){
		alert("A valid email is required");
		error = true;
	}
	
	// Check Activities
	if ($(".activities input[type='checkbox']:checked").length === 0) {
		alert("Atleast 1 activity must be selected");
		error = true;
	}
	
	// Check Credit Card
	if ($("#payment").val() === "credit card") {
		if(!/[0-9]{13,16}/.test($("#cc-num").val())) {
		  alert("Invalid Credit Card #");
		  error = true;   
		}
		if (!/[0-9]{5}/.test($("#zip").val())){
			alert("Invalid Zip Code");
			error = true;
		}
		
		if (!/[0-9]{3}/.test($("#cvv").val())) {
			alert("Invalid Security Code");
			error = true;
		}
	}
		
	
	if (error){
		evt.preventDefault();
	}
}

initialize();