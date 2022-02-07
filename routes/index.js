const Auth = require('./auth');
const { db } = require('../db')

const App = async (fastify) => {
	fastify.get('/', async (request, reply) => {
		const totalMahasiswa = await db.mahasiswa.count()
		const aggStatusPenerima = await db.$queryRaw`
			select \`statusPenerima\`, count(*) as total from mahasiswa group by \`statusPenerima\`
		`
		console.log(aggStatusPenerima)

		let totalDiterima = 0;
		let totalDitolak = 0;
		let totalDraft = 0;

		aggStatusPenerima.forEach(it => {
			if (it.statusPenerima == 'DRAFT') { totalDraft = it.total }
			else if (it.statusPenerima == 'DITERIMA') { totalDiterima = it.total }
			else if (it.statusPenerima == 'DITOLAK') { totalDitolak = it.total }
		})

		const kriterias = await db.kriteria.findMany({  });
		let kriteriaAggs = [];
		for (let kriteria of kriterias) {
			const aggs = await db.$queryRaw`
					SELECT subk.id, subk.nama, COUNT(pen.subkriteriaId) as total 
						FROM \`penilaian\` as pen 
						JOIN subkriteria as subk ON pen.subkriteriaId = subk.id
					    JOIN kriteria as k ON subk.kriteriaId = k.id
					    WHERE k.id = ${kriteria.id}
					    GROUP BY pen.subkriteriaId;
			`;
			kriteriaAggs.push({
				id: kriteria.id,
				label: kriteria.nama,
				aggs
			})
		}

		reply.view('app/dashboard', {
			title: 'SPK Penentuan Penerima Beasiswa',
			session: request.session,
			totalMahasiswa,
			totalDitolak,
			totalDiterima,
			totalDraft,
			kriteriaAggs
		});
	});

	fastify.register(require('./kriteria'), { prefix: '/kriteria' });
	fastify.register(require('./subkriteria'), { prefix: '/subkriteria' });
	fastify.register(require('./mahasiswa'), { prefix: '/mahasiswa' });
	fastify.register(require('./rank'), { prefix: '/rank' })
}

module.exports = async (fastify) => {

	fastify.get('/', async (request, reply) => {
		reply.view('landing/index')
	})

	fastify.register(Auth, { prefix: '/auth' })
	fastify.register(App, { prefix: '/app' })

}