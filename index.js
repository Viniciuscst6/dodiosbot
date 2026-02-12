const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

const TOKEN = process.env.MTQ3MTU2MzYyNjQxNzYxOTEwMQ.GC3Iee.gROmCp6WxF9_T_lATEFqBACgOGQBU481tjm6_I
;
const GUILD_ID = process.env.GUILD1453195582280696009;


client.once('ready', () => {
    console.log(`Bot online como ${client.user.tag}`);
});

app.get('/status', async (req, res) => {
    const guild = await client.guilds.fetch(GUILD_ID);
    await guild.members.fetch();

    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(
        member => member.presence?.status === 'online'
    ).size;

    res.json({
        members: totalMembers,
        online: onlineMembers
    });
});

client.login(TOKEN);

app.listen(3000, () => {
    console.log('API rodando na porta 3000');
});
