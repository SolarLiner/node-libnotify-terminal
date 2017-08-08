import { assert } from 'chai';
import { Notification } from "./notify";

describe("Notification class", () => {
    describe("Basic setup", () => {
        it("should register a Notification", () => {
            let notification = new Notification("App name", "Body", "Title", "Subtitle");
            assert.instanceOf(notification, Notification);
            assert.strictEqual(notification.app_name, "App name");
        });
        it("should be able to be changed", () => {
            let notificaton = new Notification("app", "body");
            notificaton.set_appname("new name");
            assert.strictEqual(notificaton.app_name, "new name")
            
            notificaton.set_basic({body: "The body", title: "New title"});
            assert.strictEqual(notificaton.title, "New title");
            assert.strictEqual(notificaton.body, "The body");
        })
    })
})