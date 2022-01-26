<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
?>

<?php
   $sql = "SELECT * FROM categories";
   $row = mysqli_query($conn, $sql);
   $result = mysqli_fetch_all($row);
   if(count($result) <= 0)
    print_r(json_encode(array()));
   else
    print_r(json_encode($result));
?>