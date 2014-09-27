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
                navigator.notification.alert('The email is incorrect.');
                return;
            }
            
            var isPasswordValid = app.validator.isValidPassword(password);
            var isConfirmPasswordValid = app.validator.isValidPassword(confirmPassword);
            if (!isPasswordValid || !isConfirmPasswordValid) {
                navigator.notification.alert('The password is incorrect.');
                return;
            }
            
            if (!app.validator.passwordsMatches(password, confirmPassword)) {
               navigator.notification.alert('The password and confirmation password do not match.');
                return;
            }
            
            app.auth.register(email, password, confirmPassword);
            
            //if (this.get('regPassword') !== this.get('regConfirmPassword')){
            //    alert('Passwords dont match');
            //}
            
            //app.auth.login();
            //app.main.navigate('views/home/home.html');
        }
    });
}(app));