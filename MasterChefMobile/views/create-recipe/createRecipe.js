var app = app || {};
app.addRecipe = app.addRecipe || {};

(function (app) {
    app.addRecipe.model = kendo.observable({
        name: '',
        description: '',
        imageUrl: '',
        products: '',
        category: '',
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
}(app));