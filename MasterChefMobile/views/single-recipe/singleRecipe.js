var app = app || {};

app.singleRecipe = app.singleRecipe || {};

(function (app) {
    'use strict'
    document.addEventListener("deviceready", function () {
        app.singleRecipe.init = function (e) {
            var recipeId = e.view.params.id;
            
            app.requester.recipe.byId(recipeId).then(function(data) {
                console.log(data);
                var vm = new kendo.observable({
                    Image: data.Image,
                    Name: data.Name,
                    Category: data.Category,
                    Description: data.Description,
                    PreparationSteps: data.PreparationSteps,
                    Products: data.Products,
                    Owner: data.Owner
                });
                
                app.singleRecipe.model = vm;
                kendo.bind($("#single-recipe-view"), vm);
        })
    };
});
}(app));