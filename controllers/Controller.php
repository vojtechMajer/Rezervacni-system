<?php
abstract class Controller
{
    protected $view = ""; // název souboru s pohledem (bez přípony .phtml)
    protected $data = []; // data kontroleru // např. pro sdílení mezi metodami

    protected $loggedUser;

    public function __construct() {
        $userManager = new UserManager();

        $this->loggedUser = $userManager->getLoggedUser();
    }

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

    protected function addMessage($text)
    {
        $_SESSION["messages"][] = ["text" => $text];
    }
    protected function getMessages()
    {
        $messages = $_SESSION["messages"] ?? [];
        unset($_SESSION["messages"]);
        return $messages;
    }
}