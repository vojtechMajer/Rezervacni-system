<?php

class ReservationTypeController extends Controller
{
    function __construct()
    {
        $this->dontShowLayout = true;
    }

    public function load($parameters)
    {
        $userManager = new UserManager();

        $reservationTypes = ReservationType::getReservationTypes();

        $this->data["JSONtypes"] = json_encode($reservationTypes);
        $this->view = "reservationType";
    }

}