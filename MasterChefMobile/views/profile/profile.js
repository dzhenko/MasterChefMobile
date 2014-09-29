var app = app || {};

app.profile = app.profile || {};

(function (app) {
    document.addEventListener("deviceready", function () {
        app.profile.init = function() {
            var username = window.localStorage.getItem("username"); 
            var viewModel = kendo.observable({
                 username: username,
                 lat: '',
                 long: '',
                 location: '',
                 connectionType: app.connectionApi.getConnectionDescription(),
                 logout : function() {
                     app.auth.logout().then(function() {
                         app.notifier.success('Logout');
                         app.main.navigate('views/login/login.html');
                     }, app.errorHandler);
                 }
             });

            startWatchingGeolocation();
            
            app.profile.model = viewModel;
            kendo.bind($("#profile-view"), viewModel);
            
            function setLocation(location) {
                viewModel.location = location;
                kendo.bind($("#profile-view"), viewModel);
            }
            
            function setLatAndLong(lat, long) {
                viewModel.lat = lat;
                viewModel.long = long;
                kendo.bind($("#profile-view"), viewModel);
            }
            
            function startWatchingGeolocation() {
                navigator.geolocation.watchPosition(geoWatchSuccess, geoWatchError, {
                                                        enableHighAccuracy: true,
                                                        maximumAge: 1000
                                                    });
            
                navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, geoWatchError);
            }
            
            function onGetCurrentPositionSuccess(position) {
                geocoder = new google.maps.Geocoder();
                var lat = parseFloat(position.coords.latitude);
                var lng = parseFloat(position.coords.longitude);
                                    
                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var arrAddress = results[0].address_components;
                            $.each(arrAddress, function (i, address_component) {
                                if (address_component.types[0] === "locality") {
                                    setLocation(address_component.long_name);
                                    return false; 
                                }
                            });
                        } else {
                            viewModel.location = "No results found";
                        }
                    } else {
                        app.notifier.error("Cannot get your location!", 5000)
                    }
                });
            }
            
            function geoWatchSuccess(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                setLatAndLong(lat, long);
                
                var mapsBaseUrl = "http://maps.googleapis.com/maps/api/staticmap";
                var centerPar = "center=" + lat + "," + long;
                var sizePar = "size=500x500";

                var locationViz = document.getElementById("location-viz");
                locationViz.src = mapsBaseUrl + "?" + centerPar + "&" + sizePar + "&" + "&sensor=true&zoom=15";
            }

            function geoWatchError() {
                app.notifier.error("Couldn't get geo coords from device", 5000)
            }
        }
    });
}(app));