const {
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            let user = interaction.options.getUser('user');
            if (!user) {
                user = await interaction.user.fetch()
            }

            let member = interaction.guild.members.cache.get(user.id);

            const username = user.username;
            const createdAt = Math.ceil(user.createdTimestamp / 1000);
            const joinedAt = Math.ceil(member.joinedTimestamp / 1000);
            const banner = await user.bannerURL({ size: 1024 });
            const avatar = await user.displayAvatarURL();

            let schema = `\
            Account created <t:${createdAt}:R>
            Joined <t:${joinedAt}:R>
            \`${user.id}\`
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
