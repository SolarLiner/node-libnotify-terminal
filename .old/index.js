var exec = require('child_process').exec
  , inspect = require('util').inspect;

exports.version = '0.1.0';

class LibNotify {
    constructor (appname, body, title=null, subtitle=null) {
        this.data = {
            app_name: appname,
            title: title,
            subtitle: subtitle,
            body: body,
            isReply: false,
            replyRecipient: null,
            replyMessage: null,
            actions: [
                //['dummy', 'Dismiss']
            ]
        }
    }

    set_basic ({title, subtitle, body}) {
        if(title)
            this.data.title = title;
        if(subtitle)
            this.data.subtitle = subtitle;
        if(body)
            this.data.body = body;
    }

    set_appname (appname) {
        this.data.app_name = appname
    }
    get_appname () {
        return this.data.app_name;
    }

    add_action (action, label) {
        this.data.actions.push([action, label]);
    }
    remove_action (action) {
        this.data.actions = this.data.actions.filter((val) => { return val[0] != action });
    }
    set_reply() {
        this.data.isReply = true;
    }
    set_reply(message) {
        set_reply();
        this.data.replyMessage = message;
    }
    set_reply (recipient, message) {
        this.data = Object.assign({}, {
            isReply: true,
            replyRecipient: recipient,
            replyMessage: message
        }, this.data);
    }

    show(callback) {
        var args = this.data;

        var cmd = ['libnotify-terminal'];
        cmd.push('--body ' + args.body);
        if(args.app_name) cmd.push('--app-title ' + inspect(args.app_name));
        if(args.title) cmd.push('--title '+inspect(args.title));
        if(args.subtitle) cmd.push('--subtitle '+inspect(args.subtitle));
        if(args.isReply) cmd.push('--reply');
        if(args.replyRecipient) cmd.push('--reply-to ' + inspect(args.replyRecipient));
        if(args.replyMessage) cmd.push('--reply-message ' + inspect(args.replyMessage));

        if(args.actions) {
            args.actions.forEach(function(element) {
                cmd.push('--action ' + inspect(element.join(',')));
            });
        }

        exec(cmd.join(' '), (err, stdout, stderr) => {
            var out = stdout.trim();
            var action = args.actions.find((val) => val[0] == out);
            if(action) {
                console.log('Action fired: '+action);
                if(callback)
                    callback(action[0], null);
            }
            else if(out.length>0) {
                console.log('Reply fired: '+action);
                if(callback)
                    callback('reply', out);
            }
            else {
                console.log('Close fired');
                if(callback)
                    callback('close', null);
            }

            console.log(cmd.join(' ')+': '+stderr.trim());
        });
    }
}

exports.libnotify = LibNotify;
