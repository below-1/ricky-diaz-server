const Auth = require('./auth');

const App = async (fastify) => {
	fastify.get('/', async (request, reply) => {
		reply.view('app/dashboard', {
			title: 'SPK Penentuan Penerima Beasiswa',
			session: request.session
		});
	});

	fastify.register(require('./kriteria'), { prefix: '/kriteria' });
	fastify.register(require('./subkriteria'), { prefix: '/subkriteria' });
	fastify.register(require('./mahasiswa'), { prefix: '/mahasiswa' });
}

module.exports = async (fastify) => {

	fastify.register(Auth, { prefix: '/auth' })
	fastify.register(App, { prefix: '/app' })

}