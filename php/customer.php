<?php
    require('conn.php');
    new Connection("localhost", "root", "2000", "library");
    $conn = Connection::$conn;
    session_start();
?>
<?php
$Target = $_GET["Target"];
if($Target == "GetBookName")
{
    GetBookName();
}
if($Target == "GetEverything")
{
    GetEverything();
}
?>
<?php
    function GetEverything(){
        global $conn;
        $CurrentUserId = $_SESSION['Current User'];
        $sql = "SELECT BookID, CheckOutDate, ReturnDate FROM borrow WHERE UserID = '$CurrentUserId' ";
        $BookNames = GetBookName();
        $row = mysqli_query($conn, $sql);
        $result = mysqli_fetch_all($row);
        if(!$result)
            echo json_encode(array());
        else{
            for($i = 0; $i < count($BookNames); $i++){
                array_splice( $result[$i], 1, 0, $BookNames[$i]); 
            }
            print_r(json_encode($result));
        }
    }
?>

<?php
    function GetBookName()
    {
        global $conn;
        $CurrentUserId= $_SESSION['Current User'];
        $sql1 = "SELECT BookID FROM borrow WHERE UserID = '$CurrentUserId' ";
        $row1 = mysqli_query($conn, $sql1);
        $result1 = mysqli_fetch_all($row1);
        $resultB =  array();
        foreach($result1 as $IDS)
        {
            foreach($IDS as $ID)
            {
                $BookName = "SELECT BookName FROM books WHERE id = '$ID[0]' ";
                $row12 = mysqli_query($conn, $BookName);
                $result12 = mysqli_fetch_assoc($row12);
                if(!$result12)
                   echo json_encode(array());
               else
               {
                array_push($resultB , $result12['BookName']);
               }
                  
                }
        }
        return $resultB;
    }
?>
