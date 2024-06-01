<?php 

class Lane
{
    public $id;
    public $safeGuard;
    public $BlockedTime = ["1","test","mamals"];

    public function __construct($id, $safeGuard)
    {    
        $this->id = $id;
        $this->safeGuard = $safeGuard;
    }

}