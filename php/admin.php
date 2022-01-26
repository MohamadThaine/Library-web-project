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
            break;
        case "AddStaff":
            break;
        case "RemoveStaff":
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
  function ValidateInputs($BookName, $PublisherName, $Edition, $ReleaseDate, $CategoryId, $BookCover) {
    return !(empty($BookName) || empty($PublisherName) ||empty($Edition) ||empty($ReleaseDate) || empty($CategoryId) ||empty($BookCover));
}
?>