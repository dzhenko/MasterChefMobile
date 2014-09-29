var app = app || {};

app.singleRecipe = app.singleRecipe || {};

(function (app) {
    'use strict'
    document.addEventListener("deviceready", function () {
        app.singleRecipe.init = function (e) {
            var recipeId = e.view.params.id;
            
            app.requester.recipe.byId(recipeId).then(function(data) {
                $('#single-recipe-image-holder').css('background-image','url(' + data.Image + ')');
                var vm = new kendo.observable({
                    Image: data.Image,
                    Name: data.Name,
                    Category: data.Category,
                    Description: data.Description,
                    PreparationSteps: data.PreparationSteps,
                    Products: data.Products,
                    Owner: data.Owner,
                    likeText: 'Like',
                    onLikeClick : function() {
                        app.requester.actions.like(data.Id).then(function() {
                            console.log('liked');
                            this.set('likeText', this.get('likeText') === "Like" ? "Unlike" : "Like");
                        });
                    },
                    onCommentClick : function() {
                        app.requester.actions.comment(data.Id, $('#commentText').val());
                        $('#commentText').val('');
                        location.reload();
                    },
                });
                
                app.singleRecipe.model = vm;
                kendo.bind($("#single-recipe-view"), vm);
        })
    };
});
}(app));