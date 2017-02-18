var LibNotify = require('./').libnotify;

var n = new LibNotify("libnotify test");
n.set_basic({title: "Notification title", body: "Notification body", subtitle: "Subtitle"});
n.add_action('test', 'Dismiss');
n.add_action('lunch', 'Go to lunch!');
n.set_reply();

n.show(function(action, message) {
    switch (action) {
        case 'dismiss':
            console.log('client: action dismiss');
            break;
        case 'close':
            console.log('client: notification timeout');
            break;
        case 'reply':
            console.log('client: message recieved: '+message);
        default:
            console.log('client: action fired: '+action);
            break;
    }
});