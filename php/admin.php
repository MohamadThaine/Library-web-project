<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
?>

<?php
    switch ($_GET["Target"]) {
        case "SubmitBook":
            AddBook($_GET["BookName"], $_GET["PublisherName"], $_GET["Edition"] , $_GET["ReleaseDate"], $_GET["CategoryID"], $_GET["BookCover"]);
            break;
        case "RemoveBook":
            RemoveBook($_GET["BookName"]);
            break;
        case "AddStaff":
            AddStaff($_GET["Username"], $_GET["Email"], $_GET["Password"]);
            break;
        case "RemoveStaff":
            RemoveStaff($_GET["Username"]);
            break;
        case "ViewTable":
            break;
    }
?>

<?php
    function AddBook($BookName, $PublisherName, $Edition, $ReleaseDate , $CategoryId, $BookCover){
        global $conn;
        $sql = "INSERT INTO books(BookName, PublisherName, Edition, ReleaseDate, CategoryID, BookCover) VALUES('$BookName', '$PublisherName', '$Edition', '$ReleaseDate', '$CategoryId', '$BookCover');";
        if(ValidateInputs($BookName, $PublisherName, $Edition, $ReleaseDate, $CategoryId, $BookCover)){
            $row = mysqli_query($conn, $sql);
            $CheckResult = ($row ? 1: 0);
            echo $CheckResult;
        }
    }
?>

<?php
    function RemoveBook($BookName){
        global $conn;
        $sql = "DELETE FROM books WHERE `BookName` = '$BookName' ;";
        if(RemoveValidateInputs($BookName)){
            $row = mysqli_query($conn, $sql);
            $CheckResult = ($row ? 1: 0);
            echo $CheckResult;
        }
    }
?>

<?php
    function AddStaff($Username, $Email, $Password){
        global $conn;
        $sql = "INSERT INTO users(Username, Email, Password, Permission) VALUES('$Username', '$Email', '$Password', '1');";
        if(StaffValidateInputs($Username, $Email, $Password)){
            $row = mysqli_query($conn, $sql);
            $CheckResult = ($row ? 1: 0);
            echo $CheckResult;
        }
    }
?>

<?php
    function RemoveStaff($Username){
        global $conn;
        $sql = "DELETE FROM users WHERE `Username` = '$Username' ;";
        if(RemoveValidateInputs($Username) && CheckStaff($Username) == '1' ){
            $row = mysqli_query($conn, $sql);
            $CheckResult = ($row ? 1: 0);
            echo $CheckResult;
        }
    }
?>

<?php
  function ValidateInputs($BookName, $PublisherName, $Edition, $ReleaseDate, $CategoryId, $BookCover) {
    return !(empty($BookName) || empty($PublisherName) ||empty($Edition) ||empty($ReleaseDate) || empty($CategoryId) ||empty($BookCover));
}
?>

<?php
  function RemoveValidateInputs($Name) {
    return !(empty($Name));
}
?>

<?php
  function StaffValidateInputs($Username, $Email, $Password) {
    return !(empty($Username) || empty($Email) ||empty($Password));
}
?>

<?php
  function CheckStaff($Name) {
    global $conn;
    $sql = "SELECT Permission FROM users WHERE UserName = '$Name' ;";
    $row = mysqli_query($conn, $sql);
    $result = mysqli_fetch_assoc($row);
    if(!$result)
        echo "";
    else
        print_r($result["Permission"]);
}
?>