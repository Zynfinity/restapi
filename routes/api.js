__path = process.cwd()
let express = require('express');
let db = require(__path + '/database/db');
try {
	let zahirr = db.get("zahirr");
} catch (e) {
	console.log('')
}
let creator = "Fajar Ihsana"
let axios = require('axios')
let fs = require('fs')
let fetch = require('node-fetch');
let router = express.Router();
let hxz = require('hxz-api')
let scrapper = require('../lib/scraper/scraper')
const dcanvas = require('discord-canvas')
const canvac = require('canvacord')
let {
	tiktok,
	pinterest,
	mediafireDl,
	doujindesu,
	pinterestdl
} = require('../lib/index')
let options = require(__path + '/lib/options.js');
let {
	color,
	bgcolor
} = require(__path + '/lib/color.js');
let {
	getBuffer,
	fetchJson
} = require(__path + '/lib/fetcher.js');
async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
const misparam = (param) => {
	return {
		message: `Masukkan parameter ${param}!`
	}
}
const isUrl = (url) => {
	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}
loghandler = {
	noturl: {
		status: false,
		creator: `${creator}`,
		code: 406,
		message: 'Masukan URL'
	},
	nurl: {
		status: false,
		message: 'Url not Valid!'
	},
	notquery: {
		status: false,
		creator: `${creator}`,
		code: 406,
		message: 'Masukkan query'
	},
	error: {
		status: 404,
		creator: `${creator}`,
		message: 'An internal error occurred. Please report via WhatsApp wa.me/6288286421519'
	}
}

