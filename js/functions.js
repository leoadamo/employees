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
			Main.cache.table.on('click', '.edit', () => {
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

			$('.modal-footer').on('click', '.btn-insert-employee', e => {
				Main.functions.insereEmpregados(e);
			});
		},
		functions: {
			listarEmpregados: () => {
				const $target = Main.cache.table.find('tbody');
				$target.html('');

				axios
					.get(Main.cache.server + 'listar.php')
					.then(response => {
						$target.html(Main.functions.montaEmpregados(response.data));
					})
					.catch(error => {
						$target.html(Main.functions.msgnErro(error));
					});
			},
			montaEmpregados: response => {
				let html = [];
				response.forEach(element => {
					html.push(
						`<tr>
						<td>
						<span class="custom-checkbox">
						<input type="checkbox" id "checkbox1" name="options[]" value="1" />
						<label for="checkbox1"></label>
						</span>
						</td>
						<td>${element.nome}</td>
						<td>${element.email}</td>
						<td>${element.endereco}</td>
						<td>${element.telefone}</td>
						<td>
						<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-id="${element.id}"<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
						<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons delete-employee" data-id="${element.id}" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
						</tr>`
					);
				});
				return html;
			},
			modalExclui: id => {
				const $target = $('#deleteEmployeeModal');
				let html = `<div class="modal-dialog">
					 		<div class="modal-content">
								<form id="delForm">
									<div class="modal-header">
										<h4 class="modal-title">Deletar Registro</h4>
										<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									</div>
									<div class="modal-body">
										<p>Você está certo de que deseja excluir o funcionário?</p>
										<p class="text-warning"><small>Esta ação não poderá ser desfeita.</small></p>
									</div>
									<div class="modal-footer">
										<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
										<input type="submit" class="btn btn-danger" value="Delete" data-id="${id}"/>
									</div>
								</form>
							</div>
						</div>
					</div>`;
				$target.html(html);
			},
			excluiEmpregados: id => {
				const $target = $('#deleteEmployeeModal');
				let key = JSON.stringify(id);

				axios
					.post(Main.cache.server + 'deletar.php', key)
					.then(function(response) {
						if (response.status === 200) {
							$target.modal('toggle');
							Main.functions.listarEmpregados();
						} else return false;
					})
					.catch(function(error) {
						console.log('Erro na Requisição: ' + error);
					});
			},
			buscaEmpregado: id => {
				let busca = JSON.stringify(id);

				axios.post(Main.cache.server + 'buscar.php', busca).then(response => {
					if (response.status === 200) {
						Main.functions.modalEdita(response.data);
					} else return false;
				});
			},
			msgnErro: error => {
				return '<td>' + error + '</td>';
			},
			modalEdita: response => {
				let $target = $('#editEmployeeModal');
				let html = [];
				response.forEach(element => {
					html.push(
						'<div class="modal-dialog">' +
							'<div class="modal-content">' +
							'<form class="form">' +
							'<div class="modal-header">' +
							'<h4 class="modal-title">Editar Empregado</h4>' +
							'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
							'</div>' +
							'<div class="modal-body">' +
							'<div class="form-group">' +
							'<label>Nome</label>' +
							'<input type="text" class="form-control" required value="' +
							element.nome +
							'" />' +
							'</div>' +
							'<div class="form-group">' +
							'<label>Email</label>' +
							'<input type="email" class="form-control" required value="' +
							element.email +
							'"/>' +
							'</div>' +
							'<div class="form-group">' +
							'<label>Endereço</label>' +
							'<textarea class="form-control" required value="' +
							element.endereco +
							'"></textarea>' +
							'</div>' +
							'<div class="form-group">' +
							'<label>Telefone</label>' +
							'<input type="text" class="form-control" required value="' +
							element.telefone +
							'"/>' +
							'</div>' +
							'</div>' +
							'<div class="modal-footer">' +
							'<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar" />' +
							'<input type="submit" class="btn btn-info" value="Salvar" />' +
							'</div>' +
							'</form>' +
							'</div>' +
							'</div>'
					);
					$target.html(html);
				});
			},
			insereEmpregados: event => {
				event.preventDefault();
				const $target = $('#addEmployeeModal');
				const $addForm = $('#addForm');
				let empregados = $addForm.serializeArray();
				let data = {};

				$(empregados).each((i, obj) => {
					data[obj.name] = obj.value;
				});

				axios
					.post(Main.cache.server + 'inserir.php', data)
					.then(response => {
						if (response.status === 200) {
							$target.modal('toggle');
							Main.functions.listarEmpregados();
							$addForm.each(function() {
								this.reset();
							});
						}
					})
					.catch(function(error) {
						console.log('Erro na Requisição: ' + error);
					});
			}
		}
	};
	Main.init.call();
});
