var app = app || {};

(function(app) {
    'use strict';
    
    function login(email, password) {
        return app.requester.user.login(email, password)
            .then(function(data) {
                localStorage.setItem("recipesBearerToken", data.access_token);
                
                $('#loggedOutFooter').hide(function(){
                    $('#loggedInFooter').show();
                });
                
                return data;
            }, app.errorHandler);
    };
    
    function register(email, password, confirmPassword) {
        return app.requester.user.register(email, password, confirmPassword);
    }

    function logout() {
        return app.requester.user.logout()
            .then(function(data){
                localStorage.removeItem("recipesBearerToken");
                
                $('#loggedInFooter').fadeOut(function() {
                    $('#loggedOutFooter').fadeIn();
                });
            }, app.errorHandler);
    }
    
    app.auth = {
        login: login,
        logout: logout,
        register: register,
        token: function() {
            return localStorage.getItem("recipesBearerToken");
        },
        isAuthenticated: function() {
            return localStorage.getItem("recipesBearerToken") !== undefined;
        }
    }
}(app));