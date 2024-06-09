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

        switch ($parameters[0]) {
            case 'users':
                $users = $userManager->getAllCustomers();
                $this->data["customers"] = $users;
                $this->view = "administrationUsers";
                break;
            case 'lanes':
                $lanes = LaneManager::getLanes();
                $this->data["lanes"] = $lanes;
                $this->view = "lanesOverview";
                break;
            default:
                $this->view = "administration";
                break;
        }


    }
}