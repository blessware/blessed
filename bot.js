const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

let verifyMessageId = null;

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
    const messages = await channel.messages.fetch({ limit: 10 });

    // 🔍 find verification message automatically
    const verifyMessage = messages.find(msg =>
      msg.author.id === client.user.id &&
      msg.embeds.length > 0 &&
      msg.embeds[0].title === "**VERIFICATION**"
    );

    if (!verifyMessage) {
      console.log("❌ Verification message not found");
      return;
    }

    verifyMessageId = verifyMessage.id;

    console.log("✅ Verification message found:", verifyMessageId);

  } catch (err) {
    console.error("❌ ERROR finding message:", err);
  }
});

// ✅ ADD ROLE
client.on('messageReactionAdd', async (reaction, user) => {
  try {
    if (user.bot) return;
    if (!verifyMessageId) return;

    if (reaction.partial) await reaction.fetch();

    if (reaction.message.id !== verifyMessageId) return;
    if (reaction.emoji.name !== config.verifyEmoji) return;

    const member = await reaction.message.guild.members.fetch(user.id);
    await member.roles.add(config.verifyRoleId);

  } catch (err) {
    console.error("ADD ERROR:", err);
  }
});

// ❌ REMOVE ROLE
client.on('messageReactionRemove', async (reaction, user) => {
  try {
    if (user.bot) return;
    if (!verifyMessageId) return;

    if (reaction.partial) await reaction.fetch();

    if (reaction.message.id !== verifyMessageId) return;
    if (reaction.emoji.name !== config.verifyEmoji) return;

    const member = await reaction.message.guild.members.fetch(user.id);
    await member.roles.remove(config.verifyRoleId);

  } catch (err) {
    console.error("REMOVE ERROR:", err);
  }
});

client.login(process.env.TOKEN);
