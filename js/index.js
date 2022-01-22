var Form;

$.get("../html/login.html", function(data){
    $("body").append(data);
    Form = document.getElementById("submit");
});


function checkDOMChange()
{
    if(Form){
        Form.addEventListener("click", Submit);
        return;
    }
    setTimeout( checkDOMChange, 100 );
}

function Submit(e){
    e.preventDefault();
    var user = document.querySelector("#user").value;
    var pass = document.querySelector("#pass").value;
    var parms = `user=${user}&pass=${pass}`
    var xhr = new XMLHttpRequest();
    xhr.open("POST","../php/login.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload =  () => {
        if (xhr.status == 200)
            ResponseHandler(xhr.responseText);
        else
            console.log("something went wrong");
    };
    xhr.send(parms);
   
    return false;  
}





checkDOMChange();
