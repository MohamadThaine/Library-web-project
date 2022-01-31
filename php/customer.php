<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
    session_start();
?>

<?php
    $CurrentUserId= $_SESSION['Current User'];
    $sql = "SELECT BookID, CheckOutDate, ReturnDate FROM borrow WHERE UserID = '$CurrentUserId' ";
    $row = mysqli_query($conn, $sql);
    $result = mysqli_fetch_all($row);
    if(!$result)
        echo json_encode(array());
    else
        print_r(json_encode($result));
?>