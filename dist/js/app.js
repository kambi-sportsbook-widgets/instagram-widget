(function () {

   var arrDependencies;

   arrDependencies = [
      'widgetCore',
      'ngAnimate'
   ];

   (function ($app) {
      'use strict';

      return $app;
   })(angular.module('instagramWidget', arrDependencies));
}).call(this);

(function () {

   'use strict';

   (function ($app) {
      return $app.controller('appController',
         ['$scope', '$controller', '$http', '$sce', 'kambiAPIService', 'kambiWidgetService',
            function ($scope, $controller, $http, $sce, kambiAPIService, kambiWidgetService) {

               angular.extend(this, $controller('widgetCoreController', {
                  '$scope': $scope
               }));

               // Default arguments, these will be overridden by the arguments from the widget api
               $scope.defaultArgs = {
                  'instagram': {
                     'href': 'https://www.instagram.com/p/BARTu05AvwB'
                  }
               };

               // Getting the image's width and height from json
               var instagramApiUrl = 'http://api.instagram.com/publicapi/oembed/?url=';
               $http.jsonp(instagramApiUrl + $scope.defaultArgs.instagram.href + '/&callback=JSON_CALLBACK').success(function (data) {
                  $scope.pictureWidth = data.thumbnail_width;
                  $scope.pictureHeight = data.thumbnail_height;
               });

               // Variables for resizing according to the aspect ratio of the image
               var kwcard = $('.kw-card');
               var instagramHeaderFooter = 88;

               $(window).bind('resize', function () {
                  $scope.width = kwcard.width();
                  $scope.setWidgetHeight(($scope.pictureHeight / $scope.pictureWidth) * $scope.width + instagramHeaderFooter);
               });

               // Call the init method in the coreWidgetController so that we setup everything using our overridden values
               // The init-method returns a promise that resolves when all of the configurations are set, for instance the $scope.args variables
               // so we can call our methods that require parameters from the widget settings after the init method is called
               $scope.init().then(function () {

                  // Build Instagram iframe's URL
                  $scope.args.instagram.href = $sce.trustAsResourceUrl($scope.args.instagram.href + '/embed');

               });

            }]);
   })(angular.module('instagramWidget'));
})($);
