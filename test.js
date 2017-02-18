var notifier = require('./');

notifier.new({
    title: "Test",
    subtitle: "this is the subtitle",
    body: "Actual body of the notification"
});
notifier.set_reply_concealed("Ali Connors", "Hey, wanna come over?", true);

notifier.onNotificationAction = function(action) {
    console.log('Event fired: '+action);
}

notifier.onNotificationReplied = function(message) {
    console.log("The message is: " + message);
}

notifier.fire();