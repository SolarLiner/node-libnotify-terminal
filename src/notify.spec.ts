import { assert } from 'chai';
import { Notification } from "./notify";

describe('The Notification class', function () {
    it('should properly instanciate itself', function () {
        let n = new Notification('test', 'This is a test');
        // expect(n.app_name, 'n.app_name').equals('test', 'is set properly');
        // expect(n.body, 'n.body').equals('This is a test', 'is set properly');
        assert.instanceOf(n, Notification, 'notification has been defined');
        assert.strictEqual(n.app_name, 'test', 'app name to be set');
        assert.strictEqual(n.body, 'This is a test', "notification body to be set");
    });
    it('should properly rename app and/or details', function () {
        let n = new Notification('test', 'test');
        n.set_basic({ body: "This is the body", title: "Title", subtitle: "Subtitle" });
        // expect(n.title, 'notification title').equals("Title", 'to be properly set');
        // expect(n.subtitle, 'notification subtitle').equals('Subtitle', "to be properly set");
        // expect(n.body, 'notification body').equals('This is the body', 'to be properly set');
        assert.isNotNull(n.title);
        assert.isNotNull(n.subtitle);
        assert.strictEqual(n.title, 'Title');
        assert.strictEqual(n.subtitle, 'Subtitle');
        assert.strictEqual(n.body, 'This is the body');
    });
    it('should accept adding actions', function () {
        let n = new Notification('test', 'this is a test');
        let act = {
            id: "test",
            name: "Test"
        };
        n.add_action(act);
        // expect(n.actions, 'n.actions').contains(act, 'contains the defined action');
        assert.isArray(n.actions);
        assert.include(n.actions, act);
    });
    it('but should not accepd malformed ids', () => {
        let n = new Notification("test", "test");

        assert.throws(() => {
            n.add_action({id: "malformed id", name: "Action label"});
        })
    });
    it('should throw when setting reply details without setting reply mode first', function () {
        let n = new Notification('test', 'test');
        // expect(n.set_reply_message("Message content"), 'setting reply content throws').throws();
        assert.throw(() => {
            n.set_reply_message("Message content");
        });
    });
    it('should be okay setting reply mode then editing reply message', function () {
        let n = new Notification('test', 'test');
        // expect(n.set_reply_message("New message content"), 'set new message content').ok();
        // assert.ok(n.set_reply('Recipient', 'Message content to be overriden'));
        // assert.ok(n.set_reply_message("New message content"));
        assert.doesNotThrow(() => {
            n.set_reply('Recipient');
            n.set_reply('New recipient', 'Message to be overriden');
            n.set_reply_message('New message');
        });
        assert.strictEqual(n.replyRecipient, "New recipient");
        assert.equal(n.isReply, true);
        assert.strictEqual(n.replyMessage, "New message");
    });
    it("should fire a notification (no truly good way to test this", () => {
        let n = new Notification('test', 'test');
        
        assert.doesNotThrow(() => {
            n.show();
        });
    });
});