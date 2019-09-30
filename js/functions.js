function listarEmpregados() {
  let $target = $('table > tbody')
  $target.html('')

  axios
    .get('http://127.0.0.1/aulas-dsw/employees/php/listar.php')
    .then(function(response) {
      $target.html(montaEmpregados(response))
    })
    .catch(function(error) {
      $target.html(msgnErro(error))
    })
}

function montaEmpregados(response) {
  let html = []

  for (let index = 0; index < response.data.length; index++) {
    html.push(
      '<tr>' +
        '<td>' +
        '<span class="custom-checkbox">' +
        '<input type="checkbox" id "checkbox1" name="options[]" value="1" />' +
        '<label for="checkbox1"></label>' +
        '</span>' +
        '</td>' +
        '<td>' +
        response.data[index].nome +
        '</td>' +
        '<td>' +
        response.data[index].email +
        '</td>' +
        '<td>' +
        response.data[index].endereco +
        '</td>' +
        '<td>' +
        response.data[index].telefone +
        '</td>' +
        '<td>' +
        '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>' +
        '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>' +
        '</td>' +
        '</tr>'
    )
  }
  return html
}

function msgnErro(error) {
  return '<td>' + error + '</td>'
}
