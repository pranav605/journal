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

export async function getTimeZoneByJournal(journalId: string){
    try{
        const data = await sql`SELECT timezone FROM users WHERE id=(SELECT user_id FROM journals WHERE id=${journalId});`
        if(data.rows.length >0){
            return data.rows[0].timezone;
        }else{
            return 'UTC';
        }
    } catch(error){
        console.error('Failed to fetch timezone for this user: ',error);
        throw new Error('Failed to fetch timezone for this user');
    }
}

export async function getTimeByZone(zone: string){
    try{
        const res = await fetch(`https://timeapi.io/api/time/current/zone?timeZone=${zone}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await res.json();
        return json;
    } catch(error){
        console.error('Failed to get time for this zone: ',error);
        throw new Error('Failed to get time for this zone');
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

export async function getJournalEntry(journalId: string, entryId: string): Promise<any> {
    try {
        const result = await sql`
            SELECT * FROM entries WHERE journal_id = ${journalId} AND id = ${entryId}
        `;
        if (result.rowCount && result.rowCount > 0) {
            return result.rows[0];
        }
        return {};
    } catch (error) {
        console.error('Error fetching journal entry:', error);
        return {};
    }
}