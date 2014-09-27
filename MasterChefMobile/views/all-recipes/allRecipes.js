var app = app || {};
app.allRecipes = app.allRecipes || {};

(function (app) {
    'use strict'
    
    app.allRecipes.model = new kendo.data.DataSource({
        transport: {
            read : function(options){
                app.requester.recipe.all().then(function(data){
                    options.success(data);
                })
            }
        }
    });
    
    app.allRecipes.init = function () {
    };
}(app));