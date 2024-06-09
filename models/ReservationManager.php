<?php
class ReservationManager
{
    private static function queryToReservations($query)
    {
        $reservations = array();
        foreach ($query as $reservationQuery) {
            $lane = LaneManager::getLaneById($reservationQuery["id_lane"]);

            $reservations[] =
                new Reservation($reservationQuery["id_reservation"], $reservationQuery["id_reservation_type"], $lane, $reservationQuery["start"], $reservationQuery["end"]);
        }
        return $reservations;
    }
    public static function getAllReservations()
    {
        $reservationsQuery = array();
        $reservationsQuery = Db::queryAll("select * from reservation");

        $reservations = ReservationManager::queryToReservations($reservationsQuery);

        return $reservations;
    }

    /**
     * date format is yyy-mm-dd
     */
    public static function getReservationsAfterDate($date)
    {
        $reservationsQuery = Db::queryAll("select * from reservation where YEARWEEK(start, 1) = YEARWEEK( STR_TO_DATE('$date', '%Y-%m-%d'), 1)");
        $reservations = ReservationManager::queryToReservations($reservationsQuery);

        return $reservations;
    }


    /**
     * date format is yyy-mm-dd
     */
    public static function getReservationsInWeek($date)
    {
        $reservationsQuery = Db::queryAll(" SELECT *
            FROM   reservation
            WHERE  YEARWEEK(start, 1) = YEARWEEK(?, 1)",
            [$date]
        );

        $reservations = array();
        foreach ($reservationsQuery as $reservationQuery) {
            $lane = LaneManager::getLaneById($reservationQuery["id_lane"]);

            $reservations[] =
                new Reservation($reservationQuery["id_reservation"], $reservationQuery["id_reservation_type"], $lane, $reservationQuery["start"], $reservationQuery["end"]);
        }

        return $reservations;
    }

    public static function getReservationsOnDate($date)
    {
        $reservationsQuery = Db::queryAll(" SELECT *
            FROM   reservation
            WHERE  Date(start) = STR_TO_DATE(?, '%Y-%m-%d')",
            [$date]
        );

        $reservations = array();
        foreach ($reservationsQuery as $reservationQuery) {
            $lane = LaneManager::getLaneById($reservationQuery["id_lane"]);

            $reservations[] =
                new Reservation($reservationQuery["id_reservation"], $reservationQuery["id_reservation_type"], $lane, $reservationQuery["start"], $reservationQuery["end"]);
        }

        return $reservations;
    }



    public static function addReservation(Lane $lane, ReservationType $reservationType, $startDate, $endDate)
    {
        $sql = "insert into reservation (id_reservation_type, id_lane, start, end) VALUES (?, ?, ?, ?)";

        Db::query($sql, [$reservationType->id, $lane->id, $startDate, $endDate]);
    }

    public static function getOverlapingReservations($startDate, $endDate, Lane $lane)
    {
        $sql = "select * from reservation
        where ( start <= STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s') AND end >= STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s')) 
        AND id_lane = ? ";

        $query = Db::queryAll($sql, [$endDate, $startDate, $lane->id]);

        $overlapReservations = array();

        foreach ($query as $row) {
            $lane = LaneManager::getLaneById($row["id_lane"]);
            $overlapReservations[] = new Reservation($row['id_reservation'], $row['id_reservation_type'], $lane, $row['start'], $row['end']);
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