var app = app || {};

(function(app) {
    'use strict';
    
    function login(email, password) {
        return app.requester.user.login(email, password)
            .then(function(data) {
                localStorage.setItem("recipesBearerToken", data.access_token);
                
                $('#loggedOutFooter').hide();
                $('#loggedInFooter').show().css('display','table');
                
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
                
                $('#loggedInFooter').hide();
                $('#loggedOutFooter').show().css('display','table');
                
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