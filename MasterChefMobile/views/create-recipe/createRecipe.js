var app = app || {};
app.createRecipe = app.createRecipe || {};

(function (app) {
    app.createRecipe.init = function() {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read : function(options) {
                    app.requester.categories().then(function(data){
                        options.success(data);
                    })
                }
            }
        });
        
        $('#category-select-dropdown').kendoDropDownList({
            dataSource: dataSource
        });
        
        var viewModel = kendo.observable({
            allCategories: dataSource,
            pictureUrl: '',
            name: '',
            description: '',
            directions: '',
            imageUrl: '',
            products: '',
            category: 'Main Dish',
            cancel: function() {
                app.main.navigate('views/all-recipes/all-recipes.html');    
            },
            createRecipe: function() {
                var imageMagic = this.get('imageUrl');/* magic with file upload or camera */
                
                var recipeToCreate = {
                    Name: this.get('name'),
                    Category : this.get('category'),
                    Description: this.get('description'),
                    Image: imageMagic,
                    PreparationSteps : this.get('directions').split('.'),
                    Products : this.get('products').split(',')
                }
                
                app.requester.recipe.create(recipeToCreate).then(function(data){
                    app.notifier.success('Recipe added');
                    app.main.navigate('views/single-recipe/single-recipe.html?id='+ data);
                }, app.errorHandler)
            },
            addImage: function() {
                var error = function () {
                        navigator.notification.alert("Unfortunately we could not add the image");
                    };
                
                var picConfig = {
                        destinationType: Camera.DestinationType.DATA_URL,
                        targetHeight: 400,
                        targetWidth: 400
                    };
                
                var picSuccess = function (data) {
                        console.log(data);
                    };
                
                navigator.camera.getPicture(picSuccess, error, picConfig);
            }
        });
        
        kendo.bind($("#create-recipe-view"), viewModel);
    }
}(app));