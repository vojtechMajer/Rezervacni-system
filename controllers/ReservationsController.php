<?php

class ReservationsController extends Controller
{
    public function load($parameters)
    {
        $reservationManager = new ReservationManager();
        $laneManager = new LaneManager();

        $reservationManager->addReservation($laneManager->getLaneById(1), 1/*typ reservace*/,
            date_format(new DateTime("now"),"y-m-d H:i:s"),
            date_format(new DateTime("now"),"y-m-d H:i:s")
        );

        $this->data["reservations"] = $reservationManager->getReservations();
        
        // 2024-04-02 16:00:00
        $this->view = "reservations";
    }
}