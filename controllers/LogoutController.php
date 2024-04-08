<?php
class LoginController extends Controller 
{
    public function load($parameters)
    {
        $userManager = new UserManager();
        if($userManager->logout())
            // add message
        $this->redirect("");
    }
}