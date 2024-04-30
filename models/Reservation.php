<?php 

class Reservation
{
    public $id;
    public $type;
    public Lane $lane;
    public $startDate;
    public $endDate;

    public function __construct($id, $type, Lane $lane, $startDate, $endDate)
    {
        $this->id = $id;
        $this->type = $type;
        $this->lane = $lane;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

}