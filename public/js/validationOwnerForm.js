function validateForm(event) {
    const errTextReq = document.getElementById('errorRequired').innerText;
    const errTextNumRng = document.getElementById('errorNumberRange').innerText;
    const errTextLen = document.getElementById('errorTextLength').innerText;
    const errTextNumber = document.getElementById('errorTextNumber').innerText;
    const errTextNumberGreater = document.getElementById('errorTextNumberGreater').innerText;
    const errTextDateFormat = document.getElementById('errorTextDateFormat').innerText;
    const errTextMailFormat = document.getElementById('errorTextMailFormat').innerText;
    const errTextOnlyLetters = document.getElementById('errorTextOnlyLetters').innerText;
    const errTextForm = document.getElementById('errorForm').innerText;

    const Name = document.getElementById("Name");
    const surname = document.getElementById("surname");
    const mail = document.getElementById("mail");
    const salary = document.getElementById("salary");
    const birthday = document.getElementById("birthday");
    const password = document.getElementById("password");

    const errorFirstName = document.getElementById("errorFirstName");
    const errorSecondName = document.getElementById("errorSecondName");
    const errorMail = document.getElementById("errorMail");
    const errorSalary = document.getElementById("errorSalary");
    const errorBirthday = document.getElementById("errorBirthday");
    const errorsSummary = document.getElementById("errorsSummary");
    resetErrors([Name, surname, salary, mail, birthday], [errorFirstName, errorSecondName,errorSalary, errorMail, errorBirthday], errorsSummary);
    let valid = true;

   

    if (!checkRequired(Name.value)) {
        valid = false;
        Name.classList.add("error-input");
        errorFirstName.innerText = errTextReq;
    } else if (!checkTextLengthRange(Name.value, 4, 20)) {
        valid = false;
        Name.classList.add("error-input");
        errorFirstName.innerText = errTextLen.format(4, 20);
    } else if (!checkNotNumbers(Name.value)) {
        valid = false;
        Name.classList.add("error-input");
        errorFirstName.innerText = errTextOnlyLetters;
    }

    if (!checkRequired(surname.value)) {
        valid = false;
        surname.classList.add("error-input");
        errorSecondName.innerText = errTextReq;
    } else if (!checkTextLengthRange(surname.value, 4, 20)) {
        valid = false;
        surname.classList.add("error-input");
        errorSecondName.innerText = errTextLen.format(4, 20);
    } else if (!checkNotNumbers(surname.value)) {
        valid = false;
        surname.classList.add("error-input");
        errorSecondName.innerText = errTextOnlyLetters;
    }

    if (!checkRequired(password.value)) {
        valid = false;
        password.classList.add("error-input");
        errorPassword.innerText = errTextReq;
    } else if (!checkTextLengthRange(password.value, 8, 30)) {
        valid = false;
        password.classList.add("error-input");
        errorPassword.innerText = errTextLen.format(8, 30);
    }

    if (!checkRequired(salary.value))
    {
        valid = false;
        salary.classList.add("error-input");
        errorSalary.innerText = errTextReq;
       }   else if (!checkPrice(salary.value)) {
            valid = false;
            salary.classList.add("error-input");
            errorSalary.innerText = errTextNumber + "<br>" + errTextNumberGreater.format(0);
        } else if (!checkNumberRange(salary.value, 1, 100000)) {
            valid = false;
            salary.classList.add("error-input");
            errorSalary.innerText = errTextNumRng.format(1, 100000);
    }

    if (!checkRequired(mail.value)) {
        valid = false;
        mail.classList.add("error-input");
        errorMail.innerText = errTextReq;
    } else if (!checkTextLengthRange(mail.value, 10, 30)) {
        valid = false;
        mail.classList.add("error-input");
        errorMail.innerText = errTextLen.format(10, 30);
    } else if (!checkMail(mail.value)) {
        valid = false;
        mail.classList.add("error-input");
        errorMail.innerText = errTextMailFormat;
    }

    if (!checkRequired(birthday.value)) {
        valid = false;
        birthday.classList.add("error-input");
        errorBirthday.innerText = errTextReq;
    } else if (!checkDate(birthday.value)) {
        valid = false;
        birthday.classlist.add("error-input");
        errorBirthday.innerText = errTextDateFormat;
    }
    if (!valid) {
        errorsSummary.innerText = errTextForm;
    }
    return valid;
}
