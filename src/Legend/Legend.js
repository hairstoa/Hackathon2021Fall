import React from 'react';


function Legend(){
    return (
      
        <div>
            <table className = 'table'>
                <thead>
                    <tr  className = 'top-row'>
                        <th className = 'th-element'>Category</th>
                        <th className = 'th-element'>Description</th>
                        <th className = 'th-element'>Possible Impacts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className = 'table-row'>
                        <td className = 'table-data'>D0</td>
                        <td className = 'table-data'>Abnormally Dry</td>
                        <td className = 'table-data'>
                            <p>short-term dryness slowing planting, growth of crops or pastures </p>
                            <p>some lingering water deficits</p> 
                        </td>
                    </tr>

                    <tr className = 'table-row'>
                        <td className = 'table-data'>D1</td>
                        <td className = 'table-data'>Moderate Drought</td>
                        <td className = 'table-data'>
                            <p>some damage to crops and pastures </p>
                            <p>water shortages developing/imminent</p>  
                        </td>
                    </tr>

                    <tr className = 'table-row'>
                        <td className = 'table-data'>D2</td>
                        <td className = 'table-data'>Severe Drought</td>
                        <td className = 'table-data'>
                            <p>crop or pasture losses likely</p>
                            <p>water shortages common</p> 
                        </td>
                    </tr>

                    <tr className = 'table-row'>
                        <td className = 'table-data'>D3</td>
                        <td className = 'table-data'>Extreme Drought</td>
                        <td className = 'table-data'>
                            <p>major crop/pasture loss</p>
                            <p>widespread water shortages or restrictions</p> 
                        </td>
                    </tr>

                    <tr className = 'table-row'>
                        <td className = 'table-data'>D4</td>
                        <td className = 'table-data'>Exceptional Drought</td>
                        <td className = 'table-data'>
                            <p>exception and widespread crop/pasture loss</p>
                            <p>water emergencies</p> 
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>

    );
}

export default Legend;


