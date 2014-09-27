var app = app || {};
app.allCategories = app.allCategories || {};

(function (app) {
    'use strict'
    
    app.allCategories.model = new kendo.data.DataSource({
        transport: {
            read : function(options){
                app.requester.categories().then(function(data){
                    options.success(data);
                })
            }
        }
    });
    
    app.allCategories.init = function () {
    };
}(app));