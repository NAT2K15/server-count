const { Client } = require('discord.js');
const client = new Client();
const config = require('./config.json');


client.once('ready', () => {
    console.log(`${client.user.tag} is now online!`)
    setInterval(() => {
        let Guild = client.guilds.cache.get(config.server_count.server_id)
        let GuildSize = Guild.memberCount.toLocaleString();
        let MainChannel = Guild.channels.cache.get(config.server_count.everyone_channel);
        MainChannel.setName(`Total Members: ${GuildSize}`);

        //client
        if (config.server_count.client_count) {
            let MainRole = Guild.roles.cache.get(config.server_count.client_role);
            let ClientSize = MainRole.members.size.toLocaleString();
            let ClientChannel = Guild.channels.cache.get(config.server_count.client_channel);
            ClientChannel.setName(`Total Customers: ${ClientSize}`);
        }

        //bots
        if (config.server_count.show_bots) {
            let BotsChannel = Guild.channels.cache.get(config.server_count.bots_channel);
            let BotSize = Guild.members.cache.filter(member => member.user.bot).size;
            BotsChannel.setName(`Total Bots: ${BotSize}`);
        }

        //bans
        if (config.server_count.show_bans) {
            Guild.fetchBans().then((bans) => {
                let bansiz = 0;
                bans.forEach(() => {
                    bansiz++;
                });
                let BanChannel = Guild.channels.cache.get(config.server_count.ban_channel);
                BanChannel.setName(`Bans: ${bansiz}`)
            })
        }
    }, 300000); // every 5 min 
})

client.login(config.token);