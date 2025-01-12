var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
$routeProvider
.when('/home', {
templateUrl: 'home.html'
})
.when('/mining', {
templateUrl: 'mining.html'
})
.otherwise({
redirectTo: '/home'
})
}]);
app.controller('MainCtrl', ['$scope', '$location', '$interval', function($scope, $location, $interval){
//coin balance
$scope.coinValue = 0.0000001;
$interval(function(){
$scope.coinValue += 0.0000001;
$scope.coinValue = Number($scope.coinValue.toFixed(7));
}, 1000);
//forms dialog
$scope.loginShow = true;
$scope.registerShow = false;
var signDialog = document.querySelector('.signDialog');
$scope.getStarted = function(){
$scope.loginShow = true;
$scope.registerShow = false;
signDialog.showModal()
}
$scope.closesignDialog = function(){
signDialog.close()
}
$scope.register = function(){
$scope.loginShow = false;
$scope.registerShow = true;
}
//form submits
$scope.loginFormSubmit = function(){
var localLoginUsername = localStorage.getItem('multiCoinUsername');
var localLoginPassword = localStorage.getItem('multiCoinPassword');
if($scope.loginUsername == localLoginUsername && $scope.loginPassword == localLoginPassword){
console.log('Logging in ...')
$scope.loginUsername = ''
$scope.loginPassword = ''
signDialog.close()
$location.path('/mining')
}else{
alert('Enter correct username or password!')
}
}
$scope.registerFormSubmit = function(){
var localRegisterUsername = localStorage.setItem('multiCoinUsername', $scope.registerUsername);
var localRegisterEmail = localStorage.setItem('multiCoinEmail', $scope.registerEmail);
var localRegisterWalletAddress = localStorage.setItem('multiCoinWalletAddress', $scope.registerWalletAddress);
var localRegisterPassword = localStorage.setItem('multiCoinPassword', $scope.registerPassword)
$scope.registerUsername = ''
$scope.registerEmail = ''
$scope.registerWalletAddress = ''
$scope.registerPassword = ''
signDialog.close()
$location.path('/mining')
}
//purchasing
var purchaseDialog = document.querySelector('.purchaseDialog');
$scope.showRequest = true;
$scope.showApproval = false;
$scope.showRejection = false;
$scope.showPurchase = function(){
purchaseDialog.showModal()
}
$scope.closePurchaseDialog = function(){
$scope.showRequest = true;
$scope.showApproval = false;
$scope.showRejection = false;
purchaseDialog.close()
}
$scope.moveToNextPurchase = function(){
var windowPrompt = window.prompt('YES / NO, did you deposit into the btc address?');
if(windowPrompt == "Yes" || windowPrompt == "yes" || windowPrompt == "YES"){
$scope.showRequest = false;
$scope.showApproval = true;
$scope.showRejection = false;
}else{
$scope.showRequest = false;
$scope.showApproval = false;
$scope.showRejection = true;
}
}
//clipboard
var getAddress = document.querySelector('.getAddress');
getAddress.addEventListener('click', async function() {
var text = "bc1pu4cj2p3t0x8makmxhluykux9jtzmw43mj2jprtfn6fyucdltnjfs93qqda";
try {
await navigator.clipboard.writeText(text);
alert('Wallet address copied to clipboard!');
} catch (err) {
console.error('Failed to copy text: ', err);
}
});
}]);
