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
                var name = this.get('name');
                var description = this.get('description');
                var image = this.get('imageUrl');
                var products = this.get('products');
                var category = this.get('category');
                
                console.log(name);
                console.log(description);
                console.log(image);
                console.log(products);
                console.log(category);
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