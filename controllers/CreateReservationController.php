<?php

class CreateReservationController extends Controller 
{
    public function load($parameters)
    {
        $userManager = new UserManager();

        if(!empty($_POST))
        {
            $lane = LaneManager::getLaneById($_POST["lane"]);
            $reservationType = ReservationType::getReservationTypesById($_POST["reservation_type"]);
            
            echo $_POST["start_date"];
            echo '<br>';
            echo $_POST["end_date"];


            if($_POST["start_date"] === $_POST["end_date"])
            {
                $this->addMessage("rezervace nemůže začínat a končit ve stejný čas");
            }   

        //          _                        |---- DateRange A ------|
        //          |---Date Range B -----|                           _
        

        //          _                        |---- DateRange A ------|
        //                  |---Date Range B -----|                  _ 

        //        WHERE start > STR_TO_DATE('$startDate', '%Y-%m-%d %H:%i:%s') AND start < STR_TO_DATE('$endDate') ;        
        $reservation = new Reservation(0, $reservationType, $lane, $_POST["start_date"], $_POST["end_date"]);

        ReservationManager::addReservation( $lane, $reservationType, $_POST["start_date"], $_POST["end_date"]);

        }
        
        $this->data["reservationTypes"] = ReservationType::getReservationTypes();
        $this->data["lanes"] = LaneManager::getLanes();

        $user = $userManager->getLoggedUser();
        // id_user_type je 1 jesti je uživatel admin
        $this->data["userType"] = $user["id_user_type"];
        $this->data["userId"] = $user["id_user"];


        $this->view = "createReservation";
    }
}