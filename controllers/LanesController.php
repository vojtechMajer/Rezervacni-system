<?php

class LanesController extends Controller
{

    public function __construct()
    {
        $this->dontShowLayout = true;
    }
    public function load($parameters)
    {
        $lines = LaneManager::getLanes();

        $this->data["lanesJSON"] = json_encode($lines);

        $this->view = "lanes";
    }
}