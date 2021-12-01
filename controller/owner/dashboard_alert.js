import { dashboardAlertService } from '../../service/dashboard_alert_service.js';

const section = document.querySelector('[data-main-property]');
const userType = sessionStorage.getItem("userTypeId");
const token = sessionStorage.getItem("jwtToken");

const criarElemento1 = (e) => {
    const div = document.createElement('div')
    const email =  e.emailContact != null? makeEmailTag(e.emailContact):"";
    const formatDate = moment(new Date(e.lastUpdate)).format('DD/MM/YY HH:mm:ss');
    const conteudo = `
              <article class="col" id=${e.alertId}>
              <div class="card">
              <div class="card-header bg-primary">
              <b>${e.alertName}: ${e.propertyAddress} </b>
              </div>
              <div class="card-body" style="border-style:solid;border-width:1px">
                <h5 class="card-title">Mensagem: ${e.alertMessage} </h5>
                <p class="card-text">Usuário ${e.userRealName} realizou a solicitação em ${formatDate} ${email}</p>
                <button type="button" onClick="apagarAlerta(${e.alertId})" class="btn btn-primary">Clique aqui para remover o alerta</button>
              </div>
            </div>
              </article>
                    `
    div.innerHTML = conteudo
    return div
  }

  const criarElemento2 = (e) => {
    const div = document.createElement('div')
    const email =  e.emailContact != null? makeEmailTag(e.emailContact):"";
    const formatDate = moment(new Date(e.lastUpdate)).format('DD/MM/YY HH:mm:ss');
    const conteudo = `
              <article class="col" id=${e.alertId}>
              <div class="card">
              <div class="card-header bg-warning">
              <b>${e.alertName} </b>
              </div>
              <div class="card-body" style="border-style:solid;border-width:1px">
                <h5 class="card-title">Mensagem: ${e.alertMessage} </h5>
                <p class="card-text">Usuário ${e.userRealName} realizou a solicitação em ${formatDate} ${email}</p>
                <button type="button" onClick="apagarAlerta(${e.alertId})" class="btn btn-warning">Clique aqui para ignorar a solicitação</button><button style="margin-left: 5px;" type="button" onClick="aprovarUsuario(${e.alertId}, '${e.alertMessage}')" class="btn btn-warning">Clique aqui para aprovar o usuário</button>
              </div>
            </div>
              </article>
                    `
    div.innerHTML = conteudo
    return div
  }

  const criarElemento3 = (e) => {
    const div = document.createElement('div')
    const formatDate = moment(new Date(e.lastUpdate)).format('DD/MM/YY HH:mm:ss');
    const conteudo = `
              <article class="col" id=${e.alertId}>
              <div class="card">
              <div class="card-header bg-danger">
              <b>${e.alertName}: ${e.propertyAddress} </b>
              </div>
              <div class="card-body" style="border-style:solid;border-width:1px">
                <h5 class="card-title">Mensagem: ${e.alertMessage} </h5>
                <p class="card-text">Usuário ${e.userRealName} realizou a solicitação em ${formatDate}</p>
                <button type="button" onClick="apagarAlerta(${e.alertId})" class="btn btn-danger">Clique aqui para remover o alerta</button><button style="padding-left: 5px;"> <a href="./register/property.html?id=${e.propertyId}" class="btn btn-danger">Ir para o cadastro</a></button>
              </div>
            </div>
              </article>
                    `
    div.innerHTML = conteudo
    return div
  }

  const render = async () => {
    $('#content-value').empty();
    const response = await dashboardAlertService.getAlerts(token, document.getElementById('selectOption').value)
  
    if(response.additionalInfo.length != 0){
      response.additionalInfo.forEach( e =>{
          if(e.alertTypeId == 1){
            section.appendChild(criarElemento1(e));
          }else if(e.alertTypeId == 3){
            section.appendChild(criarElemento3(e));
          } else if(e.alertTypeId == 2){
            section.appendChild(criarElemento2(e));
          }
      }
      )
    }else {
      section.textContent = "Sem alertas no momento  &#128512;";
    }
  }

  function makeEmailTag(email){
    return 'entre em contato pelo email <a href="mailto:'+email+'"> '+email+'</a>'
  }

  document.getElementById('searchBtn').onclick = async () => {
    render();
  };