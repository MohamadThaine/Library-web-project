

$( document ).ready(function() {
    // GetAllBookNames();
    document.querySelector("#customer-wrapper").querySelectorAll("span")[1].innerHTML = sessionStorage.getItem("CurrentUserName");
    var Target = "GetEverything";
    var parms = `?Target=${Target}`
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`../php/customer.php/${parms}`);
    xhr.onload =  () => {
        if (xhr.status == 200) {
            GenerateBorrowedBooksTable(JSON.parse(xhr.response));
        } else {
            console.log("cant find the script");
        }
    };
    xhr.send();
});

function GenerateBorrowedBooksTable(borrowed_books) {
    var table = document.querySelector("tbody");
    var table_children = table.children;
    if(borrowed_books.length == 0){
        EmptyRow(table);
        return;
    }
    GenerateEmptyRow(table, borrowed_books.length);
    for(var i = 0; i < table_children.length; i++){
            borrowed_books[i].forEach(data =>{
            table_children[i].insertCell(-1).innerText = data;
        }) 
    }

}
function GenerateEmptyRow(table, count) {
    for(var i = 0 ; i < count; i++)
        table.insertRow();
}

function EmptyRow(table){
    table.insertRow(-1);
    table.children[0].insertCell(-1).innerText = "You Dont Have Any Borrowed Books!";
    table.children[0].children[0].colSpan = "3";
    table.children[0].children[0].style.textAlign = "center";
}