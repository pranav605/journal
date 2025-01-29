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

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};


export type Entry={
    id:string;
    journal_id:string;
    content:string;
    created_on:string;
    updated_on:string;
    font:string;
    text_color:string;
    background_color:string;
    background_image:string;
    font_size:number;
}