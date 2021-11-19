import { autenticacaoService } from '../service/autenticacao_service.js'
const formulario = document.querySelector('[data-form]')


document.getElementById('olho').addEventListener('mousedown', function () {
  document.getElementById('senha').type = 'text';
});

document.getElementById('olho').addEventListener('mouseup', function () {
  document.getElementById('senha').type = 'password';
});

document.getElementById('olho').addEventListener('mousemove', function () {
  document.getElementById('senha').type = 'password';
});

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  try {
    const userTypeIdUser = 1;//default user
    const usuario = evento.target.querySelector('#usuario').value
    const senha = evento.target.querySelector('#senha').value

    const token = await autenticacaoService.autenticarUsuario(usuario, senha)
    const userTypeId = token.additionalInfo.userTypeId;
    const userId = token.additionalInfo.userId;
    sessionStorage.setItem('jwtToken', token.additionalInfo.jwtToken);
    sessionStorage.setItem('userTypeId', userTypeId);

    if (userTypeId == userTypeIdUser) {
      window.location.href = `views/user/home.html?id=${userId}`
    }else{
      window.location.href = `views/owner/home.htmll?id=${userId}`
    }
  }
  catch (erro) {
    console.log(erro)
  }
})