module.exports = async (fastify) => {

	fastify.get('/', {
		handler: async (request, reply) => {
			reply.view('app/mahasiswa/list', {
				title: 'Data Mahasiswa',
				subtitle: 'List Data Mahasiswa'
			})
		}
	});

	fastify.get('/create', {
		handler: async (request, reply) => {
			reply.view('app/mahasiswa/create', {
				title: 'Data Mahasiswa',
				subtitle: 'Input Data Mahasiswa'
			})
		}
	})

	fastify.post('/create', {
		handler: async (request, reply) => {

		}
	})

	fastify.get('/:id/edit', {
		handler: async (request, reply) => {

		}
	})

	fastify.post('/:id/edit', {
		handler: async (request, reply) => {

		}
	})

	fastify.get('/:id/delete', {
		handler: async (request, reply) => {
			
		}
	})

}