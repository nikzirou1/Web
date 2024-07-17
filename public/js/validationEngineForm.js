function validateForm(event) {
    const errTextReq = document.getElementById('errorRequired').innerText;
    const errTextNumRng = document.getElementById('errorNumberRange').innerText;
    const errTextForm = document.getElementById('errorForm').innerText;


    const engineSize = document.getElementById("engineSize");
    const engineWeight = document.getElementById("engineWeight");
    const material1 = document.getElementById("material1");


    const errorEngineSize = document.getElementById("errorEngineSize");
    const errorEngineWeight = document.getElementById("errorEngineWeight");
    const errorEngineMaterial = document.getElementById("errorEngineMaterial");
    const errorsSummary = document.getElementById("errorsSummary");
    resetErrors([engineSize, engineWeight, material1], [errorEngineSize, errorEngineWeight,errorEngineMaterial], errorsSummary);
    let valid = true;

   

    if (!checkRequired(engineSize.value)) {
        valid = false;
        engineSize.classList.add("error-input");
        errorEngineSize.innerText = errTextReq;
   
    }

    if (!checkRequired(engineWeight.value)) {
        valid = false;
        engineWeight.classList.add("error-input");
        errorEngineWeight.innerText = errTextReq;
    } else if (!checkTextLengthRange(engineWeight.value, 1, 2)) {
        valid = false;
        engineWeight.classList.add("error-input");
        errorEngineWeight.innerText = errTextNumRng.format(1, 99);
    }

    if (!checkRequired(material1.value)) {
        valid = false;
        material1.classList.add("error-input");
        errorEngineMaterial.innerText = errTextReq;
   
    }
  
    if (!valid) {
        errorsSummary.innerText = errTextForm;
    }
    return valid;
}
