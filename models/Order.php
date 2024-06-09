<?php

class Order
{
    public $id;
    public Reservation $reservation;
    public $userId;

    public function __construct($id, Reservation $reservation, $userId)
    {
        $this->id = $id;
        $this->reservation = $reservation;
        $this->userId = $userId;
    }
}