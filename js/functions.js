function listarEmpregados() {
	const $target = $('table > tbody');
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
				'"<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>' +
				'<a onclick="modalExclui(' +
				element.id +
				')" href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>' +
				'</td>' +
				'</tr>'
		);
	});
	return html;
}

function msgnErro(error) {
	return '<td>' + error + '</td>';
}

function modalExclui(id) {
	const $target = $('#deleteEmployeeModal');

	html =
		'<div class="modal-dialog">' +
		'<div class="modal-content">' +
		'<form class="formularioInsere">' +
		'<div class="modal-header">' +
		'<h4 class="modal-title">Deletar Registro</h4>' +
		'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<p>Você está certo de que deseja excluir o funcionário?</p>' +
		'<p class="text-warning"><small>Esta ação não poderá ser desfeita.</small></p>' +
		'</div>' +
		'<div class="modal-footer">' +
		'<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />' +
		'<input onclick="excluiEmpregados(' +
		id +
		', event)" type="submit" class="btn btn-danger" value="Delete" />' +
		'</div>' +
		'</form>' +
		'</div>' +
		'</div>' +
		'</div>';

	$target.html(html);
}

function excluiEmpregados(id, event) {
	event.preventDefault();

	const $modal = $('#deleteEmployeeModal');
	const $body = $('body');
	const $overlay = $('.modal-backdrop');
	let key = JSON.stringify(id);

	axios
		.post('http://localhost/projects/employees/php/deletar.php', key)
		.then(function(response) {
			if (response.status === 200) {
				listarEmpregados();
				$body.removeClass('modal-open');
				$modal.css('display', 'none');
				$modal.removeClass('in');
				$overlay.remove();
			} else return false;
		})
		.catch(function(error) {
			console.log('Erro na Requisição: ' + error);
		});
}

function insereEmpregados(event) {
	event.preventDefault();

	const $modal = $('#addEmployeeModal');
	const $body = $('body');
	const $overlay = $('.modal-backdrop');
	const nome = $('#nome').val();
	const email = $('#email').val();
	const endereco = $('#endereco').val();
	const telefone = $('#telefone').val();
	let empregado = JSON.stringify({ nome, email, endereco, telefone });

	axios
		.post('http://localhost/projects/employees/php/inserir.php', empregado)
		.then(function(response) {
			if (response.status === 200) {
				$('.formularioInsere').each(function() {
					this.reset();
				});
				listarEmpregados();
				$body.removeClass('modal-open');
				$modal.css('display', 'none');
				$modal.removeClass('in');
				$overlay.remove();
			}
		})
		.catch(function(error) {
			console.log('Erro na Requisição: ' + error);
		});
}

function modalEdita(event) {
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
		'<input type="submit" class="btn btn-info" value="Salvar" id="' +
		id +
		'"/>' +
		'</div>' +
		'</form>' +
		'</div>' +
		'</div>';

	$target.html(html);
}
