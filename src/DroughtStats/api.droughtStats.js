import Axios from "axios";

export const getDroughtStats = (FIPS) => {
    // get today's date
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const categories = [];

    Axios.get(`https://usdmdataservices.unl.edu/api/CountyStatistics/GetDroughtSeverityStatisticsByAreaPercent?aoi=${FIPS}&startdate=${today.toLocaleDateString()}&enddate=${today.toLocaleDateString()}&statisticsType=1`)
        .then((response) => {
            const data = response.data[0];
            for (const [key, value] of Object.entries(data)) {
                if ( (key == "None") || (key == "D0") || (key == "D1") || (key == "D2") || (key == "D3") || (key == "D4") ) {
                    categories.push(`${key}: ${value}`);
                }
            }
            console.log(categories);
            return categories;
        });
};