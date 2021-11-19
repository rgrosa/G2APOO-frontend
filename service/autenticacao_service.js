const autenticarUsuario = (usuario, senha) => {
  return fetch(`http://localhost:8080/service/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: usuario,
      userSecret: senha
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível realizar a autenticação')
    })
    .then(json => {
      return json
    })
}


export const autenticacaoService = {
  autenticarUsuario,
}
