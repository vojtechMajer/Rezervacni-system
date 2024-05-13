<?php

class ReservationsController extends Controller
{
    public function load($parameters)
    {
        // TEST REZERVACE

        // $timeS = mktime(17, 30, 0, 5, 13, 2024);
        // $timeE = mktime(18, 00, 0, 5, 13, 2024);

        // ReservationManager::addReservation (
        //     LaneManager::getLaneById(1),
        //     ReservationType::getReservationTypesById(1),
        //     date("Y-m-d H:i:s", $timeS),
        //     date("Y-m-d H:i:s", $timeE)
        // );
        
        
        // DEBUG
        $lane = LaneManager::getLaneById(1);
        $overlapingReservations = ReservationManager::getOverlapingReservations('2024-04-02 15:00:00', '2024-04-02 17:59:00', $lane);

        $reservations = ReservationManager::getAllReservations();

        
        // TEST RESERVATION IN DATABASE 2024-04-02 16:00:00, ! 2024-05-13 17:30:00 !
        $reservations = ReservationManager::getReservationsAfterDate('2024-05-20');
        
        // Actual JSON
        $this->data["reservationJSONS"] = json_encode($reservations);
        


        // test 
        $this->data["overlapingReservations"] = $overlapingReservations;
        // test 
        $this->data["reservations"] = $reservations;
        // test 
        $this->data["parametry"] = $parameters;



        $this->view = "reservations";
    }
}

// SELECT * 
// FROM reservation 
// 			-- Start rezervace												  	end rezervace
// WHERE start > STR_TO_DATE('2023-04-02 16:00:00', '%Y-%m-%d %H:%i:%s') AND start < STR_TO_DATE('2023-04-02 16:30:00', '%Y-%m-%d %H:%i:%s') ;
