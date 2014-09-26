var app = app || {};

(function(app){
    'use strict';
    
    app.auth = {
        login: function(token){
            localStorage.setItem("recipesBearerToken", token);
        },
        token: function(){
            return localStorage.getItem("recipesBearerToken");
        },
        logout: function(){
            localStorage.removeItem("recipesBearerToken");
        },
        isAuthenticated: function() {
            return localStorage.getItem("recipesBearerToken") != undefined;
        }
    }
}(app));