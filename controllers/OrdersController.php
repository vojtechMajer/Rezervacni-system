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
        // zobrazení a rušení objednávek


        if (!empty($_POST)) {

            // also deletes order
            ReservationManager::removeReservation($_POST["reservation-id"]);
        }

        $this->data["orders"] = OrderManager::getAllOrders();


        $this->view = "orders";
    }

}