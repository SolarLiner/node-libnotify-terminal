/// <reference path="refs.ts"/>
import { exec } from "child-process-promise";
import { inspect } from "util";

export class Notification {
    data: AppData;
    /**
     * Instanciates a new Libnotify notification.
     * @param appname Name of the application.
     * @param body Notification body (optional).
     * @param title Notification title (optional).
     * @param subtitle Notification subtitle. Will be shown as first line of the body where separate subtitle line is not available. (optional)
     */
    constructor(appname: string, body?: string, title?: string, subtitle?: string) {
        this.data = {
            app_name: appname,
            title: title,
            subtitle: subtitle,
            body: body,
            isReply: false,
            replyRecipient: undefined,
            actions: null
        };
    }

    /**
     * 
     * @param basic 
     */
    set_basic(basic: { title?: string, subtitle?: string, body?: string }): void {
        if (basic.title)
            this.data.title = basic.title;
        if (basic.subtitle)
            this.data.subtitle = basic.subtitle;
        if (basic.body)
            this.data.body = basic.body;
    }
}