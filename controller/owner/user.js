import { profileService } from '../../service/profile_service.js';


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
        userTypeId: status
    };

    return jsonObject;
  }


render();
