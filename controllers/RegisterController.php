<?php
class RegisterController extends Controller 
{
    public function load($parameters)
    {
        $userManager = new UserManager();
        
        if(!empty($_POST))
        {
            if($userManager->register($_POST))
            {
                $this->addMessage("Registrace byla úspěšná");
                $this->redirect("login");
            }
            else
                $this->addMessage("Registrace byla neúspěšná");
        }
        
        $this->view = "register";
    }
}
?>
