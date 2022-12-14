import { profileService } from '../../service/profile_service.js';

document.getElementById('olho').addEventListener('mousedown', function () {
  document.getElementById('senha').type = 'text';
});

document.getElementById('olho').addEventListener('mouseup', function () {
  document.getElementById('senha').type = 'password';
});

document.getElementById('olho').addEventListener('mousemove', function () {
  document.getElementById('senha').type = 'password';
});

document.getElementById('olho2').addEventListener('mousedown', function () {
  document.getElementById('currentSenha').type = 'text';
});

document.getElementById('olho2').addEventListener('mouseup', function () {
  document.getElementById('currentSenha').type = 'password';
});

document.getElementById('olho2').addEventListener('mousemove', function () {
  document.getElementById('currentSenha').type = 'password';
});


const render = async () => {
  const token = sessionStorage.getItem("jwtToken");
  console.log(token);
  const response = await profileService.getProfile(token);
  console.log(response);

  document.getElementById("idUsuario").value = response.additionalInfo.username;
  document.getElementById("idRealName").value =  response.additionalInfo.userRealName;
  document.getElementById("emailContact").value = response.additionalInfo.emailContact;

}

document.getElementById('updateBtn').onclick = async () => {
    
    const token = sessionStorage.getItem("jwtToken");
    const userId = sessionStorage.getItem("userId");
    const jsonBody = '{"username":"'+document.getElementById("idUsuario").value+'","userRealName":"'+document.getElementById("idRealName").value+'","userPassword":"'+document.getElementById("senha").value+'","currentUserPassword":"'+document.getElementById("currentSenha").value+'","userId":"'+userId+', "emailContact":"'+document.getElementById("emailContact").value+'"}';
    const response = await profileService.putProfile(token, jsonBody);

    if(response.statusCode == 200){
        window.location.href = `../../index.html`;
    }else if(response.statusCode == 200){
        window.alert("Senha informada n??o ?? est?? correta!");
    }
    else{
        window.alert("ERROR!");
    }
  };

render();
