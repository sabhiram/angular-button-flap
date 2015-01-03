"use strict";

/******************************************************************************\
Directive:
    sabButtonFlap <sab-button-flap>

Dependencies:
    None

Inputs:
    =items           - An array with the following touples:
                        [[icon class, name, url] ... ]

    @orientation     - Which wall to bind to: ["left", "top", "right"*, "bottom"]

    @expand_on_hover - boolean

Description:
    Button flap directive
\******************************************************************************/
var module = angular.module("sabhiram.button-flap", []);
module.directive("sabButtonFlap", function($window) {
    return {
        restrict: "E",

        scope: {
            items:           "=",
            orientation:     "@",
            expand:          "=expandOnHover"
        },

        replace:    true,
        transclude: false,

        template: [
            "<div class         = 'sab-flap-container {{orientation}} {{expand | inject_expand_class}}'",
            "     ng-mouseenter = 'focused = true'",
            "     ng-mouseleave = 'focused = false' >",

            "    <div class     = 'sab-flap-item'",
            "         ng-repeat = 'item in items'",
            "         ng-click  = 'goto_url(item[1])' >",

            "         <i class = 'fa fa-lg {{item[0]}}'></i>",
            "    </div>",

            "</div>",
        ].join("\n"),

        link: function(scope, element, attributes) {
            scope.goto_url = function(url) {
                $window.location.href = url
            }

            scope.orientation = scope.orientation || "right";
            scope.expand_on_hover = scope.expand_on_hover || false;
        }
    };
});

/*****************************************************************************\
Filter:
    inject_expand_class

Description:
    Replaces boolean w/ class - this allows the user to assign an ngClass
\*****************************************************************************/
module.filter("inject_expand_class", function() {
    return function(enable) {
        return (enable)
            ? "expand-on-hover",
            : "";
    };
});
