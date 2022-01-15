<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
?>

<?php
    $username = $_POST['user'];;
    $password = $_POST['pass'];

    $sql = "select Permission from users where UserName = '$username' and Password = '$password' ";
    $row = mysqli_query($conn, $sql);
    $result = mysqli_fetch_assoc($row);
    if(!$result)
        echo "";
    else
        print_r($result["Permission"]);
?>