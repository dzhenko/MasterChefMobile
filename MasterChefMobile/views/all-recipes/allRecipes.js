var app = app || {};
app.allRecipes = app.allRecipes || {};

(function (app) {
    'use strict'
    var currentClickedId = 0;
    
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
                app.requester.actions.like(e.currentTarget.dataset.id).then(function() {
                    e.currentTarget.innerText = e.currentTarget.innerText === "Like" ? "Unlike" : "Like";
                });
            },
            onCommentClick : function(e) {
                currentClickedId = e.currentTarget.dataset.id;
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