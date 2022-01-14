<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
?>

<?php
    $username = $_POST['user'];;
    $password = $_POST['pass'];

    // $username = stripslashes($username);
    // $password = stripslashes($password);
    // $username = mysql_real_escape_string($username);
    // $username = mysql_real_escape_string($password);

    $sql = "select Permission from users where UserName = '$username' and Password = '$password' ";
    // $sql = "select * from users";
    $row = mysqli_query($conn, $sql);
    // $result = mysqli_fetch_array($row);
    // $result = mysqli_fetch_all($row);
    $result = mysqli_fetch_assoc($row);
    if(!$result)
        echo "";
    else
        print_r($result["Permission"]);
?>