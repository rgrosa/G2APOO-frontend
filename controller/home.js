import { propertyService } from '../service/property_service.js';

const criarElemento = (e) => {

  const div = document.createElement('div')
  const financed = (e.financed?"Sim":"Não");
  const ownerNamed = (e.ownerNamed?"Sim":"Não");
  const negotiable = (e.negotiable?"Sim":"Não");
  const status = caseStatus(e.propertyStatusId);
  const divImg2= (e.picture2x64?makeDivPic(e.picture2x64):"\n");
  const divImg3= (e.picture3x64?makeDivPic(e.picture3x64):"\n");
  const divImg4= (e.picture4x64?makeDivPic(e.picture4x64):"\n");
  const divImg5= (e.picture5x64?makeDivPic(e.picture5x64):"\n");
  const formatDate = moment(new Date(e.updatedAt)).format('DD/MM/YY HH:mm:ss');
  const conteudo = `
            <article class="col" id=${e.propertyId}>
                <div class="card">
                    <img class="img-thumbnail" src="${e.picture1x64}"
                        class="card-img-top" style="height: 12rem; object-fit: cover; object-position: center;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${e.propertyAddress}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <div>
                            <button type="button" style="width: 100%;display: block;" class="btn btn-primary" data-toggle="modal" data-target="#modal${e.propertyId}"> Mais Informações</button>
                          </div>
                        </li>
                    </ul>

                  </div>
                  <div class="modal fade" id="modal${e.propertyId}" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">${e.propertyAddress}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img class="d-block w-100" src=${e.picture1x64}>
                          </div>
                          ${divImg2}
                          ${divImg3}
                          ${divImg4}
                          ${divImg5}
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="sr-only"></span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="sr-only"></span>
                        </a>
                      </div>
                      <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">Informações:</h4>
                        <p><small class="text-muted"><b>Atualizado em: ${formatDate} </b></small> </p>
                        </button>
                      </div>
                      <div>
                      <ul class="list-group">
                        <li class="list-group-item"><b>Preço: </b>${e.propertyPrice} R$</li>
                        <li class="list-group-item"><b>Estado da propriedade: </b>${status}</li>
                        <li class="list-group-item"><b>Nome do Responsavel: </b>${e.propertyOwnerName}</li>
                        <li class="list-group-item"><b>Email do Responsavel: </b>${e.propertyOwnerEmail}</li>
                        <li class="list-group-item"><b>Telefone do Responsavel: </b>${e.propertyOwnerTel}</li>
                        <li class="list-group-item"><b>Propriedade financiada: </b>${financed}</li>
                        <li class="list-group-item"><b>No nome do dono: </b>${ownerNamed}</li>
                        <li class="list-group-item"><b>Negociavel: </b>${negotiable}</li>
                      </ul>
                      </div>
                      <div class="modal-body">
                      <h4>Solicitar Proposta:</h4>
                      <div>
                        <textarea id="propose" style="border-width:1px;border-color: lightgray;border-style: solid;" rows="3" cols="40"></textarea>
                        <button type="button" style="margin-top: 2px;" class="btn btn-primary">Enviar</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
            </article>
                  `
  div.innerHTML = conteudo
  return div
}
const elementoHeader1 = () => {
const conteudo = ` <li class="nav-item">
<a class="nav-link" href="./dados/profile.html"><b>Perfil</b></a>
</li>
<li class="nav-item px-3">
<a class="nav-link" href="../index.html" onclick="sessionStorage.clear()"><small>Sair</small></a>
</li>`
headerProperty.innerHTML = conteudo;
}

const elementoHeader2= () => {
const conteudo = ` <li class="nav-item">
<a class="nav-link" href="./dados/profile.html">Perfil</a>
</li>
<li class="nav-item">
<a class="nav-link" href="./owner/register/property.html">Cadastrar propriedade</a>
</li>
<li class="nav-item">
<a class="nav-link" href="./owner/register/user.html">Cadastrar Usuário</a>
</li>
<li class="nav-item px-3">
<a class="nav-link" href="../index.html" onclick="sessionStorage.clear()"><small>Sair</small></a>
</li>`
headerProperty.innerHTML = conteudo;
}

const section = document.querySelector('[data-main-property]');
const headerProperty = document.querySelector('[header-property]');

const render2= async() =>{
  const userType = sessionStorage.getItem("userTypeId");

  if(userType == 2){
    headerProperty.appendChild(elementoHeader2());
  }else{
    headerProperty.appendChild(elementoHeader1());
  }

}

const render = async () => {
  const token = sessionStorage.getItem("jwtToken");

  const response = await propertyService.getProperties(token,-1)

  if(response.additionalInfo.length != 0){
    response.additionalInfo.forEach( e =>{
      section.appendChild(criarElemento(e));
    }
    )
  }else {
    section.textContent = "Sem dado";
  }
}

function makeDivPic(pictureBase64x){
  const src = "src='"+pictureBase64x+"'";
  return '<div class="carousel-item"> <img class="d-block w-100" '+src+'> </div>'; 
}

function caseStatus(status){
  switch (status) {
    case 0:
      return "Vendido";
    case 1:
      return "Alugado";
    case 2:
      return "Livre";
  }   
}

document.getElementById('selectOption').onchange = async () => {
  $('#content-value').empty();

  const token = sessionStorage.getItem("jwtToken");
  const response = await propertyService.getProperties(token, document.getElementById('selectOption').value);

  if(response.additionalInfo.length != 0){
    response.additionalInfo.forEach( e =>{
      section.appendChild(criarElemento(e));
    }
    )
  }else {
    section.textContent = "Sem dado";
  }
};

render2();
render();
