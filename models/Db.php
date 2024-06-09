<?php
// Wrapper pro snadnější práci s databází s použitím PDO a automatickým
// zabezpečením parametrů (proměnných) v dotazech.
class Db
{
	// Databázové spojení
	private static $database;

	// Výchozí nastavení ovladače
	private static $settings = array(
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_EMULATE_PREPARES => false,
	);

	// Připojí se k databázi pomocí daných údajů
	public static function connect($server, $user, $password, $databaseName)
	{
		if (!isset(self::$database)) {
			$dsn = "mysql:host=$server;dbname=$databaseName;charset=utf8";
			self::$database = new PDO(
				$dsn,
				$user,
				$password,
				self::$settings
			);
		}
	}

	// Spustí dotaz a vrátí z něj první řádek
	public static function queryOne($query, $parameters = array())
	{
		$navrat = self::$database->prepare($query);
		$navrat->execute($parameters);
		return $navrat->fetch();
	}

	// Spustí dotaz a vrátí všechny jeho řádky jako pole asociativních polí
	public static function queryAll($query, $parameters = array())
	{
		$navrat = self::$database->prepare($query);
		$navrat->execute($parameters);
		return $navrat->fetchAll();
	}

	// Spustí dotaz a vrátí z něj první sloupec prvního řádku
	public static function queryRow($query, $parameters = [])
	{
		$vysledek = self::queryOne($query, $parameters);
		return $vysledek[0];
	}

	// Spustí dotaz a vrátí počet ovlivněných řádků
	public static function query($query, $parameters = array())
	{
		$stmt = self::$database->prepare($query);
		$stmt->execute($parameters);
		return $stmt->rowCount();
	}

	public static function execute($query, $parameters = array())
	{
		$stmt = self::$database->prepare($query);
		return $stmt->execute($parameters);
	}

	// Vloží do tabulky nový řádek jako data z asociativního pole
	public static function insert($table, $parameters = array())
	{
		return self::query(
			"INSERT INTO $table (" . implode(', ', array_keys($parameters)) . ") VALUES (" . str_repeat('?,', sizeOf($parameters) - 1) . "?)",
			array_values($parameters)
		);
	}

	// Změní řádek v tabulce tak, aby obsahoval data z asociativního pole
	public static function change($table, $values = array(), $podminka, $parameters = array())
	{
		return self::query(
			"UPDATE $table SET " .
			implode(' = ?, ', array_keys($values)) .
			" = ? " . $podminka,
			array_merge(array_values($values), $parameters)
		);
	}

	// Vrací ID posledně vloženého záznamu
	public static function lastInsertId()
	{
		return self::$database->lastInsertId();
	}
}