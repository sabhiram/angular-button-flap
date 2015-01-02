"use strict";

/******************************************************************************\
Directive:
    sabButtonFlap <sab-button-flap>

Dependencies:
    None

Inputs:
    @data           - An array with the following touples:
                        [[icon class, url] ... ]

    @orientation    - Which wall to bind to: ["left", "top", "right"*, "bottom"]

Description:
    Button flap directive
\******************************************************************************/
var module = angular.module("sabhiram.button-flap", []);
module.directive("sabButtonFlap", function($window) {
    return {
        restrict: "E",

        scope: {
            items:       "=",
            orientation: "@"
        },

        replace:    true,
        transclude: true,

        template: [
            "<div class='sab-flap-container {{orientation}}' ng-mouseenter='focused = true' ng-mouseleave='focused = false'>",
            "    <div class='sab-flap-item' ng-repeat='item in items' ng-click='goto_url(item[1])'>",
            "        <i class='fa fa-lg {{item[0]}}'></i>",
            "    </div>",
            "</div>",
        ].join("\n"),

        link: function(scope, element, attributes) {
            scope.orientation = scope.orientation || "right";

            scope.goto_url = function(url) {
                $window.location.href = url
            }
        }
    };
});