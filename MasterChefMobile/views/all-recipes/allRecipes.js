var app = app || {};
app.allRecipes = app.allRecipes || {};

(function (app) {
    'use strict'

    app.allRecipes.init = function () {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read : function(options) {
                    app.requester.recipe.all().then(function(data){
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
        
        kendo.bind($("#all-recipes-view"), viewModel);
    };
    app.allRecipes.init();
}(app));