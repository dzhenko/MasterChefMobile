var app = app || {};

app.createRecipe = app.createRecipe || {};

(function (app) {
    app.createRecipe.init = function() {
        var dataSource = new kendo.data.DataSource({
           transport: {
                read : function(options) {
                    app.requester.categories().then(function(data) {
                        console.log(data);
                        options.success(data);
                    })
                }
            }
        });
        
        $('#category-select-dropdown').kendoDropDownList({ dataSource: dataSource });
        
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
                 var imageMagic = this.get('imageUrl'); /* magic with file upload or camera */
                 
                 var directions = this.get('directions');
                 if (directions) {
                    directions = this.get('directions').split('.');
                 }
                 
                 var products = this.get('products');
                 if (products) {
                     products = this.get('products').split(',');
                 }
                 
                 var recipeToCreate = {
                     Name: this.get('name'),
                     Category : this.get('category'),
                     Description: this.get('description'),
                     Image: imageMagic,
                     PreparationSteps : directions,
                     Products : products,
                     PreparationSteps: {
                         StepNumbers: 0,
                         Minutes: 0,
                         Text: ''
                     }
                 };
                 
                 if (!recipeToCreate.Name || !recipeToCreate.Category ||
                     !recipeToCreate.Description || !recipeToCreate.Image ||
                     !recipeToCreate.PreparationSteps || !recipeToCreate.Products) {
                         app.notifier.warning('Some of the fields are left empty!');
                         return;
                     }

                 app.requester.recipe.create(recipeToCreate).then(function(data) {
                     app.notifier.success('Recipe added');
                     app.main.navigate('views/single-recipe/single-recipe.html?id=' + data);
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
                    $.ajax({
                               type: "GET",
                               url: app.constants.everlivePictureStorageUri + data.result[0].Uri,
                               contentType: "application/json",
                           }).then(function (picData) {
                               console.log(picData);
                               viewModel.imageUrl = picData.Result.Uri;
                               app.notifier.success('Picture was uploaded successfully!');
                               console.log(viewModel.imageUrl); // TODO
                           })
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