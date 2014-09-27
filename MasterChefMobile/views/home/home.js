var app = app || {};
app.home = app.home || {};

(function (app) {
    'use strict'

    app.home.model = {
        homeTitle: 'Recent events:',
        events: [{
            link: '',
            message: 'ivan@abv.bg liked a recipe can you hear me guys'
        },{
            link: '',
            message: 'hi guys'
        },{
            link: '',
            message: 'hello guys'
        },{
            link: '',
            message: 'hi guys'
        },{
            link: '',
            message: 'waa guys'
        },{
            link: '',
            message: 'ee guys'
        },{
            link: '',
            message: 'waa guys'
        },{
            link: '',
            message: 'ee guys'
        }]
    }
    
    
    
    //var pubnub = PUBNUB.init({
    //    subscribe_key: 'sub-c-e6269c5c-3d90-11e4-87bf-02ee2ddab7fe'
    //});
    //pubnub.subscribe({
    //    channel: 'MasterChef',
    //    message: function(message) {
    //        app.home.model.events.push({
    //            link: message.substr(0, 36),
    //            message: message.substr(39)
    //        });
    //    }
    //});
}(app));