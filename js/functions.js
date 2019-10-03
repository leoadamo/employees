$(function() { // Testar com load		
	var Main = {
		init : () => {
			Main.functions.listarEmpregados.call();
			Main.bind.call();
		},
		cache : {
			table : $('.table'),
			server : 'http://localhost/projects/employees/php/'
		},
		bind : () => {
			Main.cache.table.on('click', '.edit', () => {
				let id = this.data('id');
				Main.functions.buscaEmpregado(id);
			})
			
			Main.cache.table.on('click', '.delete', () => {
				let id = this.data('id');
				Main.functions.modalExclui(id);
			})

			$('body').on('click', '.btn-insert-employee', (e) => {
				Main.functions.insereEmpregados(e)
			});
			
		},
		functions : {
			listarEmpregados : () => {
				const $target = Main.cache.table.find('tbody');
				
				$target.html('');
				
				axios
				.get(Main.cache.server + 'listar.php')
				.then((response) => {
					$target.html(montaEmpregados(response.data));
				})
				.catch((error) => {
					$target.html(msgnErro(error));
				});
			},
			buscaEmpregado : (id) => {
				let busca = JSON.stringify(id);
				
				axios
				.post('http://localhost/projects/employees/php/buscar.php', busca)
				.then((response) => {
					if (response.status === 200) {
						Main.functions.modalEdita(response.data);
					} else return false;
				})
			},
			modalExclui : (id) => {
				const $target = $('#deleteEmployeeModal');
				
				let html =
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
			},
			montaEmpregados : (response) => {
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
						<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-id="${element.id}" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
						</tr>`
					);
				});
				return html;
			},
			msgnErro : (error) => {
				return '<td>' + error + '</td>';
			},
			modalEdita : (response) => {
				let $target = $('#editEmployeeModal');
				let html = [];
				response.forEach(element => {
					html.push(
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
						'<input type="text" class="form-control" required value="' + element.nome + '" />' +
						'</div>' +
						'<div class="form-group">' +
						'<label>Email</label>' +
						'<input type="email" class="form-control" required value="' + element.email + '"/>' +
						'</div>' +
						'<div class="form-group">' +
						'<label>Endereço</label>' +
						'<textarea class="form-control" required value="' + element.endereco + '"></textarea>' +
						'</div>' +
						'<div class="form-group">' +
						'<label>Telefone</label>' +
						'<input type="text" class="form-control" required value="' + element.telefone + '"/>' +
						'</div>' +
						'</div>' +
						'<div class="modal-footer">' +
						'<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar" />' +
						'<input type="submit" class="btn btn-info" value="Salvar" onclick="editaEmpregados(' +
						element.id +
						')"/>' +
						'</div>' +
						'</form>' +
						'</div>' +
						'</div>'
						);
						
						$target.html(html);
				})
			},
			insereEmpregados : (event) => {
				event.preventDefault();

				const $target = $('#addEmployeeModal');
				const nome = $('#nome').val();
				const email = $('#email').val();
				const endereco = $('#endereco').val();
				const telefone = $('#telefone').val();
				let empregado = JSON.stringify({ nome, email, endereco, telefone });
				
				axios
				.post('http://localhost/projects/employees/php/inserir.php', empregado)
				.then((response) => {
					if (response.status === 200) {
						$('.formularioInsere').each(() => {
							this.reset();
						});
						$target.modal('toggle');
						listarEmpregados();
					}
				})
				.catch(function (error) {
					console.log('Erro na Requisição: ' + error);
				});
			},
			excluiEmpregados : (id, event) => {
				event.preventDefault();
				
				const $target = $('#deleteEmployeeModal');
				let key = JSON.stringify(id);
				
				axios
				.post('http://localhost/projects/employees/php/deletar.php', key)
				.then(function (response) {
					if (response.status === 200) {
						$target.modal('toggle');
						listarEmpregados();
					} else return false;
				})
				.catch(function (error) {
					console.log('Erro na Requisição: ' + error);
				});
			}
		}
	}
	
	Main.init.call();
});