const add_con = document.getElementById("add_con");
const remove_con = document.getElementById("remove_con");
const add_staff = document.getElementById("add_staff");
const remove_staff = document.getElementById("remove_staff");

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