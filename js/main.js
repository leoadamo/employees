$(() => {
	var Main = {
		init: () => {
			Main.functions.listarEmpregados.call();
			Main.bind.call();
		},
		cache: {
			table: $('.table'),
			server: 'http://localhost/projects/employees/php/'
		},
		bind: () => {
			$('.modal-footer').on('click', '.btn-insert-employee', e => {
				Main.functions.insereEmpregados(e);
			});

			Main.cache.table.on('click', '.edit-employee', function() {
				let edit = $(this).data('id');
				Main.functions.buscaEmpregado(edit);
			});

			Main.cache.table.on('click', '.delete-employee', function() {
				let id = $(this).data('id');
				Main.functions.modalExclui(id);
				$('#delForm').on('click', '.btn-danger', function(e) {
					e.preventDefault();
					let key = $(this).data('id');
					Main.functions.excluiEmpregados(key);
				});
			});
		},
		functions: {
			listarEmpregados: () => {
				const $target = Main.cache.table.find('tbody');
				$target.html('');

				$.ajax({
					type: 'GET',
					url: Main.cache.server + 'listar.php',
					dataType: 'json',
					success: response => {
						$target.html(Main.functions.montaEmpregados(response));
					},
					error: (xhr, thrownError) => {
						console.log(`Erro na Requisição:\nStatus: ${xhr.status}`);
						console.log(`Erro: ${thrownError}`);
					}
				});
			},
			montaEmpregados: response => {
				let html = [];
				$.each(response, (i, element) => {
					html.push(
						`<tr>
						<td>
						<!-- -->
						</td>
						<td>${element.nome}</td>
						<td>${element.email}</td>
						<td>${element.endereco}</td>
						<td>${element.telefone}</td>
						<td>
						<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons edit-employee" data-id="${element.id}" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
						<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons delete-employee" data-id="${element.id}" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
						</tr>`
					);
				});
				return html;
			},
			modalExclui: id => {
				const $target = $('#deleteEmployeeModal .btn-danger');

				$target.attr('data-id', id);
			},
			excluiEmpregados: id => {
				const $target = $('#deleteEmployeeModal');
				let key = JSON.stringify(id);

				$.ajax({
					type: 'POST',
					url: Main.cache.server + 'deletar.php',
					data: key,
					contentType: 'application/json; charset=utf-8;',
					success: () => {
						$target.modal('toggle');
						Main.functions.listarEmpregados();
					},
					error: (xhr, thrownError) => {
						console.log(`Erro na Requisição:\nStatus: ${xhr.status}`);
						console.log(`Erro: ${thrownError}`);
					}
				});
			},
			buscaEmpregado: id => {
				let busca = JSON.stringify(id);

				$.ajax({
					type: 'POST',
					url: Main.cache.server + 'buscar.php',
					data: busca,
					dataType: 'json',
					success: response => {
						Main.functions.modalEdita(response);
						$('#updtForm').on('click', '.update-employee', function(e) {
							e.preventDefault();
							let key = $(this).data('id');
							Main.functions.atualizaEmpregados(key);
						});
					},
					error: (xhr, thrownError) => {
						console.log(`Erro na Requisição:\nStatus: ${xhr.status}`);
						console.log(`Erro: ${thrownError}`);
					}
				});
			},
			modalEdita: response => {
				const $target = $('#editEmployeeModal');
				let html = [];

				$.each(response, (i, element) => {
					html.push(
						`<div class="modal-dialog">
							<div class="modal-content">
								<form id="updtForm">
									<div class="modal-header">
										<h4 class="modal-title">Editar Empregado</h4>
										<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									</div>
									<div class="modal-body">
										<input type="hidden" name="id" value="${element.id}" />
										<div class="form-group">
											<label>Nome</label>
											<input type="text" class="form-control" name="nome" required value="${element.nome}" />
										</div>
										<div class="form-group">
											<label>Email</label>
											<input type="email" class="form-control" name="email" required value="${element.email}"/>
										</div>
										<div class="form-group">
											<label>Endereço</label>
											<input class="form-control" name="endereco" required value="${element.endereco}" />
										</div>
										<div class="form-group">
											<label>Telefone</label>
											<input type="text" class="form-control" name="telefone" required value="${element.telefone}"/>
										</div>
									</div>
									<div class="modal-footer">
										<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar" />
										<input type="submit" class="btn btn-info update-employee" value="Salvar" />
									</div>
								</form>
							</div>
						</div>`
					);
					$target.html(html);
				});
			},
			atualizaEmpregados: () => {
				const $target = $('#editEmployeeModal');
				const $updateForm = $('#updtForm');
				let values = $updateForm.serializeArray();
				let formData = {};

				$(values).each((i, obj) => {
					formData[obj.name] = obj.value;
				});

				$.ajax({
					type: 'POST',
					url: Main.cache.server + 'editar.php',
					data: JSON.stringify(formData),
					contentType: 'application/json; charset=utf-8;',
					success: () => {
						$target.modal('toggle');
						Main.functions.listarEmpregados();
						$updateForm.each(function() {
							this.reset();
						});
					},
					error: (xhr, thrownError) => {
						console.log(`Erro na Requisição:\nStatus: ${xhr.status}`);
						console.log(`Erro: ${thrownError}`);
					}
				});
			},
			insereEmpregados: event => {
				event.preventDefault();
				const $target = $('#addEmployeeModal');
				const $addForm = $('#addForm');
				let employees = $addForm.serializeArray();
				let formData = {};

				$(employees).each((i, obj) => {
					formData[obj.name] = obj.value;
				});

				$.ajax({
					type: 'POST',
					url: Main.cache.server + 'inserir.php',
					data: JSON.stringify(formData),
					contentType: 'application/json; charset=utf-8;',
					success: () => {
						$target.modal('toggle');
						Main.functions.listarEmpregados();
						$addForm.each(function() {
							this.reset();
						});
					},
					error: (xhr, thrownError) => {
						console.log(`Erro na Requisição:\nStatus: ${xhr.status}`);
						console.log(`Erro: ${thrownError}`);
					}
				});
			},
			msgnErro: error => {
				return '<td>' + error + '</td>';
			}
		}
	};
	Main.init.call();
});
