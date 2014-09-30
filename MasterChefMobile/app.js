var app = app || {};

(function () {
    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {
      $('#loggedInFooter').hide();
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
      navigator.splashscreen.hide();
      
      app.notifier = {
          success: function(message){
              toastr.success(message, 'Success', {timeOut: 2000});
          },
          warning : function(message) {
              toastr.warning(message, 'Warning', {timeOut: 2000});
          },
          error: function(message, timeout){
              if (!timeout) { timeout = 2000; }
              toastr.error(message, 'Error', { timeOut: timeout });
          }
      }
      
      
        
      document.addEventListener('offline', function () {
          app.notificationsApi.beep(1);
          app.notificationsApi.vibrate([100,200,100,100]);
          app.notifier.success('Your internet is up and running again!');
          
          document.addEventListener('online', function () {
              app.notificationsApi.beep(1);
              app.notificationsApi.vibrate([100,200,100,100]);
              app.notifier.error('Your internet is dead :(');
          })
      })
        
      //app default error handler
      app.errorHandler = function(error) {
          console.log(error)
          app.notifier.error(error);
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