<?php

class CreateReservationController extends Controller
{
    function __construct()
    {
        $this->css = ["./css/nav.css", "css/reservations.css"];
    }

    public function load($parameters)
    {
        $userManager = new UserManager();

        if (!empty($_POST)) {
            // $_POST['lane-number'] $_POST['start-date']; $_POST['end-date']
            $lanes = $_POST['lane-number'];

            foreach ($lanes as $index => $lane) {

                $lane = LaneManager::getLaneById($_POST['lane-number'][$index]);
                $reservationType = ReservationType::getReservationTypesById(2);

                $startDate = $_POST["start-date"][$index];
                $endDate = $_POST["end-date"][$index];

                if (ReservationManager::reservationOverlaps($startDate, $endDate, $lane)) {
                    $this->addMessage("1 nebo více rezervací se překrývají s již existujícími rezervacemi");
                    $this->redirect("createReservation");
                }

                $addedReservation = ReservationManager::addReservation($lane, $reservationType, $startDate, $endDate);
                // 0 -> host uživatel
                ReservationManager::createOrder($addedReservation, (empty($this->loggedUser["user_id"])) ? 0 : $this->loggedUser["user_id"]);
            }
        }

        $this->view = "createReservation";
    }

}