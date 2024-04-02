<?php 

class UserManager {

    static $loggedUser;

    // login
    public static function login($userData)
    {
        $sql = "select * from users 
        where username = ? AND password = ?";

        $user = Db::queryOne($sql, [$userData["username"], $userData["password"]]);

    }

    // return logged user

    // sign out

    function getHash(string $password)
    {
        return hash("sha256", $password);
    }
}