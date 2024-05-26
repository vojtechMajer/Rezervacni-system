<?php

class CreateReservationController extends Controller
{
    public function load($parameters)
    {
        $userManager = new UserManager();

        if (!empty($_POST)) {
            $lane = LaneManager::getLaneById($_POST["lane"]);
            $reservationType = ReservationType::getReservationTypesById($_POST["reservation_type"]);

            if ($_POST["start_date"] === $_POST["end_date"]) {
                $this->addMessage("rezervace nemůže začínat a končit ve stejný čas");
                $this->redirect("createReservation");
            }

            ReservationManager::addReservation($lane, $reservationType, $_POST["start_date"], $_POST["end_date"]);

        }

        $this->data["reservationTypes"] = ReservationType::getReservationTypes();
        $this->data["lanes"] = LaneManager::getLanes();


        $user = $userManager->getLoggedUser();

        // id_user_type je 1 jesti je uživatel admin
        if (empty($user)) {
            $this->data["userType"] = 0;
            $this->data["userId"] = 0;
        } else {
            $this->data["userType"] = $user["id_user_type"];
            $this->data["userId"] = $user["id_user"];

        }


        $this->view = "createReservation";
    }
}