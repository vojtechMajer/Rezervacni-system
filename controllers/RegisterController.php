<?php
class RegisterController extends Controller 
{
    public function load($parameters)
    {
        $userManager = new UserManager();
        $id_user_type = $userManager->getLoggedUser()["id_user_type"]; 
        $this->data["id_user_type"] = $id_user_type;
        
        if(!empty($_POST))
        {
            if (isset($_SESSION["user"]) && $id_user_type == 1) {
                if($userManager->AdminRegister($_POST))
                {
                    $this->addMessage("Registrace admina byla úspěšná");
                    $this->redirect("login");
                }
                else
                    $this->addMessage("Registrace admina byla neúspěšná");
            } else {
                if($userManager->register($_POST))
            {
                $this->addMessage("Registrace byla úspěšná");
                $this->redirect("login");
            }
            else
                $this->addMessage("Registrace byla neúspěšná");
            }

        }
        
        $this->view = "register";
    }
}
?>
