function validateForm(event) {
    const errTextReq = document.getElementById('errorRequired').innerText;
    const errTextNumRng = document.getElementById('errorNumberRange').innerText;
    const errTextLen = document.getElementById('errorTextLength').innerText;
    const errTextStart = document.getElementById('errorTextStart').innerText;
    const errTextNumber = document.getElementById('errorTextNumber').innerText;
    const errTextNumberGreater = document.getElementById('errorTextNumberGreater').innerText;
    const errTextDateFormat = document.getElementById('errorTextDateFormat').innerText;
    const errTextForm = document.getElementById('errorForm').innerText;

    const carNumber = document.getElementById("carNumber");
    const carModel = document.getElementById("carModel");
    const carPrice = document.getElementById("carPrice");
    const carYear = document.getElementById("carYear");
    const engineSeries = document.getElementById("engineId");
    const Owner = document.getElementById("ownerId");

    const errorCarNumber = document.getElementById("errorCarNumber");
    const errorCarModel = document.getElementById("errorCarModel");
    const errorCarPrice = document.getElementById("errorCarPrice");
    const errorCarYear = document.getElementById("errorCarYear");
    const errorEngineSeries = document.getElementById("errorEngineSeries");
    const errorOwner = document.getElementById("errorOwner");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors(
        [carNumber, carModel, carPrice, carYear, engineSeries, Owner],
        [errorCarNumber, errorCarModel, errorCarPrice, errorCarYear, errorEngineSeries, errorOwner],
        errorsSummary
    );
    let valid = true;
    let nowDate = new Date(),
        month = "" + (nowDate.getMonth() + 1),
        day = "" + nowDate.getDate(),
        year = nowDate.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const nowString = [year, month, day].join("-");

    if (!checkRequired(carNumber.value)) {
        valid = false;
        carNumber.classList.add("error-input");
        errorCarNumber.innerText = errTextReq;
    } else if (!checkTextLengthRange(carNumber.value, 2, 8)) {
        valid = false;
        carNumber.classList.add("error-input");
        errorCarNumber.innerText = errTextLen.format(2, 8);
    }

    if (!checkRequired(carModel.value)) {
        valid = false;
        carModel.classList.add("error-input");
        errorCarModel.innerText = errTextReq;
    } 
    else if (!checkTextLengthRange(carModel.value, 3, 10)) {
        valid = false;
        carModel.classList.add("error-input");
        errorCarModel.innerText = errTextLen.format(2, 8);
    }
    else if (!checkModel(carModel.value)) {
        valid = false;
        carModel.classList.add("error-input");
        errorCarModel.innerText = errTextStart;
    }

    if (!checkRequired(carPrice.value)) {
        valid = false;
        carPrice.classList.add("error-input");
        errorCarPrice.innerText = errTextReq;
    } else if (!checkNumberRange(carPrice.value, 1000, 1000000)) {
        valid = false;
        carPrice.classList.add("error-input");
        errorCarPrice.innerText = errTextNumRng.format(1000, 1000000);
    } else if (!checkPrice(carPrice.value)) {
        valid = false;
        carPrice.classList.add("error-input");
        errorCarPrice.innerText = errTextNumber + "<br>" + errTextNumberGreater.format(0);
    }
    if (!checkRequired(engineSeries.value)) {
        valid = false;
        engineSeries.classList.add("error-input");
        errorEngineSeries.innerText = errTextReq;
    }

    if (!checkRequired(Owner.value)) {
        valid = false;
        Owner.classList.add("error-input");
        errorOwner.innerText = errTextReq;
    }

    if (!checkRequired(carYear.value)) {
        valid = false;
        carYear.classList.add("error-input");
        errorCarYear.innerText = errTextReq;
    } else if (!checkDate(carYear.value)) {
        valid = false;
        carYear.classlist.add("error-input");
        errorCarYear.innerText = errTextDateFormat;
    }
    else if (!checkNumberRange(carYear.value, 1999, 2023)) {
        valid = false;
        carYear.classlist.add("error-input");
        errorCarYear.innerText =
            errTextNumRng.format(1999, 2023);
    }

    if (!valid) {
        errorsSummary.innerText = errTextForm;
    }
    return valid;
}
