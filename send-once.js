const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const channel = await client.channels.fetch(config.channelId);

  const embed = new EmbedBuilder()
    .setColor("#0a0a0a")
    .setTitle("**BLESSWARE PRICES**")
    .setDescription(
`**AVAILABLE PLANS**

**1 Month Access** — **$5 USD**  
Full access for 30 days.

**Unlimited Access** — **$10 USD**  
Permanent access with no expiration.

━━━━━━━━━━━━━━━━━━━━

**PAYMENT METHODS**
• PayPal  
• Cryptocurrency  
• IBAN Transfer  

━━━━━━━━━━━━━━━━━━━━

**IMPORTANT**
• Access is granted after payment confirmation.  
• Open a ticket in buy channel to purchase.  
• No refunds after delivery.`
    )
    .setFooter({ text: "blessed services" });

  await channel.send({ embeds: [embed] });

  console.log("✅ store message sent");
  process.exit();
});

client.login(process.env.TOKEN);
