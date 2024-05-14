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
        //     date("Y-m-d H:i:s", mktime(19, 30, 0, 5, 14, 2024)),
        //     date("Y-m-d H:i:s", mktime(18, 00, 0, 5, 14, 2024))
        // );
        
        foreach ($parameters as $parameter)
        {
            if ($parameter == "reservationsInWeek")
            {
                $reservations = (isset($_GET['date']))? ReservationManager::getReservationsinWeek( date('Y-m-d', strtotime($_GET['date']))) : ""; 
                $this->data["reservations"] = $reservations;
                $this->data["reservationsJSON"] = json_encode($reservations);
            }
        }
        
        // DEBUG
        // $lane = LaneManager::getLaneById(1);
        // $overlapingReservations = ReservationManager::getOverlapingReservations('2024-04-02 15:00:00', '2024-04-02 17:59:00', $lane);

        // $reservations = ReservationManager::getAllReservations();

        
        // TEST RESERVATION IN DATABASE 2024-04-02 16:00:00, ! 2024-05-13 17:30:00 !
        // $reservations = ReservationManager::getReservationsAfterDate('2024-05-20');
                

        // test 
        $this->data["parametry"] = $parameters;
        $this->data["testDate"] = date('Y-m-d', strtotime($_GET['date'])) ;
        $this->view = "reservations";
    }
}

// SELECT * 
// FROM reservation 
// 			-- Start rezervace												  	end rezervace
// WHERE start > STR_TO_DATE('2023-04-02 16:00:00', '%Y-%m-%d %H:%i:%s') AND start < STR_TO_DATE('2023-04-02 16:30:00', '%Y-%m-%d %H:%i:%s') ;
