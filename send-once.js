const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  try {
    console.log("Bot ready...");

    const channel = await client.channels.fetch(config.channelId);

    if (!channel) {
      console.log("❌ Channel not found");
      return process.exit();
    }

    // 🛒 STORE EMBED
  const featuresEmbed = new EmbedBuilder()
    .setColor("#0a0a0a")
    .setTitle("**BLESSWARE FEATURES**")
    .setDescription(
` 

━━━━━━━━━━━━━━━━━━━━

  **DH FEATURES** 

• AimLock
• Silent Aim  
• Auto Reload
• ESP
• Specific Player Targeting
• Auto Stomp

━━━━━━━━━━━━━━━━━━━━

Check <#1485038933703266556> for information`
    )
    .setFooter({ text: "blessware team" });

    // ✅ SEND (INSIDE SAME BLOCK)
    await channel.send({ embeds: [storeEmbed] });
    await channel.send({ embeds: [featuresEmbed] });

    console.log("✅ Messages sent");
    process.exit();

  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit();
  }
});

client.login(process.env.TOKEN);
