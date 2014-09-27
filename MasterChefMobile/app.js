var app = app || {};

(function () {
    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {
      $('#loggedInFooter').hide();
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
      navigator.splashscreen.hide();
        
      // default error handler
      app.errorHandler = function(error) {
          console.log('Error!' + error);
      }
        
      app.notify = function(message) {
          navigator.notification.alert(message);
      }

      app.main = new kendo.mobile.Application(document.body, {
        
        // you can change the default transition (slide, zoom or fade)
        transition: 'slide',
        
        // comment out the following line to get a UI which matches the look
        // and feel of the operating system
        skin: 'flat',

        // the application needs to know which view to load first
        initial: 'views/login/login.html'
      });
        
    }, false);
}());