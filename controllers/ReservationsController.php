<?php

class ReservationsController extends Controller
{
    public function load($parameters)
    {
        /*
        $reservationManager->addReservation( $laneManager->getLaneById(1), 1,
            date_format(new DateTime("now"),"Y-m-d H:i:s"),
            date_format(new DateTime("now"),"Y-m-d H:i:s")
        );
        */
        
        // DEBUG
        $lane = LaneManager::getLaneById(1);
        $overlapingReservations = ReservationManager::getOverlapingReservations('2024-04-02 15:00:00', '2024-04-02 17:59:00', $lane);

        $reservations = ReservationManager::getReservations();
        
        $reservationJSONS = array();
        
        foreach ($reservations as $reservation)
        {
            $reservationJSONS[] = json_encode($reservation);
        }
            
        $this->data["overlapingReservations"] = $overlapingReservations;
        $this->data["reservations"] = $reservations;
        $this->data["parametry"] = $parameters;

        $this->data["reservationJSONS"] = $reservationJSONS;

        $this->view = "reservations";
    }
}

// SELECT * 
// FROM reservation 
// 			-- Start rezervace												  	end rezervace
// WHERE start > STR_TO_DATE('2023-04-02 16:00:00', '%Y-%m-%d %H:%i:%s') AND start < STR_TO_DATE('2023-04-02 16:30:00', '%Y-%m-%d %H:%i:%s') ;
