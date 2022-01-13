const { upload } = require('../uploads')
const { db } = require('../db');

module.exports = async (fastify) => {

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
			const { nama, bobot, tipe } = request.body;
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
					core: tipe == 'core'
				}
			})
			reply.redirect('/app/kriteria');
		}
	})

}