<?php 

class Lane
{
    public $id;
    public $hasBlocks;

    public function __construct($id, $hasBlocks)
    {    
        $this->id = $id;
        $this->hasBlocks = $hasBlocks;
    }

}