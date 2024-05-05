<?php
require "init.php";

$smerovac = new RouteController();
$smerovac->load([$_SERVER["REQUEST_URI"]]);
$smerovac->showView();