'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('kaptureApp')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'app/scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope, $state){
        $scope.hidden = ( $state.current.name === 'watch' );

        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function( x ) {
          if( x == $scope.collapseVar )
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function( y ) {
          if( y == $scope.multiCollapseVar )
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);
