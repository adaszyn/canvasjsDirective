
/*
 * canvasjsDirective v0.0.1
 * (c) 2015 Wojciech Adaszynski
 * License: MIT
 */

'use strict';

angular.module('canvasjsDirective', []).
directive("canvasjsPlot", function ($timeout) {
    function link(scope, element, attrs) {
        var chart
            ,isChartReady = false
            ,updateChart
            ,i;
        updateChart = function(value) {
            if (isChartReady) {
                chart.render();
            }
        };
        for (i=0; i < scope[attrs.conf].data.length; i++){
            scope.$watchCollection(attrs.conf + '.data['+ i +'].dataPoints', updateChart);
        }
        scope.$watchCollection(attrs.conf + '.title', updateChart);
        $timeout(function () {
            chart = new CanvasJS.Chart("canvasjselem", scope[attrs.conf]);
            isChartReady = true;
            updateChart();
        },0);
    }
    return {
        restrict: "E",
        template: "<div id='canvasjselem' style='height: 300px; width: 100%'></div>",
        link: link
    }
});