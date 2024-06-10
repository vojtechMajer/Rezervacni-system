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
Db::connect("152.70.163.36", "vmajer", "password", "bowling");
