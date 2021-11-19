const getProperties = (token, list) => {
  if(list == -1){
    list = '1,2,3';
  }

  return fetch(`http://localhost:8080/service/property?propertyIdList=`+list,{
    method: 'get', 
    headers: new Headers({
      'Authorization': 'Bearer '+token
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar as propriedades')
    })
    .then(json => {
      return json
    })
}

export const propertyService = {
  getProperties
}
