function ResponseHandler(LoginResult){
    let result = LoginResult.trim();
    Boolean(result)? LoginSucceeded(result): LoginFailed();
}


async function LoginRedirector(permission){
    permission = permission.trim();
    setTimeout(document.querySelector("#wrapper").remove(), 1000);
    await new Promise(resolve => setTimeout(()=>{ resolve();}, 5000)); //sleeping for testing purposes no more
    switch (permission) {
        case "1":
            LoadAdminPage();
            break;
        case "2":
            LoadCustomerPage();
            break;
        default:
            console.log("something went wrong!");
    }
}

async function LoginSucceeded(result){
    StartTranisition();
    await  LoginRedirector(result); 
    FinishTransition(); // this function wont be calledd before LoginRedirector finishes

}

function LoginFailed(){
    document.querySelector("#error").innerHTML="Your password or username is wrong!";
}

function StartTranisition(){
    document.getElementsByClassName("page-transition")[0].classList.add("activate");
}


function FinishTransition(){
    setTimeout(function(){ 
        document.getElementsByClassName("page-transition")[0].classList.replace("activate", "deactivate")
        setTimeout(()=>{
            document.getElementsByClassName("page-transition")[0].classList.remove("deactivate");
        }, 650);  
    }, 750);
}


function LoadAdminPage(){
    let element = document.createElement("div");
    element.innerHTML = "admin";
    element.id="test1";
    document.body.append(element);
    $('head').append('<link rel="stylesheet" href="css/admin.css">');
    console.log("admin");

}

function LoadCustomerPage(){
    let element = document.createElement("div");
    element.innerHTML = "customer";
    element.id="test2";
    document.body.append(element);
    $('head').append('<link rel="stylesheet" href="css/customer.css">');
    console.log("costumer");

}
