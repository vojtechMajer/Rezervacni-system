<?php
require "init.php";

$smerovac = new RouteController();

$smerovac->load([$_SERVER["REQUEST_URI"]]);

if ($smerovac->controller->dontShowLayout == true)
    $smerovac->controller->showView();
else {
    $smerovac->showView();
}
