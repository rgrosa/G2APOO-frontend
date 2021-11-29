import { profileService } from '../../service/profile_service.js';
const userType = sessionStorage.getItem("userTypeId");

const section = document.querySelector('[data-main-property]');

const render = async () => {
console.log(userType);
  if(userType == 1){
    section.innerHTML = ` <div class="row">  
    <div class="col-md my-3">
        <div class="form-group">
            <label for="formStatus">Status:</label>
            <select class="form-control" id="formStatus">
                <option value="1">Usuário</option>
            </select>
        </div>
    </div>
  </div>`
  }else if(userType == 2){
    section.innerHTML = ` <div class="row">  
    <div class="col-md my-3">
        <div class="form-group">
            <label for="formStatus">Status:</label>
            <select class="form-control" id="formStatus">
                <option value="1">Usuário</option>
                <option value="2">Dono</option>
            </select>
        </div>
    </div>
  </div>`

  }

}

document.getElementById('olho').addEventListener('mousedown', function () {
    document.getElementById('formPassword').type = 'text';
  });
  
  document.getElementById('olho').addEventListener('mouseup', function () {
    document.getElementById('formPassword').type = 'password';
  });
  
  document.getElementById('olho').addEventListener('mousemove', function () {
    document.getElementById('formPassword').type = 'password';
  });
  
  document.getElementById('olho2').addEventListener('mousedown', function () {
    document.getElementById('formConfirmPassword').type = 'text';
  });
  
  document.getElementById('olho2').addEventListener('mouseup', function () {
    document.getElementById('formConfirmPassword').type = 'password';
  });
  
  document.getElementById('olho2').addEventListener('mousemove', function () {
    document.getElementById('formConfirmPassword').type = 'password';
  });

document.getElementById('saveBtn').onclick = async () => {
    
    const token = sessionStorage.getItem("jwtToken");
    const jsonBody = makeFormJsonBody();
    const response = await profileService.postProfile(token, jsonBody);

    if(response.statusCode == 200){
        window.location.href = `./../../home.html`;
    }else if(response.statusCode == 200){
        window.alert("Senha informada não é está correta!");
    }
    else{
        window.alert("ERROR!");
    }
  };


 function makeFormJsonBody(){
    let errorName = "";

    let username = document.getElementById("formUsername").value;
    if(username == ""){
        errorName =  errorName + "- Error falta nome do usuário.\n"
    }
    let userRealName = document.getElementById("formRealname").value;
    if(userRealName == ""){
        errorName = errorName + "- Error falta o nome verdadeiro do usuário.\n";
    }

    let password = document.getElementById("formPassword").value;
    if(password == ""){
        errorName = errorName + "- Error falta senha.\n";
    }

    let email = document.getElementById("formEmailContact").value;
    if(email == ""){
        errorName = errorName + "- Error falta email.\n";
    }

    let confirmPassword = document.getElementById("formConfirmPassword").value;
    if(confirmPassword == ""){
        errorName = errorName + "- Error falta confirmação de senha.\n";
    }

    let status = document.getElementById('formStatus').value;

    if(errorName != ""){
        window.alert(errorName);
        return;
    }

    if(password != confirmPassword){
        window.alert("As duas senhas não são iguais!");
        return;
    }

     const jsonObject = {
        username: username,
        userRealName: userRealName,
        userPassword: password,
        userTypeId: status,
        contactEmail: email
    };

    return jsonObject;
  }


render();
