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

const postProperty = async (token, jsonBody) => {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(jsonBody),
    redirect: 'follow'
  };

fetch("http://localhost:8080/service/property", requestOptions)
    .then(resposta => {
      if (resposta.ok) {
        return resposta;
      }
      return resposta;
    })
    .then(json => {
      return json
    });
}

const getPropertyById = (token, id) => {

  return fetch(`http://localhost:8080/service/property?propertyIdList=1,2,3&propertyId=`+id,{
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
  getProperties,
  postProperty,
  getPropertyById
}
