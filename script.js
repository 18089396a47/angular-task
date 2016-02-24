angular.module('app', [])
  .controller('appCtrl', function($scope, $http) {
    function getList(item, arr) {
      if (!arr) {
        arr = [];
      }
      if (item.unitOwner && item.unit) {
        arr.push(item);
        if (item.childUnits) {
          for (var i = 0; i < item.childUnits.length; i++) {
            getList(item.childUnits[i], arr);
          }
        }
      }
      return arr;
    }
    $http.get('./data.json').then(function(res) {
      $scope.tree = res.data;
      $scope.list = getList(res.data[0]);
      $scope.currentPage = 0;
      $scope.pages = new Array(parseInt($scope.list.length / 10));
    });
  })
  .directive('tree', function() {
    return {
      link: function(scope, elem, atrr) {
        scope.click = function($event) {
          $event.stopPropagation();
          if ($event.target.classList[0] === 'bckg-image') {
            $event.currentTarget.classList.toggle('hidden');
            return true;
          }
          return false;
        }
      },
      templateUrl: './tree.html'
    };
  })
  .directive('pages', function() {
    return {
      templateUrl: './pages.html'
    }
  });
