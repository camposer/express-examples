$(document).ready(function() {
	$.ajax(getUsers);
	
	$('#addUser').button();
	$('#addUser').click(function() { 
		$('#dialog-form').dialog('open'); 
	});
	
	$("#dialog-form").dialog({
		autoOpen: false,
		height: 200,
		width: 350,
		modal: true,
		buttons: {
			'Add': function() {
				var name = $('#name').val();
				if (name) 
					$.ajax(addUser(name));
				
				$(this).dialog('close'); // Show errors to the user if error
			},
			'Cancel': function() {
				$(this).dialog('close');
			}
		}
	});
});

var getUsers = {
	type : 'GET',
	dataType : 'json',
	url : '/rest/users',
	success : function(data, textStatus, jqXHR) {
		if (data.length > 0) {
			$("#usersTemplate").tmpl(data).appendTo("#usersTable");
		} 
	},
	statusCode : {
		403 : function() {
			alert('something went wrong');
		}
	}
};

var addUser = function(name) {
	return {
		type : 'PUT',
		url : '/rest/users',
		data : { 'name' : name },
		success : function(data, textStatus, jqXHR) {
			$('#usersTable > tbody').html('');
			$.ajax(getUsers);
		},
		statusCode : { // TODO: Manage messages
			403 : function() {
				alert('something went wrong');
			},
			412 : function() {
				alert('some parameter is missing');
			}
		}
	};
}