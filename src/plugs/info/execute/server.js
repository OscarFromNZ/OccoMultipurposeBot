const {
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            let guild = await interaction.guild.fetch();

            var description = guild.description
            if (!description) {
                description = "";
            }

            const createdAt = Math.ceil(guild.createdTimestamp / 1000);
            const membercount = await guild.members.cache.size;
            const bans = await guild.bans.cache.size;
            const emojis = await guild.emojis.cache.size;
            const roles = await guild.roles.cache.size;
            const channels = await guild.channels.channelCountWithoutThreads.toString();
            const banner = await guild.bannerURL({ size: 1024 });
            const avatar = await guild.iconURL({ size: 1024 });

            let schema = `\
            ${description}
            Guild created <t:${createdAt}:R> (<t:${createdAt}:D>)
            ${membercount} members
            ${bans} bans
            ${emojis} emojis
            ${roles} roles
            ${channels} channels
            `

            console.log(banner);
            let emb = new EmbedBuilder()
                .setColor("2f3136")
                .setImage(banner)
                .setThumbnail(avatar)
                .setDescription(schema)

            await interaction.editReply({ embeds: [emb], content: "<:Function_Tick:997678330277015553> Here you go!" });


        } catch (e) {
            console.log(e);
        }
    }
}
