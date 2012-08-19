/** 
* @fileOverview Index code-behind (express-examples/sqlite)
*
* @author Rodolfo Campos <camposer at gmail dot com>
* @version 1.0
*/

/**
 * Constants for use in userForm method (Add or Modify)
 */
var BUTTON_ADD_USER = 'Add user',
    BUTTON_MODIFY_USER = 'Modify user';


/**
 * Method to be executed when the document is ready (main method)
 */
$(document).ready(function() {
	// Retrieving users and rendering
	getUsers();

	// Initializing language selector
	$('#selectLanguageSelector').change(function() {
		$.ajax({
			type : 'POST',
			url : '/rest/setlanguage',
			data : {
				'lang' : $(this).val()
			},
			success : function(data, textStatus, jqXHR) {
				window.location.reload();
			}
		});
	});

	// Initializing btnAddUser button
	$('#btnAddUser').button();
	$('#btnAddUser').click(function() { 
		$('#divUserForm').dialog(userForm(BUTTON_ADD_USER)); // Have to specify which operation before openning the dialog
		$('#divUserForm').dialog('open'); 
	});

	// Initializing dialogs
	$('#divUserForm').dialog(userForm());
	$('#divDeleteUserConfirm').dialog(deleteUserConfirm());

	// Initializing texts (i18n) 
	i18n();
});

/**
 * Headers to be used by jQuery Template for compiling tblUsers header
 * @field
 */
var headers = {
	id: $.i18n._('Id'),
	name: $.i18n._('Name'),
	operation: $.i18n._('Operation')
};

/**
 * Retrieves users from REST API and fills tblUsers. While tblUsers is
 * compiled, links and behaviours for operations (modify and delete) are added.
 * - The data retrievement is made using jQuery, through an AJAX GET HTTP Request
 * - tblUsers is filled using jQuery Template
 * @function
 */
var getUsers = function() {
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/rest/users',
		success : function(data, textStatus, jqXHR) {
			if (data.length > 0) {
				$('#divUsers').html('');
				$('#tmplUsersTable').tmpl(headers).appendTo('#divUsers');
				$('#tmplUsersTr').tmpl(data).appendTo('#tblUsers > tbody');
				
				// Adding operations
				$.each($('#tblUsers > tbody > tr'), function(index, value) {
					// Modifying id anchor (modify operation)
					var name = $(':nth-child(2)', this).html();
					$(':nth-child(1) > a', this).attr('href', '#');
					$(':nth-child(1) > a', this).click(function () {
						var id = $(this).html();
						
						$('#divUserForm').dialog(userForm(BUTTON_MODIFY_USER, { id: id, name: name }));
						$('#divUserForm').dialog('open'); 						
					});

					
					// Modifying delete anchor (delete operation)
					$(':nth-child(3) > a', this).html($.i18n._('Delete').toLowerCase()); 
					$(':nth-child(3) > a', this).attr('href', '#'); 
					$(':nth-child(3) > a', this).attr('name', $(':nth-child(1) > a', this).html()); 
					$(':nth-child(3) > a', this).click(function () {
						$('#divDeleteUserConfirm').dialog(deleteUserConfirm(
								$(this).attr('name')
							)); 
						$('#divDeleteUserConfirm').dialog('open'); 
					});
				});
			} else {
				$('#divUsers').html('No data');
			}
		},
		statusCode : {
			403 : function() {
				alert('something went wrong');
			}
		}
	});
}

/**
 * Adds user using the specified name
 * - The user is added using jQuery, through an AJAX PUT HTTP Request
 * - If the AJAX call succeed getUsers method is invoked
 * @param {String} name User's name
 * @function
 */
var addUser = function(name) {
	$.ajax({
		type : 'PUT',
		url : '/rest/users',
		data : {
			'name' : name
		},
		success : function(data, textStatus, jqXHR) {
			getUsers();
		},
		statusCode : { // TODO: Manage messages
			403 : function() {
				alert('something went wrong');
			},
			412 : function() {
				alert('some parameter is missing');
			}
		}
	});
}

/**
 * Updates user for the specified id
 * - The user is updated using jQuery, through an AJAX POST HTTP Request
 * - If the AJAX call succeed getUsers method is invoked
 * @param {Integer} id User's id
 * @param {String} name User's name
 * @function
 */
var updateUser = function(id, name) {
	$.ajax({
		type : 'POST',
		url : '/rest/users',
		data : {
			'id' : id,
			'name' : name
		},
		success : function(data, textStatus, jqXHR) {
			getUsers();
		},
		statusCode : { // TODO: Manage messages
			403 : function() {
				alert('something went wrong');
			},
			412 : function() {
				alert('some parameter is missing');
			}
		}
	});
}

/**
 * Removes a user with the specified id
 * - The user is removed using jQuery, through an AJAX DELETE HTTP Request
 * - If the AJAX call succeed getUsers method is invoked
 * @param {Integer} id User's id
 * @function
 */
var deleteUser = function(id) {
	$.ajax({
		type : 'DELETE',
		url : '/rest/users',
		data : {
			'id' : id
		},
		success : function(data, textStatus, jqXHR) {
			getUsers();
		},
		statusCode : { // TODO: Manage messages
			403 : function() {
				alert('something went wrong');
			},
			412 : function() {
				alert('some parameter is missing');
			}
		}
	});
}

/**
 * Defines userForm dialog for adding or modifying users
 * @param {String} operation BUTTON_ADD_USER or BUTTON_MODIFY_USER
 * @param {Object} user User
 * @function
 */
var userForm = function(operation, user) { 
	// Defining buttons using eval for i18n support
	var buttons = {}; // Initializing object
	buttons[$.i18n._('Accept')] = function() {
		var name = $('#inptUserFormName').val();

		if (name && name.trim() != '') { 
			if (operation == BUTTON_ADD_USER)
				addUser(name);
			else 
				updateUser(user.id, name);
						
			$(this).dialog('close'); 
		} else { 
			$('#pUserFormError').addClass('ui-state-error');
			$('#pUserFormError').html($.i18n._('You have to specify a valid name'));
		}

		$('#inptUserFormName').val('');
	}; 

	buttons[$.i18n._('Cancel')] = function() {
		$('#inptUserFormName').val('');
		$(this).dialog('close');
	};


	return {
		title :  $.i18n._(operation),
		autoOpen : false,
		height : 250,
		width : 350,
		modal : true,
		open : function() {
			if (user && user.name) 
				$('#inptUserFormName').val(user.name); // Initializing with user.name if its provided
		},
		buttons : buttons
	};
}

/**
 * Defines deleteUserConfirm dialog for deleting users
 * @param {Integer} id User's id
 * @function
 */
var deleteUserConfirm = function(id) {
	// Defining buttons using eval for i18n support
	var buttons = {}; // Initializing object
	buttons[$.i18n._('Delete')] = function() {
		deleteUser(id);
		$(this).dialog('close');
	};

	buttons[$.i18n._('Cancel')] = function() {
		$(this).dialog('close');
	};

	return {
		title : $.i18n._('Delete user'),
		autoOpen : false,
		resizable : false,
		height : 220,
		width : 400,
		modal : true,
		buttons : buttons
	};
}

/**
 * Set HTML texts considering i18n
 * @param {Integer} id User's id
 * @function
 */
var i18n = function() {
	$('#btnAddUser').val($.i18n._(BUTTON_ADD_USER));
	$('#lblUserFormName').html($.i18n._('Name') + ':');
	$('#lblDeleteUserConfirm').html($.i18n._('The user will be permanently deleted and cannot be recovered. Are you sure?'));
}
