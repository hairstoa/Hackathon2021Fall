import React, {useState} from "react";
import Axios from "axios";

const getDroughtStats = async (FIPS) => {
    // get today's date
    const timeElapsed = Data.now();
    const today = new Date(timeElapsed);

    Axios.get(`https://usdmdataservices.unl.edu/api/CountyStatistics/GetDroughtSeverityStatisticsByAreaPercent?aoi=${FIPS}&startdate=${today.toLocaleDateString()}&enddate=${today.toLocaleDateString()}&statisticsType=2`)
        .then((response) => {
            console.log(response)
        });
}