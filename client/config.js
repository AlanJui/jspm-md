System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.3",
    "angular-animate": "github:angular/bower-angular-animate@1.5.3",
    "angular-aria": "github:angular/bower-angular-aria@1.5.3",
    "angular-material": "github:angular/bower-material@1.0.7",
    "angular-material-icons": "npm:angular-material-icons@0.7.0",
    "angular-messages": "github:angular/bower-angular-messages@1.5.3",
    "angular-resource": "github:angular/bower-angular-resource@1.5.3",
    "css": "github:systemjs/plugin-css@0.1.20",
    "json": "github:systemjs/plugin-json@0.1.0",
    "text": "github:systemjs/plugin-text@0.0.7",
    "typescript": "npm:typescript@1.8.9",
    "github:angular/bower-angular-animate@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-angular-aria@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-angular-messages@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-angular-resource@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-material@1.0.7": {
      "angular": "github:angular/bower-angular@1.5.3",
      "angular-animate": "github:angular/bower-angular-animate@1.5.3",
      "angular-aria": "github:angular/bower-angular-aria@1.5.3",
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "npm:angular-material-icons@0.7.0": {
      "angular": "npm:angular@1.5.3"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:typescript@1.8.9": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    }
  }
});
