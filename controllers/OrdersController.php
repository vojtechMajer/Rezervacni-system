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




        $this->view = "createReservation";
    }

}