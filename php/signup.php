<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
?>

<?php
    $username = $_POST['user'];
    $email = $_POST['email'];
    $password = $_POST['pass'];
    $CheckResult;
    
    $sql = "INSERT INTO users(Username, Email, Password, Permission) VALUES('$username', '$email', '$password', 2);";
    if(ValidateInputs($username, $email, $password)){
        $row = mysqli_query($conn, $sql);
        $CheckResult = ($row ? 1: "");
    }
    echo $CheckResult;
?>


<?php
    function ValidateInputs($username, $email, $password) {
        return !(empty($username) || empty($email) || empty($password));
    }
?>