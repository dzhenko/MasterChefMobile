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
            
            alert(this.get('regUsername'));
            alert(this.get('regPassword'));
        }
    });
}(app));