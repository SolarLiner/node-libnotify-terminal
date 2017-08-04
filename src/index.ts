import { exec } from "child-process-promise";
import { inspect } from "util";

/**
 * Defines an action button
 */
interface Action {
    id: string;
    name: string;
}

interface AppData {
    app_name: string;
    title: string;
    subtitle: string;
    body: string;
    isReply: boolean;
    replyRecipient: string;
    actions: Action[]
}

class LibNotify {
    data: object;
    constructor(appname: string, body: string, title: stirng, subtitle: string) {
        this.data
    }
}