import { propertyService } from '../../service/property_service.js';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.getElementById('saveBtn').onclick = async () => {
    
    const token = sessionStorage.getItem("jwtToken");
    const userId = sessionStorage.getItem("userId");

    const jsonBody = await makeFormJsonBody(userId);
    const response = await propertyService.postProperty(token, jsonBody);

    window.location.reload(true);

  };


  async function makeFormJsonBody(userId){
    let errorName = "";

    let address = document.getElementById("formAddress").value;
    if(address == ""){
        errorName =  errorName + "- Error falta endereço.\n"
    }
    let price = document.getElementById("formPrice").value;
    if(price == ""){
        errorName = errorName + "- Error preço.\n";
    }

    let name = document.getElementById("formName").value;
    if(name == ""){
        errorName = errorName + "- Error nome.\n";
    }
    let email = document.getElementById("formEmail").value;
    if(email == ""){
        errorName = errorName + "- Error email.\n";
    }

    let cellphone = document.getElementById("formCell").value;
    if(cellphone == ""){
        errorName = errorName + "- Error cellphone.\n";
    }
    let isFinanced = document.getElementById('formFinanciado').value
    let isOwnedName = document.getElementById('formOwnedName').value
    let isNegotiable = document.getElementById('formNegotiable').value
    let status = document.getElementById('formStatus').value

    let pic1= document.getElementById('formPic1')['files'][0]
    if(pic1 == undefined){
        errorName = errorName + "- Error pic1.\n";
    }
    let pic2 = document.getElementById('formPic2')['files'][0]
    let pic3 = document.getElementById('formPic3')['files'][0]
    let pic4 = document.getElementById('formPic4')['files'][0]
    let pic5 = document.getElementById('formPic5')['files'][0]
 
    if(errorName != ""){
        window.alert(errorName);
        return;
    }

     const jsonObject = {
        propertyAddress: address,
        propertyPrice: price,
        userId: userId,
        propertyStatusId: status,
        propertyOwnerName: name,
        propertyOwnerEmail: email,
        propertyOwnerTel: cellphone,
        financed: isFinanced,
        ownerNamed: isOwnedName,
        negotiable: isNegotiable,
        picture1x64: await toBase64(pic1),
        picture2x64: pic2 !=null? await toBase64(pic2): null,
        picture3x64: pic3 !=null? await toBase64(pic3): null,
        picture4x64: pic4 !=null? await toBase64(pic4): null,
        picture5x64: pic5 !=null? await toBase64(pic5): null
    };

    return jsonObject;
  }

