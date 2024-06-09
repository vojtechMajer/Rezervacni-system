<?php

class ReservationType
{
    public $id;
    public $name;

    public function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

    public static function getReservationTypes()
    {
        $query = Db::queryAll("select * from reservation_type");
        $reservationTypes = [];

        foreach ($query as $row) {
            $reservationTypes[] = new ReservationType($row["id_reservation_type"], $row["name"]);
        }

        return $reservationTypes;
    }

    public static function getReservationTypesById($id)
    {
        $reservationType = DB::queryOne("select * from reservation_type where id_reservation_type = ? ", [$id]);
        return new ReservationType($reservationType["id_reservation_type"], $reservationType["name"]);
    }

}