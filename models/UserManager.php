<?php

class UserManager
{
    // login
    public function login($userData)
    {
        $sql = "select * from users 
        where username = ? AND password = ?";

        $user = Db::queryOne(
            $sql,
            [
                $userData["username"],
                $this->getHash($userData["password"])
            ]
        );

        if ($user) {
            $_SESSION["user"] = $user;
            return true;
        }
        return false;
    }

    // return logged user
    public function getLoggedUser()
    {
        if (isset($_SESSION["user"])) {
            return $_SESSION["user"];
        } else
            return false;
    }

    // register user
    public function register($userData)
    {

        $existingUser = Db::queryOne("SELECT * FROM users WHERE username = ?", [$userData["username"]]);
        if ($existingUser) {
            return false;
        }

        if ($userData["password"] !== $userData["confirm_password"]) {
            return false;
        }

        $hashedPassword = $this->getHash($userData["password"]);

        $sql = "INSERT INTO users (username, id_user_type, password) VALUES (?, 2, ?)";
        $success = Db::execute($sql, [$userData["username"], $hashedPassword]);

        if ($success) {
            return true;
        } else {
            return false;
        }
    }

    // register admin
    public function AdminRegister($userData)
    {

        $existingUser = Db::queryOne("SELECT * FROM users WHERE username = ?", [$userData["username"]]);
        if ($existingUser) {
            return false;
        }

        if ($userData["password"] !== $userData["confirm_password"]) {
            return false;
        }

        $hashedPassword = $this->getHash($userData["password"]);

        $sql = "INSERT INTO users (username, id_user_type, password) VALUES (?, 1, ?)";
        $success = Db::execute($sql, [$userData["username"], $hashedPassword]);

        if ($success) {
            return true;
        } else {
            return false;
        }
    }

    public function getAllUsers()
    {
        $query = Db::queryAll("select * from users where id_user_type = 2");
        $users = [];

        foreach ($query as $row) {
            $users[] = new User($row["id_user"], UserType::customer, $row["username"], $row["password"]);
        }

        return $users;
    }

    // sign out
    public function logout()
    {
        if ($this->getLoggedUser()) {
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