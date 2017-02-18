var exec = require('child_process').exec
  , inspect = require('util').inspect;

exports.version = '0.1.0';

exports.new = function({title, subtitle, body, isReply, replyTo, replyMessage}) {
    exports._notificaiton = {
        title: title,
        subtitle: subtitle,
        body: body,
        canReply: isReply,
        replyRecipient: replyTo,
        replyMsg: replyMessage
    }
}

exports.set_apptitle = function(name) {
    exports._notificaiton = Object.assign({}, {
        apptitle: name
    }, exports._notificaiton);
}

exports.set_reply = function(recipient, message) {
    exports._notification = Object.assign({}, {
        title: "New Message",
        subtitle: recipient,
        body: message,
        canReply: true,
        replyRecipient: recipient,
        replyMsg: message
    }, exports._notificaiton);
}

exports.set_reply_concealed = function(recipient, message, canSeeRecipient) {
    exports.set_reply(recipient, message);
    exports._notificaiton = Object.assign({}, {
        subtitle: canSeeRecipient? recipient : "Somebody",
        body: "Contents hidden"
    }, exports._notificaiton);
}

exports.set_actions = function(actions) {
    exports._notificaiton = Object.assign({}, {
        actions: actions
    }, exports._notificaiton);
}

exports.onNotificationClosed = null
exports.onNotificationAction = null
exports.onNotificationReplied= null

exports.fire = function() {
    var args = exports._notificaiton;

    var cmd = ['./bin/libnotify-terminal'];
    cmd.push('--body ' + args.body);
    if(args.apptitle) cmd.push('--app-title ' + inspect(args.apptitle));
    if(args.title) cmd.push('--title '+inspect(args.title));
    if(args.subtitle) cmd.push('--subtitle '+inspect(args.subtitle));
    if(args.canReply) cmd.push('--reply');
    if(args.replyRecipient) cmd.push('--reply-to ' + inspect(args.recipient));
    if(args.replyMsg) cmd.push('--reply-message ' + inspect(args.replyMsg));

    if(args.actions) {
        args.actions.forEach(function(element) {
            cmd.push('--action' + element.join(','));
        }, this);
    }

    exec(cmd.join(' '), function(err, stdout, stderr) {
        if(args.actions)
            args.actions.forEach(function(el) {
                if(stdout.match(el[0]))
                    if(exports.onNotificationAction)
                        exports.onNotificationAction(el[0]);
            });
        if(stdout.length == 0)
            if(exports.onNotificationClosed)
                exports.onNotificationClosed();
        else
            if(exports.onNotificationReplied)
                exports.onNotificationReplied(stdout);
    });
}
