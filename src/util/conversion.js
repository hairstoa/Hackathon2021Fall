// Convert latitude and longitude coordinates to object
exports.coord_to_region =  async function(latitude, longitude, callback) {
    try {
        let uri = `https://geo.fcc.gov/api/census/area?lat=${latitude}&lon=${longitude}`;
        const response = await fetch(uri);
        const res = await response.json();

        if (res.results && res.results[0]) {
            let regionObject = {
                lat: latitude, 
                lon: longitude,
                fips: res.results[0].county_fips,
                county_name: res.results[0].county_name,
                state_name: res.results[0].state_name,
                state_code: res.results[0].state_code,
            }
            if (typeof callback == "function")
            callback(regionObject);
         }    
    } catch (error) {
        console.log(error);
    }

}
