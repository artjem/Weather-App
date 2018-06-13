function TimeLine(){

    var date = new Date();

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var nd = d+3;


    this.clock = new Cesium.Clock({
        startTime : Cesium.JulianDate.fromIso8601(y+"-"+m+"-"+d),
        currentTime : Cesium.JulianDate.fromIso8601(y+"-"+m+"-"+d),
        stopTime : Cesium.JulianDate.fromIso8601(y+"-"+m+"-"+nd),
        clockRange : Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
        clockStep : Cesium.ClockStep.SYSTEM_CLOCK  // how much time to advance each tick
    });

};