<?php
class LoginController extends Controller 
{
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