var app = app || {};

(function (app) {
    app.requester = (function () {
        'use strict';

        var rootUrl = 'http://masterchef-1.apphb.com/';

        function register(username, password) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Account/Register',
                type:"POST",
                data:{
                    Email: username,
                    Password: password,
                    ConfirmPassword: password
                },
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data)
                }
            });

            return deferred.promise();
        }

        function login(username, password) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'Token',
                type:"POST",
                data:{
                    grant_type: 'password',
                    Username: username,
                    Password: password
                },
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function logout() {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Account/Logout',
                type:"POST",
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function createRecipe(recipe) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes',
                type:"POST",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                data: recipe,
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function allRecipes() {
            var deferred = new $.Deferred();
            
            var tempVar = 'ONxIEq20MwgmjWxji-YC9cWf0kbJILfchxIx42Y9TSlWqddB22dhfjpYfIljdEdTGNF80cJGLGIhW1sJgzdCH8dNzEpy3PglRXdo4OsI56zF4Xo4RAYYTlZ0tQ4m1rNxfC7E-m-NypAWJdCH4vnUCEVYPgRH3bezvCOeLY6RgDaZbAYj2iBH34Fg6w2QEknL-CdYC8M4xzmL-UcQJdaczfhgcCyF_8EgefZ8K1_Q7XjGHC1rSX7jzZRzUHD88Yuo0KE3EHVYkvH67eqKvFPQbbfw0QU7ZO_jtxYcjHGAW9raGxWI3oV5l67iVrLXNSLDnwTFZQhMTONQpWmsXYvd1jz6-dOaTvrSAE4kTfn-mFIB7k_wao_ELOHMOKVfPs1mWdtC_DlvNw5UuMwRhPXPJiiUkcNELB5-UpvC23nbe7c8PDtaT8SS3SQw9jqQFVkyRqCRHjAumJ7QY16CLPIZaFa2qqz3sGfGxc1DeDWzb07bPYKepWW18_3v59r_FVuZ';
            console.log('called');
            $.ajax({
                url:rootUrl + 'api/Recipes',
                type:"GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + tempVar /*app.auth.token()*/)},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function recipeById(id) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes/'+ id,
                type:"GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function recipeByName(name) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes/?param=name&value=' + name,
                type:"GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function recipeByCategory(category){
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes/?param=category&value=' + category,
                type:"GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function recipeByUserId(id){
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes/?param=user&value=' + id,
                type:"GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function ownRecipes(){
            return recipeByUserId();
        }

        function recipeDelete(id) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes/' + id,
                type:"DELETE",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function commentRecipe(id, comment) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes/?id=' + id + '&comment=' + comment,
                type:"PUT",
                data: comment,
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function likeRecipe(id) {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Recipes/' + id,
                type:"PUT",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }

        function allCategories() {
            var deferred = new $.Deferred();

            $.ajax({
                url:rootUrl + 'api/Categories',
                type:"GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer ' + app.auth.token())},
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    deferred.resolve(data);
                }
            });

            return deferred.promise();
        }
    
        return {
            user: {
                register: register,
                login: login,
                logout: logout
            },
            categories: allCategories,
            recipe: {
                create: createRecipe,
                all: allRecipes,
                byId: recipeById,
                byName: recipeByName,
                byCategory: recipeByCategory,
                byUser:recipeByUserId,
                own: ownRecipes,
                delete: recipeDelete
            },
            actions: {
                like: likeRecipe,
                comment: commentRecipe
            }
        }
    }());
}(app));