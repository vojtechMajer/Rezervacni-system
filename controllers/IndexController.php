<?php

class IndexController extends Controller 
{
    public function load($parameters)
    {
        $this->view = "index";
        $this->css = ["./css/nav.css", "css/index.css"];
    }
}