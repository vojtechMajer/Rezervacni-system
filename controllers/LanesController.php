<?php

class LanesController extends Controller
{
    public function load($parameters)
    {   
        $lines = LaneManager::getLanes();
        
        $this->data["lanes"] = $lines;
        
        $this->view = "lanes";
    }
}