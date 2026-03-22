const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

client.once('ready', () => {
  console.log(`blessed is online as ${client.user.tag}`);

  // 🔴 DND STATUS
  client.user.setPresence({
    status: 'dnd',
    activities: [{
      name: 'blessed system',
      type: ActivityType.Playing
    }]
  });
});

// ✅ ADD ROLE
client.on('messageReactionAdd', async (reaction, user) => {
  try {
    if (user.bot) return;

    if (reaction.partial) await reaction.fetch();

    if (!reaction.message.guild) return;
    if (reaction.message.id !== config.verifyMessageId) return;

    // FIX FOR ✖️ EMOJI
    const emoji = reaction.emoji.name;
    if (emoji !== config.verifyEmoji) return;

    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member) return;

    await member.roles.add(config.verifyRoleId);

  } catch (err) {
    console.error("ADD ERROR:", err);
  }
});

// ❌ REMOVE ROLE
client.on('messageReactionRemove', async (reaction, user) => {
  try {
    if (user.bot) return;

    if (reaction.partial) await reaction.fetch();

    if (!reaction.message.guild) return;
    if (reaction.message.id !== config.verifyMessageId) return;

    const emoji = reaction.emoji.name;
    if (emoji !== config.verifyEmoji) return;

    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member) return;

    await member.roles.remove(config.verifyRoleId);

  } catch (err) {
    console.error("REMOVE ERROR:", err);
  }
});

client.login(process.env.TOKEN);
