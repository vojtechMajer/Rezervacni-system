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
        $sql = "insert into 'reservation' ($reservationType, $lane->id, '$startDate', '$endDate')";
        Db::query($sql);
    }

}