var Form;

$.get("../html/login.html", function(data){
    $("body").append(data);
    Form = document.getElementById("submit");
});


function checkDOMChange()
{
    if(Form){
        Form.addEventListener("click", Submit);
        // var imported = document.createElement('script');
        // imported.src = '../js/slider.js';
        // document.head.appendChild(imported);
        return;
    }
    setTimeout( checkDOMChange, 100 );
}

function Submit(e){
    e.preventDefault();
    // tl.reverse();
    var user = document.querySelector("#user").value;
    var pass = document.querySelector("#pass").value;
    var parms = `user=${user}&pass=${pass}`
    var xhr = new XMLHttpRequest();
    xhr.open("POST","../php/login.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload =  () => {
        // Process our return data
        if (xhr.status == 200) {
            // Runs when the request is successful
            LoginValidations(xhr.responseText.trim())
            // console.log(xhr.responseText);
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send(parms);
   
    return false;  
}


function LoginValidations(LoginResult){
    if(!Boolean(LoginResult))
        document.querySelector("#error").innerHTML="You password or username is wrong!";
    else{
        document.getElementsByClassName("page-transition")[0].classList.add("activate");
        setTimeout(function(){ 
            document.getElementsByClassName("page-transition")[0].classList.replace("activate", "deactivate")
            setTimeout(function(){ 
                document.getElementsByClassName("page-transition")[0].classList.remove("deactivate");
            }, 650);  
        }, 750);  
    }
        // !Boolean(LoginResult) ? document.querySelector("#error").innerHTML="You password or username is wrong!": document.querySelector("#error").innerHTML="sucess";
}


checkDOMChange();
