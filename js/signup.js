var Form;

$( document ).ready(function() {
    Form = document.getElementById("submit");
    Form.addEventListener("click", Submit);
});


function Submit(e){
    e.preventDefault();
    var user = document.querySelector("#user").value;
    var email = document.querySelector("#email").value;
    var pass = document.querySelector("#pass").value;
    var parms = `user=${user}&email=${email}&pass=${pass}`
    var xhr = new XMLHttpRequest();
    xhr.open("POST","../php/signup.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload =  () => {
        if (xhr.status == 200) {
            SignUpValidation(xhr.responseText.trim());
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send(parms);
   
    return false;  
}

function SignUpValidation(SignUpResult){
    if(!Boolean(SignUpResult))
     document.querySelector("#error").innerHTML="Something went wrong!";
    else // if login succeeded it will redirect to the main page
    location.replace("../index.html");
}