"use strict";
// JavaScript Document

function initialize() {
  // Setup Dynamic Fields
  setupDynamicFields();
  // Setup Event Handlers
  setupEventHandlers();
  // Only Display One Payment Option
  $("#payment").val('credit card');
  // Hide color control until a theme is selected.
  $("#colors-js-puns").hide();
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
		error = true;
	} else {
		$('#name').removeClass("error");
	}
	
	// Check EMail
	var email = $('#mail').val().trim();
    if (!/^[\w._]+@[\w]+\.[\w]+/.test(email)){
		$('#mail').addClass("error");
		error = true;
	} else {
		$('#mail').removeClass("error");
	}
	
	// Check Activities
	if ($(".activities input[type='checkbox']:checked").length === 0) {
		$(".activities").addClass("error");
		error = true;
	} else {
		$(".activities").removeClass("error");
	}
	
	// Check Credit Card
	if ($("#payment").val() === "credit card") {
		if(!/[0-9]{13,16}/.test($("#cc-num").val())) {
          $("#cc-num").addClass("error");
		  error = true;   
		} else {
			$("#cc-num").removeClass("error");
		}
		if (!/[0-9]{5}/.test($("#zip").val())){
			$("#zip").addClass("error");
			error = true;
		} else {
			$("#zip").removeClass("error");
		}
		
		if (!/[0-9]{3}/.test($("#cvv").val())) {
            $("#cvv").addClass("error");
			error = true;
		} else {
			$("#cvv").removeClass("error");
		}
	}
		
	if (error){
		evt.preventDefault();
	}
}

initialize();