const getProfile = (token) => {
    return fetch(`http://localhost:8080/service/user`,{
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer '+token
      })
    })
      .then(resposta => {
        return resposta.json()
      })
      .then(json => {
        return json
      })
  }

  const putProfile = (token, json) => {


    return fetch(`http://localhost:8080/service/user-update`,{
      method: 'post', 
      body: json,
      headers: new Headers({
        'Authorization': 'Bearer '+token,
        'Content-Type':'application/json'
      })
      
    })
      .then(resposta => {
        return resposta.json();
      })
      .then(json => {
        return json
      })
  }

  const postProfile = (token, json) => {
    return fetch(`http://localhost:8080/service/user`,{
      method: 'post', 
      body: JSON.stringify(json),
      headers: new Headers({
        'Authorization': 'Bearer '+token,
        'Content-Type':'application/json'
      })
      
    })
      .then(resposta => {
        return resposta.json();
      })
      .then(json => {
        return json
      })
  }
  
  export const profileService = {
    getProfile,
    putProfile,
    postProfile
  }
  