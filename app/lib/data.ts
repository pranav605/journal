import { sql } from "@vercel/postgres";
import { Journal } from "./defenitions";

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

export async function getTimeZoneByIP(ip: string) {
    try{
        const res = await fetch(`https://timeapi.io/api/time/current/ip?ipAddress=${ip}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await res.json();

        return json;
    } catch(error){
        console.error('Failed to get timezone for this ip: ',error);
        throw new Error('Failed to get timezone for this ip');
        
    }
}

export async function getJournals(id: string){
    try{
        const data = await sql<Journal>`SELECT * FROM journals where id=${id};`
    } catch(error){
        console.error('Failed to fetch journals: ',error);
        throw new Error('Failed to fetch journals');
    }
}   