import { profileService } from '../../service/profile_service.js';

const render = async () => {
  const token = sessionStorage.getItem("jwtToken");
  console.log(token);
  const response = await profileService.getProfile(token);
  console.log(response);

  document.getElementById("idUsuario").value = response.additionalInfo.username;
  document.getElementById("idRealName").value =  response.additionalInfo.userRealName;
  

}

document.getElementById('updateBtn').onclick = async () => {
    
    const token = sessionStorage.getItem("jwtToken");
    const userId = sessionStorage.getItem("userId");
    const jsonBody = '{"username":"'+document.getElementById("idUsuario").value+'","userRealName":"'+document.getElementById("idRealName").value+'","userPassword":"'+document.getElementById("senha").value+'","currentUserPassword":"'+document.getElementById("currentSenha").value+'","userId":"'+userId+'"}';
    const response = await profileService.putProfile(token, jsonBody);

    if(response.statusCode == 200){
        window.location.href = `../../index.html`;
    }else if(response.statusCode == 200){
        window.alert("Senha informada não é está correta!");
    }
    else{
        window.alert("ERROR!");
    }
  };

render();
