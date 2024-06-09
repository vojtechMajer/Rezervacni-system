<?php
class User
{
    public $id;
    public UserType $type;

    public $username;
    public $password;

    public function __construct(int $id, UserType $type, string $username, string $password)
    {
        $this->id = $id;
        $this->type = $type;
        $this->username = $username;
        $this->password = $password;
    }
}

