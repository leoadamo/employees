function listarEmpregados() {
	let $target = $('table > tbody');
	$target.html('');

	axios
		.get('http://localhost/projects/employees/php/listar.php')
		.then(function(response) {
			$target.html(montaEmpregados(response.data));
		})
		.catch(function(error) {
			$target.html(msgnErro(error));
		});
}

function montaEmpregados(response) {
	let html = [];

	response.forEach(element => {
		html.push(
			'<tr>' +
				'<td>' +
				'<span class="custom-checkbox">' +
				'<input type="checkbox" id "checkbox1" name="options[]" value="1" />' +
				'<label for="checkbox1"></label>' +
				'</span>' +
				'</td>' +
				'<td>' +
				element.nome +
				'</td>' +
				'<td>' +
				element.email +
				'</td>' +
				'<td>' +
				element.endereco +
				'</td>' +
				'<td>' +
				element.telefone +
				'</td>' +
				'<td>' +
				'<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>' +
				'<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>' +
				'</td>' +
				'</tr>'
		);
	});
	return html;
}

function msgnErro(error) {
	return '<td>' + error + '</td>';
}
