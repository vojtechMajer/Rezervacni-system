<?php
abstract class Controller
{
    protected $view = ""; // název souboru s pohledem (bez přípony .phtml)
    protected $data = []; // data kontroleru // např. pro sdílení mezi metodami

    abstract public function load($parameters);

    public function showView()
    {
        extract($this->data); // "rozbalení" pole data do jednotlivých proměnných, pojmenovaných podle klíčů v poli data
        require "views/{$this->view}.phtml";
    } 

    protected function redirect($url)
    {
        header("Location: /$url");
        exit;
    }
}