export interface User {
    id: string;
    role: string;
    created_at: string;
    updated_at: string;
    last_active: string;
    banned: boolean;
    online: boolean;
    name: string;
    channel_unread_count?: number;
    channel_last_read_at?: string;
    total_unread_count?: number;
    unread_channels?: number;
    unread_count?: number;
}

export interface Message {
    id?: string;
    text: string;
    type?: string;
    user?: User;
    cid?: string;
    created_at?: string;
    html?: string;
    args?: string;
    attachments?: any[];
    latest_reactions?: any[];
    own_reactions?: any[];
    reaction_counts?: number;
    reaction_scores?: any;
    reply_count?: number;
    updated_at?: string;
    shadowed?: boolean;
    mentioned_users?: User[];
    silent?: boolean;
    pinned?: boolean;
    pinned_at?: string;
    pinned_by?: string; // ? is this right
    pin_expires?: string;
    mml?: string;
}
export interface StreamCommandRequestBody {
    type: string;
    cid: string;
    channel_id: string;
    channel_type: string;
    message?: Message | ITradeMMLMessage;
    user: User;
    form_data: {
        action: string;
        name: string;
        email: string;
    };
}

export interface ITradeMML {
    username:string
    tickerSymbol:string
    tradeType:string 
}

export interface ITradeMMLMessage extends Message{
    user_id: string
    text: string
    command: string
    attachments: {
        type: string
        mml: string
        tickerSymbol: string
        actions: {
            name: string
            text: string
            type: string
            value: string
        }[]
    }[]
}