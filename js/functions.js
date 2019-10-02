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
				'<a onclick = "modalEdita(event)" href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" id="' +
				element.id +
				'"data-toggle="tooltip" title="Edit">&#xE254;</i></a>' +
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

function insereEmpregados() {
	const nome = $('#nome').val();
	const email = $('#email').val();
	const endereco = $('#endereco').val();
	const telefone = $('#telefone').val();
	const empregado = JSON.stringify({ nome, email, endereco, telefone });

	axios
		.post('http://localhost/projects/employees/php/inserir.php', empregado)
		.then(function(response) {
			if (response.status === 200) {
				$('.formularioInsere').each(function() {
					this.reset();
				});
				listarEmpregados();
			}
		})
		.catch(function(error) {
			console.log(error);
		});
}

function modalEdita(event){
	let id = event.target.id;
	let $target = $('#editEmployeeModal');
	
	let html = 
		'<div class="modal-dialog">' +
			'<div class="modal-content">' +
				'<form>' +
					'<div class="modal-header">' +
						'<h4 class="modal-title">Editar Empregado</h4>' +
						'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
					'</div>' +
					'<div class="modal-body">' +
						'<div class="form-group">' +
							'<label>Nome</label>' +
							'<input type="text" class="form-control" required />' +
						'</div>' +
						'<div class="form-group">' +
							'<label>Email</label>' +
							'<input type="email" class="form-control" required />' +
						'</div>' +
						'<div class="form-group">' +
							'<label>Endereço</label>' +
							'<textarea class="form-control" required></textarea>' +
						'</div>' +
						'<div class="form-group">' +
							'<label>Telefone</label>' +
							'<input type="text" class="form-control" required />' +
						'</div>' +
					'</div>' +
					'<div class="modal-footer">' +
						'<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar" />' +
						'<input type="submit" class="btn btn-info" value="Salvar" id="' + id + '"/>' +
					'</div>' +
				'</form>' +
			'</div>' +
		'</div>';

		$target.html(html);
}

function editaEmpregados() {
}
