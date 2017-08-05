"use strict";
exports.__esModule = true;
var child_process_promise_1 = require("child-process-promise");
var Notification = (function () {
    /**
     * Instanciates a new Libnotify notification.
     * @param appname Name of the application.
     * @param body Notification body (optional).
     * @param title Notification title (optional).
     * @param subtitle Notification subtitle. Will be shown as first line of the body where separate subtitle line is not available. (optional)
     */
    function Notification(app_name, body, title, subtitle) {
        this.app_name = app_name;
        this.body = body;
        this.title = title;
        this.subtitle = subtitle;
        this.isReply = false;
        this.replyRecipient = null;
        this.replyMessage = null;
        this.actions.length = 0;
    }
    /**
     * Sets basic information for notifications
     * @param basic.title Title of the notification
     * @param basic.subtitle Subtitle of the notification
     * @param basic.body Body of the subtitle
     */
    Notification.prototype.set_basic = function (basic) {
        if (basic.title)
            this.title = basic.title;
        if (basic.subtitle)
            this.subtitle = basic.subtitle;
        if (basic.body)
            this.body = basic.body;
    };
    Notification.prototype.set_appname = function (appname) {
        this.app_name = appname;
    };
    Notification.prototype.get_appname = function () {
        return this.app_name;
    };
    Notification.prototype.add_action = function (action) {
        if (action.id.search(" ") > 0)
            throw "Spaces in id not allowed";
        this.actions.push(action);
    };
    Notification.prototype.remove_action = function (action_id) {
        this.actions = this.actions.filter(function (a) { return a.id !== action_id; });
    };
    Notification.prototype.clear_actions = function () {
        this.actions.length = 0;
    };
    Notification.prototype.set_reply = function (recipient, message) {
        this.isReply = true;
        this.replyRecipient = recipient;
        if (message)
            this.replyMessage = message;
    };
    Notification.prototype.unset_reply = function () {
        this.isReply = false;
        this.replyRecipient = null;
        this.replyMessage = null;
    };
    Notification.prototype.set_reply_message = function (message) {
        if (!this.isReply)
            throw "Should set notification as reply before setting message";
        this.replyMessage = message;
    };
    Notification.prototype.show = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cmd = ['../bin/libnotify-terminal'];
            if (_this.app_name)
                cmd.push("--app-title \"" + _this.app_name + "\"");
            if (_this.title)
                cmd.push("--title \"" + _this.title + "\"");
            if (_this.subtitle)
                cmd.push("--subtitle \"" + _this.subtitle + "\"");
            if (_this.isReply) {
                cmd.push("--reply --reply-to \"" + _this.replyRecipient + "\"");
                if (_this.replyMessage)
                    cmd.push("--reply-message \"" + _this.replyMessage + "\"");
            }
            _this.actions.forEach(function (action) {
                cmd.push("--action \"" + action.id + "," + action.name + "\"");
            });
            child_process_promise_1.exec(cmd.join(" ")).then(function (res) {
                var out = res.stdout.trim();
                var action = _this.actions.filter(function (a) { return a.id === out; });
                if (action.length > 0) {
                    console.log("Action fired: " + action[0].id);
                    resolve(action[0]);
                }
                else if (out.length > 0) {
                    console.log("Got reply: " + out);
                    resolve(out);
                }
                else {
                    console.log('Notification closed');
                    resolve(null);
                }
            })["catch"](function (err) {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    };
    return Notification;
}());
exports.Notification = Notification;
