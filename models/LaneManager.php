<?php 

class LaneManager {

    public static function getLanes()
    {
        $query = DB::queryAll("select * from lane");
        $lanes = [];
        
        foreach($query as $row)
        {
            $lanes[] = new Lane($row["id_lane"], $row["gates"]);
        }

        return $lanes;
    }

    public static function getLaneById($id)
    {
        $lane = DB::queryOne("select * from lane where id_lane = ? ", [$id]); 
        return new Lane($lane["id_lane"], $lane["gates"]);
    }

}
