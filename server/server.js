const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const axios = require('axios');
const cors = require('cors');
const PastebinAPI = require('pastebin-ts');
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.post('/edit', async (req, res) => {
	try {
		// Save to Gist (basically the persistance)
		const gist_data = { "description": "", "files": { "msacwatchschedule.json": { "content": JSON.stringify(req.body) } } };
		await axios({
			method: 'PATCH',
			headers: { "Authorization": `token ${process.env.GITHUB_API_TOKEN}`, "Accept": "application/vnd.github.v3+json" },
			data: gist_data,
			url: `https://api.github.com/gists/${process.env.GIST_ID}`,
		});
		console.log("Successfully updated Gist...");

		// Save Embed to a PasteBin
		const embed = convertToEmbed(req.body);
		const pastebin_link = await (new PastebinAPI({
			'api_dev_key': process.env.PASTEBIN_DEV_KEY,
		})).createPaste({
			text: JSON.stringify(embed),
			title: 'MSACwatchschedule',
			privacy: 1,
			expiration: '10M'
		});
		console.log(`Successfully created Pastebin with link : ${pastebin_link}`);

		// Save to Discord
		// TODO

		res.status(200).json({ success: true, embed });
	} catch (error) {
		console.error(error);
		res.status(400).json({ success: false, error })
	}
});

if (process.env.NODE_ENV == "development") {
	const server = app.listen(5000, () => {
		console.log(`Listening on port ${server.address().port}...`);
	});
}

const server = serverlessExpress.createServer(app);
exports.handler = (event, context) => {
	return serverlessExpress.proxy(server, event, context);
}

const convertToEmbed = data => {
	return {
		"embed": {
			"color": 15158332,
			"timestamp": new Date().toISOString(),
			"footer": {
				"text": "Last Updated"
			},
			"fields": [
				{
					"name": ":popcorn: - General Watch Parties",
					"value": "We host watch parties of hand-picked anime shows, movies and short OVAs every weekend! These usually occur after our weekly events on Friday, at around 8-9PM, or at some time on Saturday or Sunday. Keep your eyes on #announcements!"
				},
				{
					"name": ":question: - Watch party suggestions",
					"value": "Do you have a show, movie, VN, etc. that you'd like to watch with other weebs? @ this role to ask if anyone is interested! React with this emote to be notified when someone suggests a watch party!"
				},
				...data.map(party => {
					return {
						"name": `:${party.emoji}: - ${party.name}`,
						"value": `[MyAnimeList](https://myanimelist.net/anime/${party.mal_id})\nWhen : ${party.when}\nMost recent session : ${party.lastSession}\nMost recently watched episode : ${party.curr} / ${party.total}`
					}
				})
			]
		}
	}
}