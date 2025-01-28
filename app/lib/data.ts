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
        const data = await sql<Journal>`SELECT * FROM journals where user_id=${id};`
        return data;
    } catch(error){
        console.error('Failed to fetch journals: ',error);
        throw new Error('Failed to fetch journals');
    }
}   

export async function getUserIdByEmail(email: string): Promise<string> {
    try {
        const result = await sql`
            SELECT id FROM users WHERE email = ${email}
        `;
        if (result.rowCount && result.rowCount > 0) {
            return result.rows[0].id;
        }
        return 'not found';
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return 'not found';
    }
}

export async function getJournalPassword(journalId: string): Promise<string> {
    try {
        const result = await sql`
            SELECT password FROM journals WHERE id = ${journalId}
        `;
        if (result.rowCount && result.rowCount > 0) {
            return result.rows[0].password;
        }
        return '';
    } catch (error) {
        console.error('Error fetching journal password:', error);
        return '';
    }
}

export async function getJournalEntries(journalId: string): Promise<any[]> {
    try {
        const result = await sql`
            SELECT * FROM entries WHERE journal_id = ${journalId}
        `;
        return result.rows;
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        return [];
    }
}