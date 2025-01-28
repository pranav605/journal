export type Journal={
    id:string;
    title:string;
    created_on:string;
    updated_on:string;
    locked:boolean;
    password:string;
    template:number;
    user_id:string;
}

export type Entry={
    id:string;
    journal_id:string;
    content:string;
    created_on:string;
    updated_on:string;
    font:string;
    text_color:string;
    background_color:string;
}