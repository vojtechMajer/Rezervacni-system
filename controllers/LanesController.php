<?php

class LanesController extends Controller
{
    public function load($parameters)
    {
        $laneManager = new LaneManager();
        
        $lines = $laneManager->getLanes();
        
        $this->data["lanes"] = $lines;
        
        $this->view = "lanes";
    }
}