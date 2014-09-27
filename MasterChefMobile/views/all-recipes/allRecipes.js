var app = app || {};
app.allRecipes = app.allRecipes || {};

(function (app) {
    'use strict'

    app.allRecipes.init = function () {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read : function(options) {
                    app.requester.recipe.all().then(function(data){
                        options.success(data);
                    })
                }
            }
        });
        
        var viewModel = kendo.observable({
            recipes: dataSource,
            onLikeClick : function(e) {
                alert(1);
            },
            onCommentClick : function(e) {
                var id = e.commentButton.data().id;
                 alert(1);
            },
        });
        
        kendo.bind($("#all-recipes-view"), viewModel);
    };
}(app));