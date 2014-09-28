var app = app || {};

app.profile = app.profile || {};

(function (app) {
    document.addEventListener("deviceready", function () {
        startWatchingGeolocation();
    
        function startWatchingGeolocation() {
            navigator.geolocation.watchPosition(geoWatchSuccess, geoWatchError, {
                                                    enableHighAccuracy: true,
                                                    maximumAge: 1000
                                                });
        
            navigator.geolocation.getCurrentPosition(function(data) {
                console.log(data)
            });
        }

        function geoWatchSuccess(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var heading = position.coords.heading;

            var mapsBaseUrl = "http://maps.googleapis.com/maps/api/staticmap";
            var centerPar = "center=" + lat + "," + long;
            var sizePar = "size=300x300";

            var locationViz = document.getElementById("location-viz");
            locationViz.src = mapsBaseUrl + "?" + centerPar + "&" + sizePar + "&" + "&sensor=true&zoom=12";
            locationViz.style.webkitTransform = "rotate(" + (-heading | 0) + "deg)";
        }

        function geoWatchError(error) {
            navigator.notification.alert("Cannot get your location!")
        }

        var options = {
            frequency: 5000
        }; 
    
        var username = window.localStorage.getItem("username"); 
        var viewModel = kendo.observable({
             username: username,
             logout : function() {
                 app.auth.logout();
                 app.notifier.success('Logout');
                 app.main.navigate('views/login/login.html');
             }
         });

        app.profile.model = viewModel;
        kendo.bind($("#profile-username"), viewModel);
    });
}(app));