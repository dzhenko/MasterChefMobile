var app = app || {};
app.login = app.login || {};

(function (app) {
    app.login.model = kendo.observable({
        username: '',
        password: '',
        loginClick : function() {
            alert(this.get('username'));
            alert(this.get('password'));
        },
        registerClick: function() {
            app.main.navigate('views/register/register.html');
        }
    });
}(app));