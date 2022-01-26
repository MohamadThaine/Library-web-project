<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
?>

<?php
    $username = $_POST['user'];
    $password = $_POST['pass'];

    $sql = "SELECT Permission FROM users WHERE UserName = '$username' AND Password = '$password' ";
    $row = mysqli_query($conn, $sql);
    $result = mysqli_fetch_assoc($row);
    if(!$result)
        echo "";
    else
        print_r($result["Permission"]);
?>