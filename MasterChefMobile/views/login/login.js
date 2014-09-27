var app = app || {};
app.login = app.login || {};

(function (app) {
    app.login.model = kendo.observable({
        username: '',
        password: '',
        loginClick : function() {
            var email = this.get('username');
            var password = this.get('password');
            
            var isEmailValid = app.validator.isValidEmail(email);
            var isPasswordValid = app.validator.isValidPassword(password);
            
            if (!isEmailValid || !isPasswordValid) {
                navigator.notification.alert('The email or password is incorrect.');
            }
            
            app.auth.login(email, password);
        },
        registerClick: function() {
            app.main.navigate('views/register/register.html');
        }
    });
}(app));