import { Notification, Action } from "../src/index";
import { assert } from "chai";

describe('Notification declaration', () => {
    it('should properly instanciate itself', () => {
        const n = new Notification('test', 'This is a test');
        // expect(n.app_name, 'n.app_name').equals('test', 'is set properly');
        // expect(n.body, 'n.body').equals('This is a test', 'is set properly');
        assert.instanceOf(n, Notification, 'notification has been defined');
        assert.strictEqual(n.app_name, 'test', 'app name to be set');
        assert.strictEqual(n.body, 'This is a test', "notification body to be set");
    });
    it('should properly rename app and/or details', () => {
        let n = new Notification('test', 'test');
        n.set_basic({body: "This is the body", title: "Title", subtitle: "Subtitle"});
        // expect(n.title, 'notification title').equals("Title", 'to be properly set');
        // expect(n.subtitle, 'notification subtitle').equals('Subtitle', "to be properly set");
        // expect(n.body, 'notification body').equals('This is the body', 'to be properly set');
        assert.isNotNull(n.title, 'notification title has been defined');
        assert.isNotNull(n.subtitle, 'notification subtitle title has been defined');        
        assert.strictEqual(n.title, 'Title', 'notification title is properly set');
        assert.strictEqual(n.subtitle, 'Subtitle', "notification subtitle to be properly set");
        assert.strictEqual(n.body, 'This is the body', "notification body has been properly set");
    });
    it('should accept adding actions', () => {
        let n = new Notification('test', 'this is a test');
        var act: Action = {
            id: "test",
            name: "Test"
        }
        n.add_action(act);

        // expect(n.actions, 'n.actions').contains(act, 'contains the defined action');
        assert.isArray(n.actions, 'notifications actions are defined');
        assert.include(n.actions, act, "notification actions contains newly defined action");
    });
    it('should throw when setting reply details without setting reply mode first', () => {
        let n = new Notification('test', 'test');
        // expect(n.set_reply_message("Message content"), 'setting reply content throws').throws();
        assert.throw(n.set_reply_message, "can't update message");
    });
    it('should be okay setting reply mode then editing reply message', () => {
        let n = new Notification('test', 'test');
        // expect(n.set_reply_message("New message content"), 'set new message content').ok();
        assert.ok(n.set_reply('Recipient', 'Message content to be overriden'), "Setting reply mode");
        assert.ok(n.set_reply_message("New message content"), "set new message content");
    });
});