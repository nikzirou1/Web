function validateForm(event) {
    const errTextReq = document.getElementById('errorRequired').innerText;
    const errTextDateFormat = document.getElementById('errorTextDateFormat').innerText;
    const errTextForm = document.getElementById('errorForm').innerText;
    
    const carId = document.getElementById("carId")
    const service = document.getElementById("service");
    const status = document.getElementById("status");
    const dateOfOrder = document.getElementById("dateOfOrder");

    const errorCarId = document.getElementById("errorCarId");
    const errorService = document.getElementById("errorService");
    const errorStatus = document.getElementById("errorStatus");
    const errorDateOfOrder = document.getElementById("errorDateOfOrder");
    const errorsSummary = document.getElementById("errorsSummary");
    resetErrors([service, status, dateOfOrder, carId], [errorService, errorStatus,errorDateOfOrder, errorCarId], errorsSummary);
    let valid = true;

    if (!checkRequired(carId.value)) {
        valid = false;
        carId.classList.add("error-input");
        errorCarId.innerText = errTextReq;
    }

    if (!checkRequired(service.value)) {
        valid = false;
        service.classList.add("error-input");
        errorService.innerText = errTextReq;
   
    }

    if (!checkRequired(status.value)) {
        valid = false;
        status.classList.add("error-input");
        errorStatus.innerText = errTextReq;


        
        if (!checkRequired(dateOfOrder.value)) {
            valid = false;
            dateOfOrder.classList.add("error-input");
            errorDateOfOrder.innerText = errTextReq;
        } else if (!checkDate(dateOfOrder.value)) {
            valid = false;
            dateOfOrder.classlist.add("error-input");
            errorDateOfOrder.innerText = errTextDateFormat;
        }

   
  
    if (!valid) {
        errorsSummary.innerText = errTextForm;
    }
    return valid;
}

}