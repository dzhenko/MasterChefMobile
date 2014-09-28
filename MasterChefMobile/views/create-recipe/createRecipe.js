var app = app || {};
app.createRecipe = app.createRecipe || {};

(function (app) {
    app.createRecipe.init = function() {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read : function(options) {
                    app.requester.categories().then(function(data){
                        console.log(data);
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
            name: '',
            description: '',
            imageUrl: '',
            products: '',
            category: 'Main Dish',
            cancel: function() {
                app.main.navigate('views/all-recipes/all-recipes.html');    
            },
            createRecipe: function() {
                //var name = this.get('name');
                //var description = this.get('description');
                //var image = this.get('imageUrl');
                //var products = this.get('products');
                //var category = this.get('category');
                
                //// TODO
                //console.log(name);
                //console.log(description);
                //console.log(image);
                //console.log(products);
                //console.log(category);
                
               var imageMagic = this.get('imageUrl');/* magic with file upload or camera */

                // Text
                // Minutes
                // StepNumber
                
               var recipeToCreate = {
                   Name: this.get('name'),
                   Category : this.get('category'),
                   Description: this.get('description'),
                   Image: imageMagic,
                   PreparationSteps : this.get('directions').split('.'),
                   Products : this.get('products').split(',')
               };
                
              app.requester.recipe.create(recipeToCreate).then(function(data){
                   app.notifier.success('Recipe added');
                   app.main.navigate('views/single-recipe/single-recipe.html?id='+ data);
               }, app.errorHandler);
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
                     app.everlive.uploadImage(data, onSuccessUpload, onFailedUpload)
                };
                
                navigator.camera.getPicture(picSuccess, error, picConfig);
            }
        });
        
        function onSuccessUpload(data) {
            app.everlive.getImageData(data.result.Id)
                .then(function (data) {
                    var imageUrl = app.constants.everlivePictureStorageUri + "/" + data.result[0].Uri;
                    console.log("Url: " + imageUrl); // TODO
                    viewModel.imageUrl = imageUrl;
                }, function () {
                    console.log("Cannot get image data!");
                });
        }
        
        function onFailedUpload() {
            console.log("Cannot upload an image!");
        }
        
        kendo.bind($("#create-recipe-view"), viewModel);
    }
}(app));

















