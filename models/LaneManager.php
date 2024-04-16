<?php 

class LaneManager {

    public function getLanes()
    {
        $lanesData = DB::queryAll("select * from lane");
        $lanes = [];
        
        foreach($lanesData as $laneData)
        {
            $lanes[] = new Lane($laneData["id_lane"], $laneData["gates"]);
        }

        return $lanes;
    }

    public function getLaneById($id)
    {
        $lane = DB::queryOne("select * from lanes where id_lane == ? ", $id); 
        return new Lane($lane["id_lane"], $lane["gates"]);
    }

}
