import { propertyService } from '../../service/property_service.js';

const token = sessionStorage.getItem("jwtToken");
const userType = sessionStorage.getItem("userTypeId");
const userId = sessionStorage.getItem("userId");
const url = window.location.href.split("?")[1];
let pic1G;
let pic2G;
let pic3G;
let pic4G;
let pic5G;

const render = async () => {
    
    if(userType == 2 && url != undefined){
        let id = parseInt(url.split("=")[1]);
        const response = await propertyService.getPropertyById(token, id)
        const json = response.additionalInfo;
        document.getElementById("formAddress").value = json.propertyAddress;
        document.getElementById("formPrice").value = json.propertyPrice;
        document.getElementById("formName").value = json.propertyOwnerName;
        document.getElementById("formEmail").value = json.propertyOwnerEmail;
        document.getElementById("formCell").value = json.propertyOwnerTel;
        document.getElementById('formFinanciado').value = json.financed;
        document.getElementById('formOwnedName').value = json.ownerNamed;
        document.getElementById('formNegotiable').value = json.negotiable;
        document.getElementById('formStatus').value = json.propertyStatusId;

        pic1G = json.picture1x64;
        pic2G = json.picture2x64;
        pic3G = json.picture3x64;
        pic4G = json.picture4x64;
        pic5G = json.picture5x64;

        document.getElementById("img1").src = pic1G != null?pic1G:"";
        document.getElementById('img2').src = pic2G != null?pic2G:"";
        document.getElementById('img3').src = pic3G != null?pic3G:"";
        document.getElementById('img4').src = pic4G != null?pic4G:"";
        document.getElementById('img5').src = pic5G != null?pic5G:"";
    }
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.getElementById('saveBtn').onclick = async () => {
    
    const jsonBody = await makeFormJsonBody(userId);
    const response = await propertyService.postProperty(token, jsonBody);
    resetPage();
  };


  async function makeFormJsonBody(userId){
    let errorName = "";
    let jsonObject;

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
    if(pic1 == undefined && url == undefined){
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

    if(url == undefined){
        jsonObject= {
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
    }else{
        jsonObject= {
            propertyId: parseInt(url.split("=")[1]),
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
            picture1x64: pic1 !=null? await toBase64(pic1): pic1G,
            picture2x64: pic2 !=null? await toBase64(pic2): pic2G,
            picture3x64: pic3 !=null? await toBase64(pic3): pic3G,
            picture4x64: pic4 !=null? await toBase64(pic4): pic4G,
            picture5x64: pic5 !=null? await toBase64(pic5): pic5G
        };
    }

    return jsonObject;
  }

  function resetPage() {
    setTimeout(function () {
        window.location.href = `./../../home.html`;
    }, 3000);
}

  render();