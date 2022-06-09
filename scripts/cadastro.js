$(document).ready(function() {
  var usuarioLogado = sessionStorage.getItem('token');

  if (!usuarioLogado) {
    window.location.replace("index.html");
  }
  var url = window.location.href;

  var id_user = url.split('?');

  var id = '';

  if(id_user[1]){
    var id = id_user[1].split('=');
    
    $.ajax({
      url: "http://localhost/Santri_test/api_santri/public/api/auth/user",
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        'id': id[1]
      }),
      success: function(data) {
        console.log(data);
        $('#nome').val(data[0].NOME_COMPLETO);
        $('#login').val(data[0].LOGIN);
        $('#ativo').val(data[0].ATIVO);
        $('#senha').val(data[0].SENHA);

        data[0].autorizacoes.map(aut => {
          if(aut.CHAVE_AUTORIZACAO == 'cadastrar_clientes'){
            $('#opt_cadastrar_clientes').find('input').prop('checked', true);
          }
          if(aut.CHAVE_AUTORIZACAO == 'excluir_clientes'){
            $('#opt_excluir_clientes').find('input').prop('checked', true);
          }
          if(aut.CHAVE_AUTORIZACAO == 'editar_clientes'){
            $('#opt_editar_clientes').find('input').prop('checked', true);
          }
        })
        
      }
    })
  }

  $("#b_gravar").click(function() {
    var nome = $('#nome').val();
    var login = $('#login').val();
    var senha = $('#senha').val();
    var ativo = $('#ativo').val();

    var chklista = $('input[name="check"]:checked').toArray().map(function(check) { 
      return $(check).val(); 
    });

    $.ajax({
      url: "http://localhost/Santri_test/api_santri/public/api/auth/register",
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        'USUARIO_ID': id[1],
        'NOME_COMPLETO': nome,
        'ATIVO': ativo,
        'SENHA': senha,
        'LOGIN': login,
        'autorizacoes': chklista,
      }),
      success: function(data) {
        alert(data.message);
        sessionStorage.setItem('autorizacao', chklista);
        window.location.replace("pesquisa_usuarios.html");
      },
      statusCode: {
        422: function(data) {
          alert(data.responseJSON.message);
        }
      }
    })
  })

  $('#cancelar').click(function() {
    window.location.replace("pesquisa_usuarios.html");
  })
});