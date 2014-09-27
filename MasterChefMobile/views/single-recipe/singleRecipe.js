var app = app || {};
app.singleRecipe = app.singleRecipe || {};

(function (app) {
    'use strict'

    app.singleRecipe.init = function (e) {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read : function(options) {
                    app.requester.recipe.byId().then(function(data){
                        console.log(data);
                        options.success(data);
                    })
                }
            }
        });
        
        alert(e.view.params.id);
        
        var viewModel = kendo.observable({
            recipe: dataSource
        });
        
        kendo.bind($("#single-recipe-view"), viewModel);
    };
}(app));