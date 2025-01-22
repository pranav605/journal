
export async function getAllTimeZones(){
    try{
        const res = await fetch('https://timeapi.io/api/timezone/availabletimezones',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await res.json();
        
        return json;

    } catch(error){
        console.error('Failed to fetch Timezones: ',error);
        throw new Error('Failed to fetch timezones');
    }
}