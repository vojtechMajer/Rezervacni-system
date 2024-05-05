<?php
class ReservationManager
{
    public static function getReservations()
    {
        $reservationsQuery = array();
        $reservationsQuery = Db::queryAll("select * from reservation");

        $reservations = array();
        foreach ($reservationsQuery as $reservationQuery)
        {
            $lane = LaneManager::getLaneById($reservationQuery["id_lane"]);

            $reservations[] = 
            new Reservation($reservationQuery["id_reservation"], $reservationQuery["id_reservation_type"], $lane,  $reservationQuery["start"], $reservationQuery["end"] );
        }
        
        return $reservations;
    }

    public static function addReservation(Lane $lane,ReservationType $reservationType, $startDate, $endDate)
    {
        $sql = "insert into reservation (id_reservation_type, id_lane, start, end) VALUES ($reservationType->id, $lane->id, '$startDate', '$endDate')";

        Db::query($sql);
    }

    public static function getOverlapingReservations($startDate, $endDate, Lane $lane)
    {
        $sql = "select * from reservation
        
        where ( start <= STR_TO_DATE('$endDate', '%Y-%m-%d %H:%i:%s') AND end >= STR_TO_DATE('$startDate', '%Y-%m-%d %H:%i:%s')) 
        AND id_lane = '$lane->id' ";
        
        $query = Db::queryAll($sql);
        
        $overlapReservations = array();
        foreach ($query as $row)
        {
            $lane = LaneManager::getLaneById($row["id_lane"]);
            $overlapReservations[] = new Reservation($row['id_reservation'], $row['id_reservation_type'], $lane, $row['start'], $row['end'] ); 
        }

        return $overlapReservations;
    }

    public static function getReservationTypeNames()
    {
        $reservationTypes = array();
        $reservationTypes = Db::queryOne("select * from reservation_type");
        return $reservationTypes["name"];
    }
}// insert into reservation(id_reservation_type, id_reservation, id_lane, start, end) VALUES (1, 1, "2024-04-23 14:00:01", "2024-04-23 14:00:01")