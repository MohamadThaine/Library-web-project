const add_con = document.getElementById("add_con");
const remove_con = document.getElementById("remove_con");
const add_staff = document.getElementById("add_staff");
const remove_staff = document.getElementById("remove_staff");
const viewtable = document.getElementById("viewtable");

$( document ).ready(function() {
    GetAllCategories();
    GetLateCustomers();
  });

document.getElementById("AddBook").addEventListener('click', AddBookToDB);

document.getElementById("RemoveBook").addEventListener('click', RemoveBookFromDB);

document.getElementById("AddStaffs").addEventListener('click', AddStaffToDB);

document.getElementById("RemoveStaffs").addEventListener('click', RemoveStaffFromDB);

document.getElementById("Logout").addEventListener('click', Logout);

document.getElementById("LateCustomers").addEventListener('click', () => {
    viewtable.classList.add('show');
});

document.getElementById("AddBooks").addEventListener('click', () => {
    add_con.classList.add('show');
});

document.getElementById("RemoveBooks").addEventListener('click', () => {
    remove_con.classList.add('show');
});

document.getElementById("AddStaff").addEventListener('click', () => {
    add_staff.classList.add('show');
});

document.getElementById("RemoveStaff").addEventListener('click', () => {
    remove_staff.classList.add('show');
});

document.getElementById("Closeadd").addEventListener('click', () => {
    add_con.classList.remove('show');
    document.querySelector("form").reset()
});

document.getElementById("Closeremove").addEventListener('click', () => {
    remove_con.classList.remove('show');
});

document.getElementById("CloseAddStaff").addEventListener('click', () => {
    add_staff.classList.remove('show');
});

document.getElementById("CloseRemoveStaff").addEventListener('click', () => {
    remove_staff.classList.remove('show');
});

document.getElementById("CloseViewTable").addEventListener('click', () => {
    viewtable.classList.remove('show');
});

function AddBookToDB(e){
    e.preventDefault();
    
    BookCover =document.getElementById('Cover');
    var Target = document.querySelector("#AddBook").name;
    var BookName = document.querySelector("#Book_Name").value;
    var PublisherName = document.querySelector("#Publisher_Name").value;
    var CategoryID  = document.querySelector("#Categories").value;
    var Edition = document.querySelector("#Edition").value;
    var ReleaseDate = document.querySelector("#Release_Date").value;
    var parms = `?Target=${Target}&BookName=${BookName}&PublisherName=${PublisherName}&CategoryID=${CategoryID }&Edition=${Edition}&ReleaseDate=${ReleaseDate}`
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`../php/admin.php/${parms}`);
    xhr.onload =  () => {
        if (xhr.status == 200) {
            QueryResult(xhr.responseText.trim());
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send();
   
    return false;  
}

function RemoveBookFromDB(e){
    e.preventDefault();
    var Target = document.querySelector("#RemoveBook").name;
    var BookName = document.querySelector("#RBook_Name").value;
    var parms = `?Target=${Target}&BookName=${BookName}`
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`../php/admin.php/${parms}`);
    xhr.onload =  () => {
        if (xhr.status == 200) {
            QueryResult(xhr.responseText.trim());
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send();
   
    return false;  
}

function AddStaffToDB(e){
    e.preventDefault();
    var Target = document.querySelector("#AddStaffs").name;
    var Username = document.querySelector("#Staff_Username").value;
    var Email = document.querySelector("#E-mail").value;
    var Password  = document.querySelector("#Password").value;
    var parms = `?Target=${Target}&Username=${Username}&Email=${Email}&Password=${Password}`
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`../php/admin.php/${parms}`);
    xhr.onload =  () => {
        if (xhr.status == 200) {
            QueryResult(xhr.responseText.trim());
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send();
   
    return false;  
}

function RemoveStaffFromDB(e){
    e.preventDefault();
    var Target = document.querySelector("#RemoveStaffs").name;
    var Username = document.querySelector("#RStaff_Username").value;
    var parms = `?Target=${Target}&Username=${Username}`
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`../php/admin.php/${parms}`);
    xhr.onload =  () => {
        if (xhr.status == 200) {
            QueryResult(xhr.responseText.trim());
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send();
   
    return false;  
}

function QueryResult(res){
    if(Boolean(parseInt(res)))
        console.log("success!");
    else
        console.log("failed :(!");
}

function GetLateCustomers(e){
    var Target = document.querySelector("#LateCustomers").name;
    var parms = `?Target=${Target}`
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`../php/admin.php/${parms}`);
    xhr.onload =  () => {
        if (xhr.status == 200) {
            TableMaker(JSON.parse(xhr.response));
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send();
   
    return false;  
}
var jsoon;
function TableMaker(CustomersJson){
    var rows = "";
    CustomersJson.forEach(customer => {
        rows = "<tr><td>" + customer[1] + "</td><td>" + customer[2] + "</td><td>" + customer[3] + "</td><td>" + customer[4] + "</td></tr>";
        $(rows).appendTo("#list tbody");
        console.log(rows);
    });
}

function GetAllCategories() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`../php/AvailableCategories.php`);
    // xhr.responseType = 'json';
    xhr.onload =  () => {
        if (xhr.status == 200) {
            OptionsMaker(JSON.parse(xhr.response));
        } else {
            console.log("something went wrong");
        }
    };
    
    xhr.send();
}

function OptionsMaker(CategoriesJson){
    CategoriesJson.forEach(category => {
        $('#Categories').append($('<option>', {
            value: category[0],
            text: category[1]
        }));
    });
    
}
async function LoadLoginPage()
{
    StartTranisition();
    await  LoginPagePreparations(); 
    FinishTransition();
}

async function LoginPagePreparations(){
    await new Promise(resolve => setTimeout(()=>{ resolve();}, 1000));
    document.getElementsByTagName("canvas")[0].style.display = "block";
    document.querySelector("#admin-wrapper").remove();
    $("script[src='../js/login.js']").remove()
    $.get("js/index.js", (data) => {
        $("head").append(data);
    });
    $('link[href="css/admin.css"]').remove();
    $('head').append('<link rel="stylesheet" href="css/login.css">');  
} 


function Logout(e){
    e.preventDefault();
    var Target = document.querySelector("#Logout").name
    var xhr = new XMLHttpRequest();
    var parms = `?Target=${Target}`
    xhr.open("GET",`../php/admin.php/${parms}`);
    xhr.onload =  () => {
        if (xhr.status == 200) {
            console.log("Logout Good");
        } else {
            console.log("something went wrong");
        }
    };
    xhr.send();
    sessionStorage.clear();  
    LoadLoginPage();
}
