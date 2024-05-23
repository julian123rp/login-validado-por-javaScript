document.addEventListener("DOMContentLoaded", function (){

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const showHideButoon = document.getElementById("show-hide");



    loginForm.addEventListener("submit", function (event){
        event.preventDefault();
        validateForm();
        // Todo: agregar metodo que valide el formulario
    })

    emailInput.addEventListener("blur", function (){
        validateEmail()
        // Todo: agregar metodo que valide el email
    })

    emailInput.addEventListener("change", function (){
        clearError(emailError)
        // Todo: agregar metodo que limpie el error
    })
    passwordInput.addEventListener("change", function (){
        clearError(passwordError)
        // Todo: agregar metodo que limpie el error
    })

    confirmPasswordInput.addEventListener("change", function (){
        clearError(confirmPasswordError)
        // Todo: agregar metodo que limpie el error
    })

    showHideButoon.addEventListener("click", function (){
        if(passwordInput.type == "password"){
            passwordInput.type = "text"
            confirmPasswordInput.type = "text"
        }else{
            passwordInput.type = "password"
            confirmPasswordInput.type = "password"
        }
    })

    function validateForm (){
        const isValideEmail = validateEmail()
        const isValidePassword = validatePassword()
        const PasswordMathc = validatePasswordMatch()

        if(isValideEmail && isValidePassword && PasswordMathc){
            saveToLocalStorage()
            // guardar email em el localStorage y generar un JSON en consola
            alert("Has ingresado con exito")
        }

    }

    function validateEmail(){
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim() //el trim lo que hace es elimiar espacions vacios al comienzo y final del input

        if(!emailRegex.test(emailValue)){
             showError(emailError, "ingresa un email valido")
            return false
            
        }
        return true
    }

    function validatePassword(){
        const passwordValue = passwordInput.value.trim();

        if(passwordValue.length < 6){
            showError(passwordError,"ingresa una contraseña de almenos 6 caracteres")
            return false;
        }
        return true 
    }

    function validatePasswordMatch(){
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError,"las contraseñas no counciden")
            return false 
        }
        return true
    }

    function showError (errorElement, message){
        errorElement.innerHTML = message;
        errorElement.style.display = "block";

    }

    function clearError (errorElement, message){
        errorElement.innerHTML = "";
        errorElement.style.display = "none";

    }

    function saveToLocalStorage (){
        const emailValue = emailInput.value.trim();
        localStorage.setItem("email", emailValue)
        const body = bodyBuilderJSON()
        console.log(body)
    }

    function bodyBuilderJSON(){
        return{
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }

})