module.exports = async (fastify) => {

	fastify.get('/', async (request, reply) => {
		reply.view('app/dashboard', {
			title: 'SPK Penentuan Penerima Beasiswa',
			user: {
				username: '',
				role: 'admin'
			}
		});
	});

	fastify.register(require('./mahasiswa'), { prefix: '/mahasiswa' });

}