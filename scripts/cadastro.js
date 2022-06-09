$(document).ready(function() {
  var usuarioLogado = sessionStorage.getItem('token');
  if (!usuarioLogado) {
    window.location.replace("index.html");
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
        'NOME_COMPLETO': nome,
        'ATIVO': ativo,
        'SENHA': senha,
        'LOGIN': login,
        'autorizacoes': chklista,
      }),
      success: function(data) {
        window.location.replace("pesquisa_usuarios.html");
      },
      statusCode: {
        422: function(data) {
          alert(data.responseJSON.message);
        }
      }
    })
  })
});