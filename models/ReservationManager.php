<?php
class ReservationManager
{
    public function getReservations()
    {
        $reservationsQuery = array();
        $reservationsQuery = Db::queryAll("select * from reservation");

        $laneManager = new LaneManager();
        $lane = $laneManager->getLaneById($reservationsQuery["id_lane"]);
        $reservations = array();
        foreach ($reservationsQuery as $reservationQuery)
        {
            $reservations[] = new Reservation($reservationQuery["id_reservation"], $reservationQuery["id_reservation_type"], $lane,  $reservationQuery["start"], $reservationQuery["date"] );
        }
        
        return $reservations;
    }

    public function addReservation(Lane $lane, $reservationType, $startDate, $endDate)
    {
        $sql = "insert into reservation (id_reservation_type, id_lane, start, end) VALUES ($reservationType, $lane->id, '$startDate', '$endDate')";
        Db::query($sql);
    }

    public function getReservationTypeNames()
    {
        $reservationTypes = array();
        $reservationTypes = Db::queryOne("select * from reservation_type");
        return $reservationTypes["name"];
    }
}// insert into reservation(id_reservation_type, id_reservation, id_lane, start, end) VALUES (1, 1, "2024-04-23 14:00:01", "2024-04-23 14:00:01")