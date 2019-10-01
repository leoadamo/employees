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
				'<a value="' +
				element.id +
				'" href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>' +
				'</td>' +
				'</tr>'
		);
	});
	return html;
}

function msgnErro(error) {
	return '<td>' + error + '</td>';
}

function excluiEmpregados() {
	let data = {};
}

function insereEmpregados(){
	const nome = $('#nome').val();
	const email = $('#email').val();
	const endereco = $('#endereco').val();
	const telefone = $('#telefone').val();

	let empregado = JSON.stringify({nome, email, endereco, telefone});
	console.log(empregado);
	axios
		.post ('http://localhost/projects/employees/php/inserir.php', empregado)
		.then(function(response) {
			if (response) {
				$('.formularioInsere').each (function() {
					this.reset();
				});
				listarEmpregados();
			}
		})
		.catch(function(error) {
			console.log(error);
		});
}