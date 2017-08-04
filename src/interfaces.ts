export interface Action {
    id: string;
    name: string;
}

/**
 * Defines the state of application data as required by the notification handle 
 */
export interface AppData {
    app_name: string;
    title: string;
    subtitle: string;
    body: string;
    isReply: boolean;
    replyRecipient: string;
    actions: Action[]
}