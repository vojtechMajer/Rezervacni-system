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

        $this->data["reservationTypes"] = ReservationManager::getReservationTypes();

        $user = $userManager->getLoggedUser();
        $this->data["user"] = $user;

        if (!empty($_POST)) {
            // $_POST['lane-number'] $_POST['start-date']; $_POST['end-date']
            $lanes = $_POST['lane-number'];

            foreach ($lanes as $index => $lane) {

                $lane = LaneManager::getLaneById($_POST['lane-number'][$index]);

                $reservationType = ReservationType::getReservationTypesById((empty($_POST['reservation-type']) ? 0 : $_POST['reservation-type']));

                $startDate = $_POST["start-date"][$index];
                $endDate = $_POST["end-date"][$index];

                if (ReservationManager::reservationOverlaps($startDate, $endDate, $lane)) {
                    $this->addMessage("1 nebo více rezervací se překrývají s již existujícími rezervacemi");
                    $this->redirect("createReservation");
                }

                $addedReservation = ReservationManager::addReservation($lane, $reservationType, $startDate, $endDate);

                // 0 -> host uživatel
                ReservationManager::createOrder($addedReservation, ($user == false) ? 0 : $user["id_user"]);
            }
        }

        $this->view = "createReservation";
    }

}