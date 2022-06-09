$(document).ready(function() {
  var usuarioLogado = sessionStorage.getItem('token');
  if (usuarioLogado) {
    window.location.replace("pesquisa_usuarios.html");
  }

  $("#button").click(function() {
    var usuario = $('#usuario').val();
    var password = $('#password').val();

    $.ajax({
      url: "http://localhost/Santri_test/api_santri/public/api/auth/login",
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        'LOGIN': usuario,
        'SENHA': password,
      }),
      success: function(data) {
        sessionStorage.setItem('token', data.token);
        var autorizacoes = [];
        autorizacoes = data.user.autorizacoes.map(val => {
          return val.CHAVE_AUTORIZACAO;
        })
        sessionStorage.setItem('autorizacao', autorizacoes);
        window.location.replace("pesquisa_usuarios.html");
      },
      statusCode: {
        401: function(data) {
          alert(data.responseJSON.message);
        }
      }
    })
  })
});