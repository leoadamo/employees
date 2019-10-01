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
				'<a value="' +
				element.id +
				'" href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>' +
				'<a onclick="excluiEmpregados(event)" href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" id="' +
				element.id +
				'" data-toggle="tooltip" title="Delete">&#xE872;</i></a>' +
				'</td>' +
				'</tr>'
		);
	});
	return html;
}

function msgnErro(error) {
	return '<td>' + error + '</td>';
}

function excluiEmpregados(event) {
	let id = JSON.stringify(event.target.id);

	axios
		.post('http://localhost/projects/employees/php/deletar.php', id)
		.then(function(response) {
			return response ? listarEmpregados() : false;
		})
		.catch(function(error) {
			console.log('Erro:' + error);
		});
}
