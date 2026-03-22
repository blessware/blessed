const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  try {
    console.log("Sending verification message...");

    const channel = await client.channels.fetch(config.channelId);

    if (!channel) {
      console.log("❌ Channel not found");
      return process.exit(1);
    }

    const verifyEmbed = new EmbedBuilder()
      .setColor("#0a0a0a")
      .setTitle("**VERIFICATION**")
      .setDescription(
`

━━━━━━━━━━━━━━━━━━━━

React to gain access to the rest of the server.`
      )
      .setFooter({ text: "blessware verification" });

    const message = await channel.send({ embeds: [verifyEmbed] });

    // add reaction automatically
    await message.react("✖️");

    console.log("✅ Verification message sent");
    console.log("MESSAGE ID:", message.id); // you'll need this

    process.exit(0);

  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
});

client.login(process.env.TOKEN);