// Downloader
router.get('/tiktok', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await tiktok(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/tikmate', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.tiktod(url).then(resu => res.json(resu))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/tiktokder', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.tiktokder(url).then(resu => resu.username != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/dddtik', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.dddtik(url).then(resu => resu.download.source != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/snapinsta', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.snapinsta(url).then(resu => resu.result != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/igdl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await hxz.igdl(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/mediafire', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await mediafireDl(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/youtube', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await hxz.youtube(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/twitter', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await hxz.twitter(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/pindl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.pinterestdl(url).then(resu => resu.result != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/soundcloud', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.soundcloud(url).then(resu => resu.link != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/goredl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.goredl(url).then(resu => resu.data.judul != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})

// Searching
router.get('/pinterest', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let result = await pinterest(query)
	res.json({
		status: 200,
		creator: `${creator}`,
		note: 'Jangan Di Tembak Bang',
		result
	})
})
router.get('/happymod', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.happymod(query).then(resu => resu.data != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/android1', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.android1(query).then(resu => resu.data != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/apkmody', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.apkmody(query).then(resu => resu.data != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/gore', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.searchgore(query).then(resu => res.json(resu))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/google', async (req, res, next) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let google = require('google-it')
	let result = google({
		'query': query
	}).then(result => {
		res.json({
				status: 200,
				creator: `${creator}`,
				note: 'Jangan Di Tembak Bang',
				result
			})
			.catch(e => {
				res.json(loghandler.error)
			})
	})
})
// Animanga
/*router.get('/nhentai', async (req, res, next) => {
	code = req.query.code
	if (!code) return res.json({
		message: 'masukan parameter Code'
	})
	result = await nhentai.getDoujin(code)
	res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/nHentaiSearch', async (req, res) => {
	let query = req.query.query
	let hasil = await nana.search(query)
	let result = hasil.results
	res.json({
		status: 200,
		creator: `${creator}`,
		note: 'Jangan Di Tembak Bang',
		result
	})
})
router.get('/doujindesuSearch', async (req, res) => {
	let query = req.query.query
	let result = await doujindesu(query)
	res.json({
		status: 200,
		creator: `${creator}`,
		note: 'Jangan Di Tembak Bang',
		result
	})
})
*/
router.get('/konachan', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
  try{
    scrapper.konachan(query).then(resu => resu != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/zerochan', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
  try{
    scrapper.zerochan(query).then(resu => resu.result != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})

// Random Image
router.get('/random/waifu', async (req, res, next) => {
	fetch(encodeURI(`https://waifu.pics/api/sfw/waifu`))
		.then(response => response.json())
		.then(async data => {
			let result = data;
			let buffer = await fetch(data.url)
			res.type('png')
			res.send(await buffer.buffer())
		})
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/random/neko', async (req, res, next) => {
	fetch(encodeURI(`https://waifu.pics/api/sfw/neko`))
		.then(response => response.json())
		.then(async data => {
			let result = data;
			let buffer = await fetch(data.url)
			res.type('png')
			res.send(await buffer.buffer())
		})
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/random/husbu', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})
router.get('/random/loli', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})
router.get('/random/milf', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})
router.get('/random/cosplay', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})
router.get('/randomgore', async (req, res, next) => {
	scrapper.randomgore().then(resu => res.json(resu))
})
router.get('/ceritahantu', async (req, res, next) => {
	scrapper.ceritahantu().then(resu => res.json(resu))
})
router.get('/randomtiktok', async (req, res, next) => {
  const user = req.query.username
  if(!user) return res.json(misparam('Username Tiktok'))
  try{
    scrapper.randomtt(user).then(async resu => {
      console.log(resu)
      if(resu.username != ''){
        await fs.writeFileSync(`./media/${user}.mp4`, await getBuffer(resu.videourl))
        await res.sendFile(__path + `/media/${user}.mp4`)
        await sleep(5000)
        fs.unlinkSync(`./media/${user}.mp4`)
      }
      else{
        res.json(loghandler.error)
      }
    })
  }catch{
    res.json(loghandler.error)
  }
})

//canvas
router.get('/welcome', async (req, res) => {
	const nama = req.query.username
	const mem = req.query.memcount
	const avatar = req.query.ppurl
	const gname = req.query.groupname
	const bg = req.query.bgurl
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!nama) return res.json(misparam('username'))
	if (!mem) return res.json(misparam('memcount'))
	if (!avatar) return res.json(misparam('ppurl'))
	if (!gname) return res.json(misparam('groupname'))
	if (!bg) return res.json(misparam('bgurl'))
	try {
		const image = await new dcanvas.Welcome()
			.setUsername(nama)
			.setDiscriminator(asi)
			.setMemberCount(mem)
			.setGuildName(gname)
			.setAvatar(avatar)
			.setColor("border", "#8015EA")
			.setColor("username-box", "#8015EA")
			.setColor("discriminator-box", "#8015EA")
			.setColor("message-box", "#8015EA")
			.setColor("title", "#8015EA")
			.setColor("avatar", "#8015EA")
			.setBackground(bg)
			.toAttachment();
		await fs.writeFileSync(`./media/welcome_${asi}.png`, image.toBuffer())
		await res.sendFile(__path + `/media/welcome_${asi}.png`)
		await sleep(3000)
		await fs.unlinkSync(`./media/welcome_${asi}.png`)
	} catch {
		return res.json(loghandler.error)
	}
})
router.get('/goodbye', async (req, res) => {
	const nama = req.query.username
	const mem = req.query.memcount
	const avatar = req.query.ppurl
	const gname = req.query.groupname
	const bg = req.query.bgurl
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!nama) return res.json(misparam('username'))
	if (!mem) return res.json(misparam('memcount'))
	if (!avatar) return res.json(misparam('ppurl'))
	if (!gname) return res.json(misparam('groupname'))
	if (!bg) return res.json(misparam('bgurl'))
	try {
		const image = await new dcanvas.Goodbye()
			.setUsername(nama)
			.setDiscriminator(asi)
			.setMemberCount(mem)
			.setGuildName(gname)
			.setAvatar(avatar)
			.setColor("border", "#8015EA")
			.setColor("username-box", "#8015EA")
			.setColor("discriminator-box", "#8015EA")
			.setColor("message-box", "#8015EA")
			.setColor("title", "#8015EA")
			.setColor("avatar", "#8015EA")
			.setBackground(bg)
			.toAttachment();
		await fs.writeFileSync(`./media/goodbye_${asi}.png`, image.toBuffer())
		await res.sendFile(__path + `/media/goodbye_${asi}.png`)
		await sleep(3000)
		await fs.unlinkSync(`./media/goodbye_${asi}.png`)
	} catch {
		return res.json(loghandler.error)
	}
})

router.get('/wasted', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.wasted(img).then(async data => {
			await canvac.write(data, `./media/wasted_${asi}.png`)
			await res.sendFile(__path + `/media/wasted_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/wasted_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/wanted', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.wanted(img).then(async data => {
			await canvac.write(data, `./media/wanted_${asi}.png`)
			await res.sendFile(__path + `/media/wanted_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/wanted_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/rip', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.rip(img).then(async data => {
			await canvac.write(data, `./media/rip_${asi}.png`)
			await res.sendFile(__path + `/media/rip_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/rip_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/sepia', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.sepia(img).then(async data => {
			await canvac.write(data, `./media/sepia_${asi}.png`)
			await res.sendFile(__path + `/media/sepia_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/sepia_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/shit', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.shit(img).then(async data => {
			await canvac.write(data, `./media/shit_${asi}.png`)
			await res.sendFile(__path + `/media/shit_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/shit_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/greyscale', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.greyscale(img).then(async data => {
			await canvac.write(data, `./media/greyscale_${asi}.png`)
			await res.sendFile(__path + `/media/greyscale_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/greyscale_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/beautiful', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.beautiful(img).then(async data => {
			await canvac.write(data, `./media/beautiful_${asi}.png`)
			await res.sendFile(__path + `/media/beautiful_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/beautiful_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/blur', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.blur(img).then(async data => {
			await canvac.write(data, `./media/blur_${asi}.png`)
			await res.sendFile(__path + `/media/blur_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/blur_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/invert', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.invert(img).then(async data => {
			await canvac.write(data, `./media/invert_${asi}.png`)
			await res.sendFile(__path + `/media/invert_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/invert_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/jokeOverHead', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.jokeOverHead(img).then(async data => {
			await canvac.write(data, `./media/jokeOverHead_${asi}.png`)
			await res.sendFile(__path + `/media/jokeOverHead_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/jokeOverHead_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/hitler', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.hitler(img).then(async data => {
			await canvac.write(data, `./media/hitler_${asi}.png`)
			await res.sendFile(__path + `/media/hitler_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/hitler_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/facepalm', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.facepalm(img).then(async data => {
			await canvac.write(data, `./media/facepalm_${asi}.png`)
			await res.sendFile(__path + `/media/facepalm_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/facepalm_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/circle', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.circle(img).then(async data => {
			await canvac.write(data, `./media/circle_${asi}.png`)
			await res.sendFile(__path + `/media/circle_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/circle_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})

//religion
router.get('/surah', async (req, res) => {
	let query = req.query.no
  if(isNaN(query)) return res.send('Input harus berupa angka!')
	if (!query) return res.json(loghandler.notquery)
  try{
    surah = JSON.parse(fs.readFileSync('./lib/surah.json'))
    resfil = surah.filter(mek => mek.no == query)
    console.log(resfil)
    if(resfil == '') return res.json(loghandler.error)
    scrapper.surat(resfil[0].surat).then(resu => res.json(resu))
  }catch{
    res.json(loghandler.error)
  }
})


router.get('/eval', async (req, res) => {
	const util = require('util')
console.log('eval')
ras = req.query.code
function _(rem) {
ren = JSON.stringify(rem,null,2)
pes = util.format(ren)
res.json(pes)
}
try{
res.send(require('util').format(eval(`(async () => { ${ras} })()`)))
} catch(err) {
e = String(err)
res.json(e)
}
})
router.use(function(req, res) {
	res.status(404)
		.set("Content-Type", "text/html")
		.sendFile(__path + '/views/404.html');
});

module.exports = router
