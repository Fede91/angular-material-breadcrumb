# Angular Material Breadcrumb
Light angularJS directive that generate a material design breadcrumb in base of the ui-router supporting HTML5 mode.

# Requirements

Angular Material Breadcrumb require these components:

* AngularJS
* Angular Route
* Angular Material
* Google Material Icons

You can include these dependencies directly in your html page by loading the libraries from the Google CDN:

```html
<!--Angular Material Breadcrumb requires Angular.js and Angular-Material Libraries -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
```

Or, if you are using NPM, you can include these dependencies on your package.json:

```javascript
"devDependencies": {
    "angular": "^1.5.5",
    "angular-animate": "^1.5.5",
    "angular-aria": "^1.5.5",
    "angular-messages": "^1.5.5",
    "angular-route": "^1.5.5",
    "angular-material": "^1.1.0"
}
```

And install it.
Finally, load Google Material Icons by adding this snippet in your CSS file:

```css
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
      
@font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: local('Material Icons'), local('MaterialIcons-Regular'), url(https://fonts.gstatic.com/s/materialicons/v21/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
}
```

# Angular Material Breadcrumb Installation

To install ad use Angular Material Breadcrumb in your Angular application, you can add Angular Material Breadcrumb's files to your project and include these in your html page (remember to change the angular module in the directive angular-material-breadcrumb.js):

```html
...
<head>
    <link rel="stylesheet" href="[...]md-breadcrumb/angular-material-breadcrumb.min.css">
</head>
<body>
    ...
    <script src="[...]md-breadcrumb/angular-material-breadcrumb.min.js"></script>
    ...
</body>
```

Finally, use the directive on your pages:

```html
<md-breadcrumb minify="false" show-current="false"></md-breadcrumb>
```

View the examples to know how setup the parameter required by the breadcrumb.