exports.config =
  # See http://brunch.io/#documentation for docs.
  server:
    path: 'server.js'
    port: 3333
  files:
    javascripts:
      joinTo: './javascripts/app.js': /^(app|vendor|bower_components)/
      order:
        before: [
          'bower_components/jquery/dist/jquery.js'
          'bower_components/handlebars/handlebars.js'
          'bower_components/ember/ember.js'
          'bower_components/lodash/dist/lodash.js'
          'bower_components/momentjs/moment.js'
        ]
    stylesheets:
      joinTo: './stylesheets/app.css': /^(app|vendor|bower_components)/
    templates:
      precompile: true
      root: 'templates/',
      defaultExtension: 'hbs',
      joinTo: './javascripts/app.js': /^app/
