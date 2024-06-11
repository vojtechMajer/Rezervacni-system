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

        $this->data["user"] = $user;

        // zobrazení a rušení objednávek
        if ($user) {

            if ($user["id_user_type"] == 1) {
                $this->data["orders"] = OrderManager::getAllOrders();

            } else {

                $this->data["orders"] = OrderManager::getAllOrdersFromUser($user["id_user"]);
            }

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