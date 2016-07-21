# Gulp based boilerplate for frontend projects

## How to run?

* download this repo
* `npm install && bower install`
* for develop run `gulp`
* for build run `gulp build`
* open in browser `http://localhost:3000/`

## Features

* ES2015 in gulpfile and in JS source files.
* [Handlebars](http://handlebarsjs.com/) -- for templating
* [Bower](http://bower.io/) -- for js plugins. Just install plugin and set main file in `bower.json` at `overrrides` section. Also you can ignore files. And Gulp will concat all in one file `plugins.min.js`. For example:

```js
"overrides": {
	"bootstrap-sass-official": {
		"ignore": "*"
	},
	"select2": {
		"main": "select2.js"
	}
}
```
* [LESS](http://lesscss.org/) -- for css
* [BrowserSync](http://www.browsersync.io/docs/gulp/) -- it's really cool feature. It syncs page on every opened devices. Clicks, scrolls, forms are synced also. [Read more](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/)

<img src="http://media.mediatemple.netdna-cdn.com/wp-content/uploads/2014/06/03-browsersync-opt.gif" alt="GIF from smashing magazin">

## Afterword

This boilerplate is under constraction because turn from Grunt to Gulp. But it can used for own projects with some modernizations. Later I will add more features, such as images optimization, sprites, etc.
