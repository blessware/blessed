const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.once('ready', async () => {
  console.log(`blessed is online as ${client.user.tag}`);

  // 🔴 DND STATUS
  client.user.setPresence({
    status: 'dnd',
    activities: [{
      name: 'blessed system',
      type: ActivityType.Playing
    }]
  });

  try {
    const channel = await client.channels.fetch(config.verifyChannelId);

    const embed = new EmbedBuilder()
      .setColor("#0a0a0a")
      .setTitle("**VERIFICATION REQUIRED**")
      .setDescription(
`

━━━━━━━━━━━━━━━━━━━━

Clic the button below to gain access to the rest of the server.

━━━━━━━━━━━━━━━━━━━━

`
      )
      .setFooter({ text: "blessware verification" });

    const button = new ButtonBuilder()
      .setCustomId('verify_button')
      .setLabel('Verify')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(button);

    await channel.send({
      embeds: [embed],
      components: [row]
    });

    console.log("✅ Verification button message sent");

  } catch (err) {
    console.error("❌ ERROR:", err);
  }
});

// 🎯 BUTTON CLICK HANDLER
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'verify_button') {
    try {
      const member = await interaction.guild.members.fetch(interaction.user.id);

      if (member.roles.cache.has(config.verifyRoleId)) {
        await member.roles.remove(config.verifyRoleId);

        await interaction.reply({
          content: "❌ Access removed.",
          ephemeral: true
        });

      } else {
        await member.roles.add(config.verifyRoleId);

        await interaction.reply({
          content: "✅ You now have access.",
          ephemeral: true
        });
      }

    } catch (err) {
      console.error("❌ BUTTON ERROR:", err);
    }
  }
});

client.login(process.env.TOKEN);
