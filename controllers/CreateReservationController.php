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
                $userId = $userManager->getLoggedUser()["user_id"];
                // 0 -> host uživatel
                ReservationManager::createOrder($addedReservation, (empty($userId)) ? 0 : $userId);
            }
        }

        $this->view = "createReservation";
    }

}




/* $lane = LaneManager::getLaneById($_POST["lane"]);
$reservationType = ReservationType::getReservationTypesById($_POST["reservation_type"]);

if ($_POST["start_date"] === $_POST["end_date"]) {
    $this->addMessage("rezervace nemůže začínat a končit ve stejný čas");
    $this->redirect("createReservation");
}
ReservationManager::addReservation($lane, $reservationType, $_POST["start_date"], $_POST["end_date"]);
*/
