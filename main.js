var prodApp = angular.module('pApp', []);

prodApp.factory('productFactory', function(){
    var pFactory = {};
    pFactory.products = [];
    pFactory.addProd = function(product){
        if (product.name && product.price){
            pFactory.products.push(product)
        }else if (!(product.name)&&!(product.price)) {
            console.log('empty form submited');
        }else if (!(product.name)) {
            console.log('no product name provided');
        }else {
            console.log('no price provided');
        }
        console.log(pFactory.products);
    }
    pFactory.getProducts = function(callback){
        callback(pFactory.products);
    }
    pFactory.delProd = function(itemNumber){
        console.log(itemNumber);
        var delIndex = pFactory.products.findIndex(x => x.itemNo === Number(itemNumber));
        console.log(delIndex);
        pFactory.products.splice( delIndex, 1 );
    }
    return pFactory;
})

prodApp.controller('mainController', ['$scope', 'productFactory', function($scope, productFactory){
    function GetList(prodList){
        $scope.productList = prodList;
    }
    var counter = 0;
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.productList = [];
    $scope.addProduct = function(){
        console.log($scope.newProd);
        $scope.newProd.itemNo = counter++
        productFactory.addProd($scope.newProd);
        $scope.newProd = {};
        productFactory.getProducts(GetList);
        console.log('bk in controller');
        console.log($scope.productList);
    };
    $scope.delProduct = function(itemNo){
        console.log(itemNo);
        productFactory.delProd(itemNo);
        $scope.itemNo = {};
        productFactory.getProducts(GetList);
    }
}])
