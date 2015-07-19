
var app = angular.module('initExample', ['angularModalService', 'ngTouch','ui.grid'])

app.controller('ExampleController', ['$scope', function($scope) {
      $scope.list = [['a', 'b'], ['c', 'd']];

       $scope.myData = [
	    {
	        "firstName": "Cox",
	        "lastName": "Carney",
	        "company": "Enormo",
	        "employed": true
	    },
	    {
	        "firstName": "Lorraine",
	        "lastName": "Wise",
	        "company": "Comveyer",
	        "employed": false
	    },
	    {
	        "firstName": "Nancy",
	        "lastName": "Waters",
	        "company": "Fuelton",
	        "employed": false
	    }
	];


	 $scope.showMetrics = [
	    {
	        "name": "gross capacity",
	        "count": "100",
	        "total": "100",
	        "employed": true
	    },
	    {
	        "name": "net capacity",
	        "count": "100",
	        "total": "100",
	        "employed": false
	    },
	    {
	        "name": "kills",
	        "count": "100",
	        "total": "100",
	        "employed": false
	    }
	];

}]);


app.controller('Controller', function($scope, ModalService) {
    


    $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
    
});

app.controller('ModalController', function($scope, close) {
  
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});

app.controller('MainCtrl', ['$scope','uiGridConstants', '$http', function ($scope, uiGridConstants, $http) {
var data = [];
 
$scope.gridOptions = {
    showGridFooter: true,
    showColumnFooter: true,
    enableFiltering: true,
    columnDefs: [
        { field: 'name', width: '13%' },
        { field: 'address.street',aggregationType: uiGridConstants.aggregationTypes.sum, width: '13%' },
        { field: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true, width: '13%' },
        { name: 'ageMin', field: 'age', aggregationType: uiGridConstants.aggregationTypes.min, width: '13%', displayName: 'Age for min' },
        { name: 'ageMax', field: 'age', aggregationType: uiGridConstants.aggregationTypes.max, width: '13%', displayName: 'Age for max' },
        { name: 'customCellTemplate', field: 'age', width: '14%', footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color: Red;color: White">custom template</div>' },
        { name: 'registered', field: 'registered', width: '20%', cellFilter: 'date', footerCellFilter: 'date', aggregationType: uiGridConstants.aggregationTypes.max }
    ],
    data: data,
    onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
    }
};
 
$scope.toggleFooter = function() {
  $scope.gridOptions.showGridFooter = !$scope.gridOptions.showGridFooter;
  $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
};
 
$scope.toggleColumnFooter = function() {
  $scope.gridOptions.showColumnFooter = !$scope.gridOptions.showColumnFooter;
  $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
};
 
$http.get('/data/500_complex.json')
  .success(function(data) {
    data.forEach( function(row) {
      row.registered = Date.parse(row.registered);
    });
    $scope.gridOptions.data = data;
  });
  
}]);