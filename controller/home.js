import { propertyService } from '../service/property_service.js';

const userType = sessionStorage.getItem("userTypeId");
const token = sessionStorage.getItem("jwtToken");

const criarElemento = (e) => {

  const editBtn =  (userType == 2?makeEditBtn(e.propertyId):"");
  const div = document.createElement('div')
  const financed = (e.financed?"Sim":"Não");
  const ownerNamed = (e.ownerNamed?"Sim":"Não");
  const negotiable = (e.negotiable?"Sim":"Não");
  const price = ((e.lastPropertyPrice != null) && (e.propertyPrice < e.lastPropertyPrice) ? makePromo(e.propertyPrice, e.lastPropertyPrice):'R$'+e.propertyPrice);
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
                      <div>
                        <div>
                          <div class="gallery-img">
                            <img class="d-block w-100" src=${e.picture1x64}>
                          </div>
                          ${divImg2}
                          ${divImg3}
                          ${divImg4}
                          ${divImg5}
                        </div>
                      </div>
                      <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">Informações:</h4>
                        <p><small class="text-muted"><b>Atualizado em: ${formatDate} </b></small> </p>
                        </button>
                      </div>
                      <div>
                      <ul class="list-group">
                        <li class="list-group-item"><b>Preço:</b>${price}</li>
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
                      <div>
                        <button type="button" style="margin-top: 2px;" id="btn-alert" onclick="sendAlert(${e.propertyId})" class="btn btn-primary">Solicitar Proposta</button>
                      </div>
                      <div>
                      ${editBtn}
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
<a class="nav-link" href="./dados/profile.html">Perfil</a>
</li>
<li class="nav-item">
<a class="nav-link" href="./owner/register/user.html">Cadastrar Usuário</a>
</li>
<li class="nav-item px-3">
<a class="nav-link" href="../index.html" onclick="sessionStorage.clear()">Sair</a>
</li>`
headerProperty.innerHTML = conteudo;
}

const elementoHeader2= () => {
const conteudo = ` <li class="nav-item">
<a class="nav-link" href="./dados/profile.html">Perfil</a>
</li>
<li class="nav-item">
<a class="nav-link" href="./owner/dashboard_alert.html">Dashboard de Alertas</a>
</li>
<li class="nav-item">
<a class="nav-link" href="./owner/register/property.html">Cadastrar Propriedade</a>
</li>
<li class="nav-item">
<a class="nav-link" href="./owner/register/user.html">Cadastrar Usuário</a>
</li>
<li class="nav-item px-3">
<a class="nav-link" href="../index.html" onclick="sessionStorage.clear()">Sair</a>
</li>`
headerProperty.innerHTML = conteudo;
}

const section = document.querySelector('[data-main-property]');
const headerProperty = document.querySelector('[header-property]');

const render2= async() =>{
  if(userType == 2){
     elementoHeader2();
  }else{
     elementoHeader1();
  }
}

const render = async () => {

  let inputValueMin = document.getElementById('inputValueMin').value;
  let inputValueMax = document.getElementById('inputValueMax').value;
  $('#content-value').empty();
  const response = await propertyService.getProperties(token, document.getElementById('selectOption').value, inputValueMin, inputValueMax)

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
  return '<div class="gallery-img"> <img class="d-block w-100" '+src+'> </div>'; 
}

function makeEditBtn(propertyId){
  return '<hr><a href="./owner/register/property.html?id='+propertyId+'"><button class="btn btn-primary" type="button">Editar a propriedade</button></a>';
}

function caseStatus(status){
  switch (status) {
    case 1:
      return "Vendido";
    case 2:
      return "Alugado";
    case 3:
      return "Livre";
  }   
}

function makePromo(promoPrice, price){
  return "<x style='text-decoration: line-through;'>R$"+price+"</x> R$"+promoPrice;
}

document.getElementById('searchBtn').onclick = async () => {
  render();
};
render2();