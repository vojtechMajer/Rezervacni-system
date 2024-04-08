<?php 

class UserManager {
    // login
    public function login($userData)
    {
        $sql = "select * from users 
        where username = ? AND password = ?";

        $user = Db::queryOne($sql,
            [
                $userData["username"],
                $this->getHash($userData["password"])
            ]);

        if($user) {
            $_SESSION["user"] = $user;
            return true;
        }
        return false;
    }

    // return logged user
    public function getLoggedUser()
    {
        if (isset($_SESSION["user"]))
        {
            return $_SESSION["user"];
        }
        else return false;
    }

    // sign out
    public function logout()
    {
        if($this->getLoggedUser())
        {
            unset($_SESSION["user"]);
            return 1;
        }
        return 0;
    }

    private function addSalt(string $password)
    {
        return $password; // add salt here
    }

    private function getHash(string $password)
    {
        return hash("sha256", $password);
    }
}