const getAlerts = (token, list) => {
    if(list == -1){
        list = '1,2,3';
      }
      let url = `http://localhost:8080/service/alert?alertTypeList=`+list;

      
      return fetch(url,{
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
  
  
  export const dashboardAlertService = {
    getAlerts,
  }
  