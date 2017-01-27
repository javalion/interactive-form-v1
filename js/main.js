"use strict";
// JavaScript Document

function initialize() {
  // Setup Dynamic Fields
  setupDynamicFields();
  // Setup Event Handlers
  setupEventHandlers();
}

function setupDynamicFields() {
    // Setup Other Job Role Field
	var $otherJobRole = $('<label for="other-title">Other:</label> <input type="text" id="other-title" placeholder="Your Job Role">');
	$otherJobRole.hide();
	$('#title').after($otherJobRole);
}

function setupEventHandlers() {
	$('#title').on('change',handleJobRoleChange);
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

initialize();