var app = app || {};
app.findRecipe = app.findRecipe || {};

(function (app) {
    'use strict'
    var currentClickedId = 0;
    
    app.findRecipe.init = function () {
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
                app.requester.actions.like(e.button.context.dataset.id).then(function() {
                    e.button.context.innerText = e.button.context.innerText === "Like" ? "Unlike" : "Like";
                });
            },
            onCommentClick : function(e) {
                currentClickedId = e.button.context.dataset.id;
            },
            onViewClick : function(e) {
                app.main.navigate('views/single-recipe/single-recipe.html?id='+ e.button.context.dataset.id);
            }
        });
        
        kendo.bind($("#all-recipes-view"), viewModel);
    };
    
    app.allRecipes.model = {
        closeModal: function() {
            $("#modalview-comment").kendoMobileModalView("close");
        },
        comment: function() {
            app.requester.actions.comment(currentClickedId, $('#commentText').val());
            $('#commentText').val('');
            $("#modalview-comment").kendoMobileModalView("close");
        }
    }
}(app));