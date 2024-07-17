function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    } 
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}
function checkNotNumbers(value){
    if (!value) {
        return false;
    }
    const re = /[a-zA-Z]+/;
    return re.test(value);
}
function checkPrice(value) {
    if (!value) {
        return false;
    }
    const re = /\d+/;
    return re.test(value) && parseFloat(value) >= 0;
}
function checkModel(value) {
    if (!value) {
        return false;
    }
    const re = /^[a-zA-Z][ \w]*$/;
    return re.test(value);
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    return value >= min && value <= max;
}

function checkMail(value) {
    if (!value) {
        return false;
    }
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/;
    return re.test(value);
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}