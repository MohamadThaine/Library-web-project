<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
    session_start();
?>

<?php
    $username = $_POST['user'];
    $password = $_POST['pass'];
    
    $sql = "SELECT Permission, id FROM users WHERE UserName = '$username' AND Password = '$password' ";
    $row = mysqli_query($conn, $sql);
    $result = mysqli_fetch_assoc($row);
    if(!$result)
        echo "";
    else{
        $_SESSION["Current User"] = $result["id"];
        print_r($result["Permission"]);
    }
    session_write_close(); // End the current session and store session data
?>