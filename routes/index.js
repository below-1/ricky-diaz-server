const Auth = require('./auth');

const App = async (fastify) => {
	fastify.get('/', async (request, reply) => {
		reply.xview('app/dashboard', {
			title: 'SPK Penentuan Penerima Beasiswa'
		});
	});
	fastify.register(require('./mahasiswa'), { prefix: '/mahasiswa' });
}

module.exports = async (fastify) => {


	fastify.register(Auth, { prefix: '/auth' })
	fastify.register(App, { prefix: '/app' })

}