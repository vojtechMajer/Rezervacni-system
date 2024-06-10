<?php

class OrdersController extends Controller
{
    function __construct()
    {
        $this->css = ["./css/nav.css"];
    }

    public function load($parameters)
    {
        $userManager = new UserManager();
        $user = $userManager->getLoggedUser();

        // zobrazení a rušení objednávek
        if ($user) {
            $this->data["orders"] = OrderManager::getAllOrdersFromUser($user["id_user"]);

            if (!empty($_POST)) {
                // also deletes order
                ReservationManager::removeReservation($_POST["reservation-id"]);
            }

        } else {
            $this->addMessage("nejste přihlášeni nelze si prohlížet objednávky");
            $this->redirect("index");
        }

        $this->view = "orders";
    }

}