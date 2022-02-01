<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
?>

<?php
    switch ($_GET["Target"]) {
        case "SubmitBook":
            AddBook($_GET["BookName"], $_GET["PublisherName"], $_GET["Edition"] , $_GET["ReleaseDate"], $_GET["CategoryID"]);
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
        case "LateCustomers":
            GetLateCustomers();
            break;
        case "Logout":
            Logout();
            break;
    }
?>

<?php
    function AddBook($BookName, $PublisherName, $Edition, $ReleaseDate , $CategoryId){
        global $conn;
        $sql = "INSERT INTO books(BookName, PublisherName, Edition, ReleaseDate, CategoryID) VALUES('$BookName', '$PublisherName', '$Edition', '$ReleaseDate', '$CategoryId');";
        if(ValidateInputs($BookName, $PublisherName, $Edition, $ReleaseDate, $CategoryId)){
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
    function GetLateCustomers(){
        global $conn;
        $TodayDate = date('Y/m/d');
        $sql = "SELECT * FROM borrow WHERE `ReturnDate` = '$TodayDate' ;";
        $row = mysqli_query($conn, $sql);
        $result = mysqli_fetch_all($row);
        if(count($result) <= 0)
            print_r(json_encode(array()));
        else
            print_r(json_encode($result));
    }
?>

<?php
  function ValidateInputs($BookName, $PublisherName, $Edition, $ReleaseDate, $CategoryId) {
    return !(empty($BookName) || empty($PublisherName) ||empty($Edition) ||empty($ReleaseDate) || empty($CategoryId));
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

<?php
    function UploadImageToDb(){
        if(isset($_POST['SubmitBook']) && isset($_FILES['Cover']))
            {
                $CoverName = $_FILES['Cover']['name'];
                $CoverSize = $_FILES['Cover']['size'];
                $TmpName = $_FILES['Cover']['tmp_name'];
                $Error = $_FILES['Cover']['error'];
                if($Error == 0)
                {
                    $img_ex = pathinfo($CoverName, PATHINFO_EXTENSION);
                    $img_ex_lc = strtolower($img_ex);
                    $AllowedFiles = array("jpg" , "jpeg" , "png");
                    if(in_array($img_ex_lc,$AllowedFiles))
                    {
                        $cover_name = uniqid("IMG-",true).'.'.$img_ex_lc;
                        $CoverPath = 'BooksCover/'.$cover_name;
                        move_uploaded_file($TmpName,$CoverPath);
                    }
                }
            }
        } 
?>

<?php
    function Logout()
    {
        session_destroy();
        unset($_SESSION);
    }
?>