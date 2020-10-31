let mailInput = document.querySelector('#mail')
let footerBtn = document.querySelector('#form_btn')
let mailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,6})$/i;
let form = document.querySelector('.form_container')
let afterForm = document.querySelector('.after_form')

mailInput.addEventListener('keyup', validate)
mailInput.addEventListener('keyup', formStorage)
mailInput.addEventListener('focus', behaviour)
mailInput.addEventListener('blur', behaviourOnBlur)
mailInput.value = localStorage.getItem('value');
footerBtn.disabled = true;

window.onload = validate();


function behaviour(){
    mailInput.style.border = "2px solid white";
}

function behaviourOnBlur(){
    if(mailInput.value == "")
        mailInput.style.border = "2px solid #ffffff";
    else if(validate() == true)
        mailInput.style.border = "2px solid #009900";
    else if(validate() == false)
        mailInput.style.border = "2px solid #ff0000";
}



function validate(){
    if(mailPattern.test(mailInput.value)==false){
        footerBtn.disabled = true;
        return false;
    }
    else{
        completeCheck();
        return true;
    }
}

function formStorage(){
    localStorage.setItem('value', mailInput.value);
}


function completeCheck(){
    if(validate == false){
        footerBtn.disabled = true;
        mailInput.style.border = "2px solid #ff0000";
    }
    else{ 
        footerBtn.disabled = false;
        mailInput.style.border = "2px solid #009900";
    }
}




footerBtn.onclick = () => {
    form.style.display = 'none';
    afterForm.style.display = 'block';
    setTimeout(function(){
        window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 2000);
}