const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const channel = await client.channels.fetch(config.channelId);

  // ⚙️ FEATURES EMBED
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

  // 📩 SEND BOTH
  await channel.send({ embeds: [storeEmbed] });
  await channel.send({ embeds: [featuresEmbed] });

  console.log("✅ blessed messages sent.");
  process.exit();
});

client.login(process.env.TOKEN);
