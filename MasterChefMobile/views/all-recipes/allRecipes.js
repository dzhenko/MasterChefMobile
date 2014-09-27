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
                var id = e.likeButton.data().id;
                alert(id);
                console.log('clicked');
            },
            onCommentClick : function(e) {
                var id = e.commentButton.data().id;
                alert(id);
            },
        });
        
        kendo.bind($("#all-recipes-view"), viewModel);
    };
}(app));