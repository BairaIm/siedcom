const themaBtn = document.querySelector(".thema");
themaBtn.addEventListener("click", changeThema);
let isDark = false;

submitBtn = document.querySelector(".form__button");
submitBtn.addEventListener("click", submitForm);

inputName = document.querySelector("#name");
inputTel = document.querySelector("#tel");
inputEmail = document.querySelector("#email");

agreeCheck = document.querySelector(".form__agree");
agreeCheck.addEventListener("click", () => {
    submitBtn.disabled = !submitBtn.disabled;
});
init();

function init() {
    const themaIsDark = +localStorage.getItem("thema");

    if (themaIsDark !== +isDark) {
        changeThema();
        isDark = Boolean(themaIsDark);
        themaBtn.checked = isDark;
    }
}

function submitForm(event) {
    event.preventDefault();

    let note = "";

    if (!validateName()) {
        note = "Введите свое имя.\n"
    }

    console.log(validateEmail(), validateTel());
    if (!validateEmail() && !validateTel()) {
        note += "Введите корректную электронную почту или номер телефона."
    }

    const noteDiv = document.querySelector(".form__input__note");
    if (!note) {
        note = "Ваша заявка отправлена";
        noteDiv.classList.replace("red", "green");
    } else {
        noteDiv.classList.replace("green", "red");
    }
    
    noteDiv.classList.remove("opacity");
    noteDiv.textContent = note;

    let timeoutId = setTimeout(() => {
        noteDiv.classList.add("opacity");
    }, 10000);
}

function changeThema() {
    const elems = document.querySelectorAll(".change_thema");

    for (let elem of elems) {
        const className = elem.classList[0];
        elem.classList.replace(elem.classList[1], className + (isDark ? "_light" : "_dark"));
    }
    
    isDark = !isDark;
    
    localStorage.setItem("thema", (+isDark).toString());
}

function delSpace(input) {
    let text = input.trim();
    let ind = text.indexOf('  ');
    while(ind != -1) {
        text = text.slice(0, ind) + text.slice(ind + 1);

        ind = text.indexOf('  ');
    }

    console.log(text);

    return text;
}

function validateName() {
    const name = inputName.value.trim();

    console.log(name);

    return name.length > 1;
}

function validateEmail() {
  // Валидное регулярное выражение для проверки e-mail
    const input = delSpace(inputEmail.value);

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(input).toLowerCase());
}

function validateTel() {
    return inputTel.value.indexOf('_') == -1;
}

const maskOptions = {
  mask: '+7 (000) 000-00-00',
  lazy: false,
};
const mask = IMask(inputTel, maskOptions);
