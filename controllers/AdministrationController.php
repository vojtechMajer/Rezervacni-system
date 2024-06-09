<?php

class AdministrationController extends Controller
{
    public function load($parameters)
    {
        $userManager = new UserManager();

        $user = $userManager->getLoggedUser();

        // redirect normal user if he gets here by accident
        if ($user["id_user_type"] != 1) {
            $this->redirect("index");
        }

        $this->view = "administration";
    }
}