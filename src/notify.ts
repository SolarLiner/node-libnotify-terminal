import { exec } from "child-process-promise";
import { inspect } from "util";

export interface Action {
    id: string;
    name: string;
}

export class Notification {
    isReply: boolean;
    replyRecipient: string;
    replyMessage: string;
    actions: Action[]
    /**
     * Instanciates a new Libnotify notification.
     * @param appname Name of the application.
     * @param body Notification body (optional).
     * @param title Notification title (optional).
     * @param subtitle Notification subtitle. Will be shown as first line of the body where separate subtitle line is not available. (optional)
     */
    constructor(public app_name: string, public body: string, public title?: string, public subtitle?: string) {
        this.isReply = false;
        this.replyRecipient = null;
        this.replyMessage = null;
        this.actions = new Array<Action>(0);
    }

    /**
     * Sets basic information for notifications
     * @param basic.title Title of the notification
     * @param basic.subtitle Subtitle of the notification
     * @param basic.body Body of the subtitle
     */
    set_basic(basic: { body: string, title?: string, subtitle?: string }): void {
        if (basic.title)
            this.title = basic.title;
        if (basic.subtitle)
            this.subtitle = basic.subtitle;
        if (basic.body)
            this.body = basic.body;
    }

    set_appname(appname: string): void {
        this.app_name = appname;
    }
    get_appname(): string {
        return this.app_name;
    }

    add_action(action: Action): void {
        if(action.id.search(" ") > 0)
            throw "Spaces in id not allowed";

        this.actions.push(action);
    }
    remove_action(action_id: string): void {
        this.actions = this.actions.filter((a) => {return a.id !== action_id});
    }
    clear_actions(): void {
        this.actions.length = 0;
    }

    set_reply(recipient: string, message?: string): void {
        this.isReply = true;
        this.replyRecipient = recipient;
        if(message)
            this.replyMessage = message;
    }
    unset_reply(): void {
        this.isReply = false;
        this.replyRecipient = null;
        this.replyMessage = null;
    }
    set_reply_message(message: string): void {
        if(!this.isReply)
            throw "Should set notification as reply before setting message";
            
        this.replyMessage = message;
    }

    show(): Promise<{action?: Action, message?: string}> {
        return new Promise((resolve, reject) => {
            let cmd = ['../bin/libnotify-terminal'];
            if(this.app_name) cmd.push(`--app-title "${this.app_name}"`);
            if(this.title) cmd.push(`--title "${this.title}"`);
            if(this.subtitle) cmd.push(`--subtitle "${this.subtitle}"`);
            if(this.isReply) {
                cmd.push(`--reply --reply-to "${this.replyRecipient}"`);
                if(this.replyMessage) cmd.push(`--reply-message "${this.replyMessage}"`);
            }

            this.actions.forEach(action => {
                cmd.push(`--action "${action.id},${action.name}"`);
            });

            exec(cmd.join(" ")).then((res: {stdout: string, stderr: string}) => {
                let out = res.stdout.trim();
                let action = this.actions.filter((a) => {return a.id === out});
                if(action.length > 0){
                    console.log(`Action fired: ${action[0].id}`);
                    resolve({'action': action[0]});
                }
                else if(out.length>0) {
                    console.log(`Got reply: ${out}`);
                    resolve({'message': out});
                }
                else {
                    console.log('Notification closed');
                    resolve(null);
                }
            }).catch((err: Error) => {
                console.log(`Error: ${err.message}`);
                reject(err);
            })
        });
    }
}
