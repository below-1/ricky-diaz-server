const { upload } = require('../uploads')
const { db } = require('../db');

module.exports = async (fastify) => {

	fastify.get('/', {
		handler: async (request, reply) => {
			const kriterias = await db.kriteria.findMany({
				include: {
					subs: true
				}
			});
			reply.view('app/kriteria/list', {
				title: 'Data Kriteria',
				subtitle: 'Daftar kriteria',
				session: request.session,
				items: kriterias
			})
		}
	})

	fastify.get('/:id/detail', {
		schema: {
			querystring: {
				type: 'object',
				props: {
					id: { type: 'number', required: true, minimum: 10 }
				}
			}
		},
		handler: async (request, reply) => {
			const id = parseInt(request.params.id);
			const kriteria = await db.kriteria.findFirst({
				where: { id },
				include: {
					subs: true
				}
			})
			reply.view('app/kriteria/detail', {
				title: `Kriteria#${kriteria.id} -- ${kriteria.nama}`,
				subtitle: 'Detail Kriteria',
				session: request.session,
				item: kriteria
			})
		}
	})

	fastify.get('/create', {
		handler: async (request, reply) => {
			const err_bobot = request.gflash('err_bobot')
			reply.view('app/kriteria/create', {
				title: 'Data Kriteria',
				subtitle: 'Input data kriteria',
				session: request.session,
				err_bobot
			})
		}
	})

	fastify.post('/create', {
		preHandler: upload.none(),
		handler: async (request, reply) => {
			const payload = request.body;
			const { nama, bobot, tipe, target } = request.body;
			const allKrits = await db.kriteria.findMany({})
			const prevTotalBobot = allKrits.map(it => it.bobot).reduce((a, b) => a + b, 0)
			const nextBobot = prevTotalBobot + bobot
			if (nextBobot > 100) {
				request.sflash('err_bobot', 'Total bobot melebihi dari 100')
				reply.redirect('/app/kriteria/create')
				return
			}
			const kriteria = await db.kriteria.create({
				data: {
					nama,
					bobot,
					core: tipe == 'core',
					target: parseInt(target)
				}
			})
			reply.redirect('/app/kriteria');
		}
	})

}