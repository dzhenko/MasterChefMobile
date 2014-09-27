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
            
            var tempVar = 'Y4vAU-yrXoEeYfeuRlClvV6naMwyUmpST0GUiAYF36v_V-4I3HdxSfupsPVMSgWR8KTqwMcZyFfwcNLujHXsdbuJCtl7jeK9Ox8t-aVIiJIasxrt99qL6JgzcxmJ-lMR5LaaXClLSi-C9zDrB59v7GFKnBt0ra36qi5TUlnxcakx7yONG7AzUfl8P1TpUWjpS1Eqx6tNx4XRx-epdcruwyqHqxo0O2iA2xqxaQyY9USTBsUJN3KCoCgsgTbIrEPuyHiqkrRjJJ_tsuZQ6N7WQbGiZ0P-e11B0qfrrNu3TNx0W3hB4h0UcPiIMXKFeiV_yAVmKZBSpHw6JZYrNlGFoOLMYNSrR00EBC2yes7lixSBdB3lnhnwKYRBsUnYtHhwMCy6-us12iCo2mp4N3LisIHYJRkRzaqoqwW2IcB2LHPAapd00ZeWoe0L4ah6k20o9pKdvDUkYNm3yuZzDMWBiXAGN9OD0raEOWcFapyIezc';

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