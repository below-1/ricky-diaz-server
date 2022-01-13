const { upload } = require('../uploads')
const { db } = require('../db');

module.exports = async (fastify) => {

	fastify.get('/', {
		handler: async (request, reply) => {
			reply.view('app/mahasiswa/list', {
				title: 'Data Mahasiswa',
				subtitle: 'List Data Mahasiswa',
				session: request.session
			})
		}
	});

	fastify.get('/me', {
		handler: async (request, reply) => {
			reply.view('app/mahasiswa/empty-data', {
				title: 'Biodata Anda',
				subtitle: 'Data yang digunakan applikasi',
				session: request.session
			})
		}
	})

	fastify.get('/me-input', {
		handler: async (request, reply) => {
			reply.view('app/mahasiswa/me-input', {
				title: 'Biodata Anda',
				subtitle: 'Data yang digunakan applikasi',
				session: request.session
			})
		}
	})

	fastify.get('/create', {
		handler: async (request, reply) => {
			reply.view('app/mahasiswa/create', {
				title: 'Data Mahasiswa',
				subtitle: 'Input Data Mahasiswa',
				session: request.session
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