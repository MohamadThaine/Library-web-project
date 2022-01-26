const add_con = document.getElementById("add_con");
const remove_con = document.getElementById("remove_con");
const add_staff = document.getElementById("add_staff");
const remove_staff = document.getElementById("remove_staff");

$( document ).ready(function() {
    GetAllCategories();
  });

document.getElementById("AddBook").addEventListener('click', AddBookToDB);

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


function AddBookToDB(e){
    e.preventDefault();
    var Target = document.querySelector("#AddBook").name;
    var BookName = document.querySelector("#Book_Name").value;
    var PublisherName = document.querySelector("#Publisher_Name").value;
    var CategoryID  = document.querySelector("#Categories").value;
    var Edition = document.querySelector("#Edition").value;
    var ReleaseDate = document.querySelector("#Release_Date").value;
    var BookCover = document.querySelector("#Cover").value;
    var parms = `?Target=${Target}&BookName=${BookName}&PublisherName=${PublisherName}&CategoryID=${CategoryID }&Edition=${Edition}&ReleaseDate=${ReleaseDate}&BookCover=${BookCover}`
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

var jsoon;
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