<?php
class LoginController extends Controller 
{
    function __construct()
    {
        $this->css = ["./css/nav.css", "css/login.css"];
    }

    public function load($parameters)
    {
        $userManager = new UserManager();
        
        if(!empty($_POST))
        {
            if($userManager->login($_POST))
            {
                $this->addMessage("uspěšně přihlášen");
                $this->redirect("");
            }
            else
                $this->addMessage("přihlášení bylo neuspěšné");
        }
        
        $this->view = "login";
    }
}