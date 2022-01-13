const Fastify = require('fastify');
const Static = require('fastify-static');
const path = require('path');
const POV = require('point-of-view');
const nunjucks = require('nunjucks');
const Blipp = require('fastify-blipp');
const Routes = require('./routes');
const prettifier = require('@mgcrea/pino-pretty-compact');
const fastifyRequestLogger = require('@mgcrea/fastify-request-logger');
const multer = require('fastify-multer');

module.exports.createApp = () => {
	const app = Fastify({
		logger: {
			prettyPrint: true,
			prettifier
		}
	});

	app.register(fastifyRequestLogger);
	app.register(Blipp);
	app.register(multer.contentParser);
	app.register(POV, {
		engine: {
			nunjucks
		},
		root: path.join(__dirname, 'views'),
		viewExt: 'html'
	})

	app.register(Routes, { prefix: '/app' });

	app.register(Static, {
		root: path.join(__dirname, 'static'),
		prefix: '/static'
	});

	return app;
}