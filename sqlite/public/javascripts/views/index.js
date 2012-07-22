$(document).ready(function() {
	// Retrieving users
	getUsers();

	// Initializing addUser button
	$('#addUser').button();
	$('#addUser').click(function() { 
		$("#userForm").dialog(userForm('Add')); // Have to specify which operation before openning the dialog
		$('#userForm').dialog('open'); 
	});

	// Initializing dialogs
	$("#userForm").dialog(userForm());
	$("#deleteUserConfirm").dialog(deleteUserConfirm());
});

var getUsers = function() {
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/rest/users',
		success : function(data, textStatus, jqXHR) {
			if (data.length > 0) {
				$("#usersContainer").html('');
				$("#usersTableTemplate").tmpl(null).appendTo("#usersContainer");				
				$("#usersTrTemplate").tmpl(data).appendTo("#usersTable > tbody");
				
				// Adding operations
				$.each($("#usersTable > tbody > tr"), function(index, value) {
					// Modifying id anchor
					var name = $(':nth-child(2)', this).html();
					$(':nth-child(1) > a', this).attr('href', '#');
					$(':nth-child(1) > a', this).click(function () {
						var id = $(this).html();
						
						$("#userForm").dialog(userForm('Modify', { id: id, name: name }));
						$('#userForm').dialog('open'); 						
					});
					
					// Modifying delete anchor
					$(':nth-child(3) > a', this).attr('href', '#'); 
					$(':nth-child(3) > a', this).attr('name', $(':nth-child(1) > a', this).html()); // User id stores into name anchor's property  
					$(':nth-child(3) > a', this).click(function () {
						$("#deleteUserConfirm").dialog(deleteUserConfirm(
								$(this).attr('name')
							)); 
						$('#deleteUserConfirm').dialog('open'); 
					});
				});
			} else {
				$("#usersContainer").html('No data');
			}
		},
		statusCode : {
			403 : function() {
				alert('something went wrong');
			}
		}
	});
}

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

var userForm = function(operation, user) { // This id can be managed with a hidden field, but I think this way is "cleanner"
	return {
		title : operation + ' user',
		autoOpen : false,
		height : 250,
		width : 350,
		modal : true,
		open : function() {
			if (user && user.name) 
				$('#userFormName').val(user.name); // Initializing with user.name if its provided
		},
		buttons : {
			'Accept' : function() {
				var name = $('#userFormName').val();
				
				if (name && name.trim() != '') {
					if (operation=='Add') 
						addUser(name);						
					else
						updateUser(user.id, name);
						
					$(this).dialog('close');
				} else {
					$('#userFormError').addClass('ui-state-error');
					$('#userFormError').html(
							'You have to specify a valid name');
				}

				$('#userFormName').val('');
			},
			'Cancel' : function() {
				$('#userFormName').val('');
				$(this).dialog('close');
			}
		}
	};
};

var deleteUserConfirm = function(id) {
	return {
		autoOpen : false,
		resizable : false,
		height : 220,
		width : 400,
		modal : true,
		buttons : {
			"Delete" : function() {
				deleteUser(id);
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		}
	};
}