var app = app || {};
app.register = app.register || {};

(function (app) {
    app.register.model = kendo.observable({
        regUsername: '',
        regPassword: '',
        regConfirmPassword: '',
        registerClick : function() {
            if (this.get('regPassword') !== this.get('regConfirmPassword')){
                alert('Passwords dont match');
            }
            
            app.auth.login();
            app.main.navigate('views/home/home.html');
        }
    });
}(app));