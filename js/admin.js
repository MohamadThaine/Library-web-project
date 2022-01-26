const AddBooks = document.getElementById("AddBooks");
const model_con = document.getElementById("model_con");
const Close = document.getElementById("Close");

AddBooks.addEventListener('click', () => {
    model_con.classList.add('show');
});

Close.addEventListener('click', () => {
    model_con.classList.remove('show');
});