$(document).ready(function() {
  var usuarioLogado = sessionStorage.getItem('token');
  if(sessionStorage.getItem('autorizacao')){
    var user_autorizacao = sessionStorage.getItem('autorizacao').split(',');
  }
  if (!usuarioLogado) {
    window.location.replace("index.html");
  }
  
  $.ajax({
    url: "http://localhost/Santri_test/api_santri/public/api/auth/usuarios",
    contentType: "application/json",
    type: "GET",
    dataType: "json",
    success: function(data) {
      table(data);  
    }
  })

  $('#add_user').click(function() {
    window.location.replace("cadastro_usuarios.html");
  })


  $('#lista_user').on('click', '#btn_excluir', function () {
    var id = $(this).attr("data-id");
    $.ajax({
      url: "http://localhost/Santri_test/api_santri/public/api/auth/delete",
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        'id': id
      }),
      success: function(data) {
        location.reload();
      }
    })
  });
  
  $('#lista_user').on('click', '#btn_editar', function () {
    var id = $(this).attr("data-id");
    window.location.replace("cadastro_usuarios.html?id=" +id);
  });

  $('#buscar_user').click(function () {
    var filter = $('#filter').val();
    buscarUser(filter)
  });

  function buscarUser(filter) {
    $.ajax({
      url: "http://localhost/Santri_test/api_santri/public/api/auth/busca",
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        'filter': filter
      }),
      success: function(data) {
        table(data);
      }
    })
  }

  function table(data) {
    var html = '';
    for(var index in data) {
      html += '<tr>'
      +'<td>'+data[index].nome_completo+'</td>'
      +'<td>'+data[index].login+'</td>'
      +'<td>'+data[index].ativo+'</td>'
      +'<td>'
          +(user_autorizacao.map(aut => {
            if(aut == 'excluir_clientes') {
              return "<button class='w3-button w3-theme w3-margin-top' id='btn_excluir' data-id="+data[index].usuario_id+"><i class='fas fa-user-times'></i></button>"
            }
            if(aut == 'editar_clientes') {
              return "<button class='w3-button w3-theme w3-margin-top' id='btn_editar' data-id="+data[index].usuario_id+"><i class='fas fa-edit'></i></button>"
            }
            
          }))
          +'</td>'
      +'</tr>'
  
  
      $('#lista_user').html(html);  
    } 
  }
});
