var app = app || {};
app.singleRecipe = app.singleRecipe || {};

(function (app) {
    'use strict'
    
    app.singleRecipe.init = function (e) {
        var recipeId = e.view.params.id;

        app.singleRecipe.recipe = new kendo.data.DataSource({
            transport: {
                read : function(options) {
                    app.requester.recipe.byId(recipeId).then(function(data){
                        console.log(data);
                        options.success(data);
                    })
                }
            }
        });
        
        var viewModel = kendo.observable({
            recipe: app.singleRecipe.recipe
        });
        
        kendo.bind($("#single-recipe-view"), viewModel);
    };
}(app));