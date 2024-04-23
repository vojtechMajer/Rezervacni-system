<?php
session_start();

function loadClass($className)
{
    if (preg_match("/Controller$/", $className)) 
        require "controllers/$className.php";
    else
        require "models/$className.php";
}

spl_autoload_register("loadClass");

Db::connect("localhost", "root", "", "bowling");
