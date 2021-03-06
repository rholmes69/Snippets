
/*
	@license Angular Treeview version 0.1.2
	ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT
*/
(function(k){
	k.module("angularTreeview",[])
	.directive("treeModel",function($compile){
		return{
			restrict:"A",
			link:function(a,f,b){
				var d=b.treeModel,
				g=b.nodeLabel||"label",
				c=b.nodeChildren||"children",
				h='<ul><li data-ng-repeat="node in '+d+'"><i class="collapsed" data-ng-show="node.'+c+'.length && node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i><i class="expanded" data-ng-show="node.'+c+'.length && !node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i><i class="normal" data-ng-hide="node.'+
c+'.length"></i> <span data-ng-class="node.selected" data-ng-click="selectNodeLabel(node, $event)">{{node.'+g+'}}</span><div data-ng-hide="node.collapsed" data-tree-model="node.'+c+'" data-node-id='+(b.nodeId||"id")+" data-node-label="+g+" data-node-children="+c+"></div></li></ul>";
d&&d.length&&(b.angularTreeview?(a.$watch(d,function(l,b){f.html($compile(h)(a))},!1),
	a.selectNodeHead=a.selectNodeHead||function(a,b){a.collapsed=!a.collapsed},
	a.selectNodeLabel=a.selectNodeLabel||function(b,c){a.currentNode&&

a.currentNode.selected&&(a.currentNode.selected=void 0);

b.selected="selected";

a.currentNode=b}):f.html($compile(h)(a)))}}})})(angular);