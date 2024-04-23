<?php
class ReservationManager
{
    public function getReservations()
    {
        $reservations = array();
        $reservations = Db::queryAll("select * from reservation");
        return $reservations;
    }

    public function addReservation(Lane $lane, $reservationType, $startDate, $endDate)
    {
        $sql = "insert into reservation ($reservationType, $lane->id, '$startDate', '$endDate')";
        Db::query($sql);
    }

}// insert into reservation(id_reservation_type, id_reservation, id_lane, start, end) VALUES (1, 1, "2024-04-23 14:00:01", "2024-04-23 14:00:01")