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
                $this->redirect("");
            }
            else $this->redirect("error");
        }
        
        $this->view = "login";
    }
}