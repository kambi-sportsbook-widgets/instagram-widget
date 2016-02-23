(function () {

   'use strict';

   (function ( $app ) {
      return $app.controller('appController',
         ['$scope', '$controller', '$http', '$sce', 'kambiAPIService', 'kambiWidgetService',
            function ( $scope, $controller, $http, $sce, kambiAPIService, kambiWidgetService ) {

               angular.extend(this, $controller('widgetCoreController', {
                  '$scope': $scope
               }));

               // Default arguments, these will be overridden by the arguments from the widget api
               $scope.defaultArgs = {
                  'instagram': {
                     'href': 'https://www.instagram.com/p/BCGuqy1CogW'
                  }
               };

               var kwcard = $('.kw-card');
               console.log(kwcard);

               $(window).bind('resize', function() {
                  $scope.width = kwcard.width();
                  $scope.setWidgetHeight($scope.width + 80);
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
