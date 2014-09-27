var app = app || {};
app.singleRecipe = app.singleRecipe || {};

(function (app) {
    'use strict'

    app.singleRecipe.init = function () {
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
        
        var viewModel = kendo.observable({
            recipes: dataSource,
            onSelect: function(e) {
                alert(e);
            }
        });
        
        kendo.bind($("#single-recipe-view"), viewModel);
    };
    app.singleRecipe.init();
}(app));