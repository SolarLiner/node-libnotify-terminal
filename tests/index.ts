import { Notification, Action } from "../src/index";
import { expect } from "chai";

describe('Notification declaration', () => {
    it('should properly instanciate itself', () => {
        const n = new Notification('test', 'This is a test');
        expect(n.app_name, 'n.app_name').equals('test', 'is set properly');
        expect(n.body, 'n.body').equals('This is a test', 'is set properly');
    });
    it('should properly rename app and/or details', () => {
        let n = new Notification('test', 'test');
        n.set_basic({body: "This is the body", title: "Title", subtitle: "Subtitle"});
        expect(n.title, 'notification title').equals("Title", 'to be properly set');
        expect(n.subtitle, 'notification subtitle').equals('Subtitle', "to be properly set");
        expect(n.body, 'notification body').equals('This is the body', 'to be properly set');
    });
    it('should accept adding actions', () => {
        let n = new Notification('test', 'this is a test');
        var act: Action = {
            id: "test",
            name: "Test"
        }
        n.add_action(act);

        expect(n.actions, 'n.actions').contains(act, 'contains the defined action');
    });
    it('should throw when setting reply details without setting reply mode first', () => {
        let n = new Notification('test', 'test');
        n.set_reply_message("Message content");
    });
});