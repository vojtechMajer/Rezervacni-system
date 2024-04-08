<?php
class LogoutController extends Controller 
{
    public function load($parameters)
    {
        $userManager = new UserManager();
        if($userManager->logout())
            $this->addMessage("úspěšně odhlášen");
        $this->redirect("");
    }
}