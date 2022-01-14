<?php
    class Connection {
        private $dbServerName;
        private $dbUserName;
        private $dbPassword;
        private $dbName;
        public static $conn;
        public function __construct($dbServerName, $dbUserName, $dbPassword, $dbName){
            $this->dbServerName = $dbServerName;
            $this->dbUserName = $dbUserName;
            $this->dbPassword = $dbPassword;
            $this->dbName = $dbName;
            $this->ConnectToDb();
        }

        public function ConnectToDb(){
            Connection::$conn = new mysqli($this->dbServerName, $this->dbUserName, $this->dbPassword, $this->dbName) or die("unable to connect to the database!");
        }

        public function status(){
            if(Connection::$conn)
               return 1;
            return 0;
        }
    }
?>