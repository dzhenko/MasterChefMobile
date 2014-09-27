var app = app || {};

(function(app) {
    'use strict';
    
    function login(email, password) {
        return app.requester.user.login(email, password)
            .then(function(data) {
                localStorage.setItem("recipesBearerToken", data.access_toen);
                
                $('#loggedOutFooter').toggle();
                if ($('#loggedInFooter').is(":visible")) {
                    $('#loggedInFooter').hide();
                } else {
                    $('#loggedInFooter').show();                
                    $('#loggedInFooter').css('display', 'table');
                }
                
                return data;
            }, app.errorHandler);
    };
    
    function register(email, password, confirmPassword) {
        return app.requester.user.register(email, password, confirmPassword);
    }

    function logout() {
        localStorage.removeItem("recipesBearerToken");
            
        $('#loggedInFooter').fadeOut(function() {
            $('#loggedOutFooter').fadeIn();
        });
    }
    
    app.auth = {
        login: login,
        logout: logout,
        register: register,
        token: function() {
            return 'pvOUhJtobQ7Z16U-_ds3RlZzpxwn040MPlm6Q4e5nU8aUF_OgZyVGqngFIHZHdZy9PNuRWztkBPKWSsnQLKMoP0GuSpEE5UB6fmsDATUcqpB3AU9-n14kNu3LfujY5t1As0T1WDi-7hFarJ57jXdghBoXlJBT6wWmotXIVEFXNEvLXYUD7ox6NxAgmrk_CzvdER5LDp6UUt2qDmZTtSoKJ-jtK7KV_C737PChnG47CKvHB84N4_t147tbs9-cGwMZY-8xOHCeD-mIoxeMKX4ZiPWbw4yRq-k5LftbUUwbuCe2-AP_TyeOfzvF33pXwqO5bgjkYi35BRZDA7ndWZTUH2FNTUIx4U8g9NxyF9CN-ovkzHZ_FEnSFTJas6tRub1rezW7jy-hoTlfuKt5iuB-0t2wpzWySeOD8jtGWiZRWC1z76qUEIREtF2K38OkuEQZ8mCRcQ4lLSXL1dNls2c5ZY_D40teajHMVi_GKYA0q8zadYXvh_WIakmEpCWs776';
            return localStorage.getItem("recipesBearerToken");
        },
        isAuthenticated: function() {
            return localStorage.getItem("recipesBearerToken") !== undefined;
        }
    }
}(app));