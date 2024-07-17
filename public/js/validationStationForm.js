function validateForm(event) {
    const errTextReq = document.getElementById('errorRequired').innerText;
    const errTextLetterNumber = document.getElementById('errorLetterNumber').innerText;
    const errTextLen = document.getElementById('errorTextLength').innerText;
    const errTextForm = document.getElementById('errorForm').innerText;
    const errTextStart = document.getElementById('errorTextStart').innerText;
    
    const ownerId = document.getElementById("ownerId");
    const address = document.getElementById("address");


    const errorOwnerId = document.getElementById("errorOwnerId");
    const errorAddress = document.getElementById("errorAddress");
    const errorsSummary = document.getElementById("errorsSummary");
    resetErrors([ownerId, address], [errorOwnerId, ,errorAddress], errorsSummary);
    let valid = true;

   

    if (!checkRequired(ownerId.value)) {
        valid = false;
        ownerId.classList.add("error-input");
        errorOwnerId.innerText = errTextReq;
   
    }

    if (!checkRequired(address.value)) {
        valid = false;
        address.classList.add("error-input");
        errorAddress.innerText = errTextReq;
    } 
    else if (!checkTextLengthRange(address.value, 3, 10)) {
        valid = false;
        address.classList.add("error-input");
        errorAddress.innerText = errTextLen.format(2, 8);
    }
    else if (!checkModel(address.value)) {
        valid = false;
        address.classList.add("error-input");
        errorAddress.innerText = errTextStart + "<br>" + errTextLetterNumber;
    }



   
  
    if (!valid) {
        errorsSummary.innerText = errTextForm;
    }
    return valid;
}

