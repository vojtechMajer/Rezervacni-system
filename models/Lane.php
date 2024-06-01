<?php 

class Lane
{
    public $id;
    public $safeGuard;

    public function __construct($id, $safeGuard)
    {    
        $this->id = $id;
        $this->safeGuard = $safeGuard;
    }

}