var app = app || {};
app.register = app.register || {};

(function (app) {
    app.register.model = kendo.observable({
        regUsername: '',
        regPassword: '',
        regConfirmPassword: '',
        registerClick : function() {
            var email = this.get('regUsername');
            var password = this.get('regPassword');
            var confirmPassword = this.get('regConfirmPassword');
            
            var isUsernameValid = app.validator.isValidEmail(email);
            if (!isUsernameValid) {
                app.notify('The email is incorrect.');
                return;
            }
            
            var isPasswordValid = app.validator.isValidPassword(password);
            var isConfirmPasswordValid = app.validator.isValidPassword(confirmPassword);
            if (!isPasswordValid || !isConfirmPasswordValid) {
                app.notify('The password is incorrect.');
                return;
            }
            
            if (!app.validator.passwordsMatches(password, confirmPassword)) {
               app.notify('The password and confirmation password do not match.');
                return;
            }
            
            app.auth.register(email, password, confirmPassword);
        }
    });
}(app));