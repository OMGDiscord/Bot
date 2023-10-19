const Discord = require("discord.js");
require("dotenv").config();
const { Client, Intents, MessageAttachment } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

const GENERAL_CHANNEL_ID = '1164581616845328585';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  const generalChannel = client.channels.cache.get(GENERAL_CHANNEL_ID);

  if (generalChannel?.isText()) {
    generalChannel.send('Hi, I am OMG Everything!\nAnd I am ready now.\nUse /help to see a list of my commands.');
  }
});

//module.exports = {
//  data: {
//    name: 'upload',
//    description: 'Upload enderman Secret Song.',
//  },
//  async execute(interaction) {
//    const Discord = require('discord.js');
//    try {
//      const path = require('path');
//      const file = new Discord.MessageAttachment(path.join(__dirname, './d.mp3'));
//      await interaction.reply({ content: "Here is enderman Secret Song!:", files: [file] });
//    } catch (error) {
//      console.log(error);
//      await interaction.reply({ content: 'An error occurred!', ephemeral: true });
//    }
//  },
//};

client.once('ready', async () => {
  try {
    // wait for bot to be logged in
    await client.application?.fetch();

    // create the /ping command
    await client.application?.commands.create({
      name: 'ping',
      description: 'Ping the bot to check if it is online.',
    });

    // create the /userinfo command
    await client.application?.commands.create({
      name: 'userinfo',
      description: 'Displays information about the user or a mentioned user',
      options: [
        {
          name: 'target',
          type: 'USER',
          description: 'Select a user to display information about',
          required: false,
        },
      ],
    });
    console.log('Bot is ready!')
  } catch (error) {
    console.error(error);
  }
  await client.application?.commands.create({
    name: 'help',
    description: 'Displays list of commands.',
  });
  await client.application?.commands.create({
    name: 'adminhelp',
    description: 'Displays list of Admin commands.',
  });
});

// listen for command interactions
client.on('interactionCreate', async interaction => {
  const { SlashCommandBuilder } = require('@discordjs/builders');
  const { MessageEmbed } = require('discord.js');
  const { commandName, options } = interaction;

  if (interaction.commandName === 'help') {
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Bot Commands')
      .setDescription('Here are the available commands for this bot:')
      .addFields(
        { name: '/help', value: 'Displays this list of commands' },
        { name: '/ping', value: 'Pings the bot to check if it is working' },
        { name: '/userinfo', value: 'To see Your or A user Info' },
        { name: '/meme', value: 'Displays a random meme from r/memes' },
		    { name: '/upload', value: 'Uploads a secrect File' },
        { name: '/resones-why-to-never-upgrade-to-windows-11', value: 'Bad but pepole asked for it' },

        // Add more command fields here if needed
        );

        // Reply to the interaction with the embed
        interaction.reply({ embeds: [embed] });
      }
  if (interaction.commandName === 'adminhelp') {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Bot Admin Commands')
        .setDescription('Here are the available admin commands for this bot:')
        .addFields(
        {  name: '/adminhelp', value: 'Displays this list of commands' },
        { name: '/giverole', value: 'Gives a role to a User' },
        { name: '/removerole', value: 'Removes a Role from User' },
        { name: '/clear', value: 'To clear the chat from 1 - 99 messages' },
    
            // Add more command fields here if needed
            );
    
            // Reply to the interaction with the embed
          interaction.reply({ embeds: [embed] });
      }
  if (interaction.commandName === 'ping') {
    const startTime = Date.now();
    await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const endTime = Date.now();
    await interaction.editReply(`Pong! Latency is ${endTime - startTime}ms.`);
  }
  if (interaction.commandName === 'userinfo') {
    const user = interaction.options.getUser('target') || interaction.member.user;
    const avatarURL = user.displayAvatarURL();
    const createdAt = new Date(user.createdAt);
    
    let response = `Username: ${user.username}\nID: ${user.id}\nAvatar: ${avatarURL}\nAccount created on: ${createdAt}`;
    
    if (interaction.options.getUser('target')) {
      response = `<@${user.id}>'s information:\n${response}`;
    }
  
    await interaction.reply(response);
  }
});


const prefix = "/";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "hello") {
    message.channel.send("Hello, World!");
  }
  if (command === 'enderman') {
  message.channel.send('Here is enderman Secrect Song.');
  message.channel.send({
    files: ['./d.mp3']
});
  }
if (command === 'userinfo') {
  if (message.mentions.users.first()) {
    const taggedUser = message.mentions.users.first();
    const avatarURL = taggedUser.displayAvatarURL();
    const createdAt = new Date(taggedUser.createdAt);

    message.reply(`Username: ${taggedUser.username}\nID: ${taggedUser.id}\nAvatar: ${avatarURL}\nAccount created on: ${createdAt}`);
  } else {
    const avatarURL = message.author.displayAvatarURL();
    const createdAt = new Date(message.author.createdAt);

    message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nYour avatar: ${avatarURL}\nAccount created on: ${createdAt}`);
  }
}
if (command === 'ping') {
  const startTime = Date.now();
  message.channel.send('Pinging...')
    .then((msg) => {
      const endTime = Date.now();
      msg.edit(`Pong! Latency is ${endTime - startTime}ms`);
    })
    .catch(console.error);
}
if (command === 'clear') {
  if (!message.member.permissions.has('ADMINISTRATOR')) {
    return message.reply('You do not have permission to use this command.');
  }

  const deleteCount = parseInt(args[0], 10) + 1;

  if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
    return message.reply('Please enter a number between 1 and 99 for the number of messages to delete');
  }

  message.channel.bulkDelete(deleteCount, true)
    .then(deleted => console.log(`Deleted ${deleted.size} messages.`))
    .catch(err => message.reply(`Something went wrong: ${err}`));
}
  if (command === 'giverole') {
     // Check if the user has permission to use the command
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply('You do not have permission to use this command.');
      return;
    }

    // Check if a user and role were mentioned
    const user = message.mentions.members.first();
    const role = message.mentions.roles.first();
    if (!user || !role) {
      message.reply('Please mention a user and a role.');
      return;
    }

    // Give the role to the user
    user.roles.add(role)
      .then(() => {
        // Send a success message
        message.channel.send(`Successfully gave the ${role.name} role to ${user.displayName}.`);
      })
      .catch(error => {
        // Handle any errors that occur
        console.error('Error while giving role:', error);
        message.channel.send('An error occurred while giving the role.');
      });
  }
  if (command === 'removerole') {
    // Check if the user has permission to use the command
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply('You do not have permission to use this command.');
      return;
    }

    // Check if a user and role were mentioned
    const user = message.mentions.members.first();
    const role = message.mentions.roles.first();
    if (!user || !role) {
      message.reply('Please mention a user and a role.');
      return;
    }

    // Remove the role from the user
    user.roles.remove(role)
      .then(() => {
        // Send a success message
        message.channel.send(`Successfully removed the ${role.name} role from ${user.displayName}.`);
      })
      .catch(error => {
        // Handle any errors that occur
        console.error('Error while removing role:', error);
        message.channel.send('An error occurred while removing the role.');
      });
  }
if (command === "meme") {
    const axios = require('axios');
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed();
    
    axios.get('https://www.reddit.com/r/memes/random/.json')
        .then(response => {
            const [post] = response.data[0].data.children;

            const permalink = post.data.permalink;
            const memeUrl = `https://reddit.com${permalink}`;
            const memeImage = post.data.url;
            const memeTitle = post.data.title;
            const memeUpvotes = post.data.ups;
            const memeNumComments = post.data.num_comments;

            embed.setTitle(`${memeTitle}`);
            embed.setURL(`${memeUrl}`);
            embed.setColor('RANDOM');
            embed.setImage(memeImage);
            embed.setFooter({
                text:`👍 ${memeUpvotes} 💬 ${memeNumComments}`
            });

            message.channel.send({ embeds: [embed] });
        })
        .catch(console.error);
}
if (command === 'upload') {
  message.channel.send('Here is enderman Secrect Song.');
  message.channel.send({
    files: ['./d.mp3']
});
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const lowerCaseMessage = message.content.toLowerCase();

  if (lowerCaseMessage === "hi") {
    message.reply("Hi, Frineda!");
    return;
  }
  if (lowerCaseMessage === "hello") {
    message.reply("Hello, Frineda!");
    return;
  }
  if (lowerCaseMessage === "hey") {
    message.reply("Hey, Frineda!");
    return;
  }
  if (lowerCaseMessage === "harm") {
    message.reply("Harm on you, Frineda!");
    return;
  }
  if (lowerCaseMessage === "nah") {
    message.reply("Okay, as you see.");
    return;
  }
  if (lowerCaseMessage === "how to install cemu on linux") {
    message.reply("https://boisterous-toffee-60cc83.netlify.app/cemu-on-linux");
    return;
  }
  if (lowerCaseMessage === "$help") {
    message.reply("This command moved to `/help` while Discord doesn't register commands. It's working.");
    return;
  }
  if (lowerCaseMessage === "hey it works") {
    message.reply("What works, Frineda?");
    return;
  }
  if (lowerCaseMessage === "it works now") {
    message.reply("What works, Frineda?");
    return;
  }
  if (lowerCaseMessage === "what happened to arab craft minecraft server") {
    message.reply("We had to close it sadly for hardware reasons.");
    return;
  }
  if (lowerCaseMessage === "hi halal") {
    message.reply("SO HALAL MODE.");
    return;
  }
  if (lowerCaseMessage === "hi bitch") {
    message.reply("SO HARAM MODE.");
    return;
  }
});

const welcomeChannelId = "1110480597333327934"
const leaveChannelId = "1110480606548213780"

client.on('guildMemberAdd', member => {
  // Get the channel by ID
  const channel = member.guild.channels.cache.get(welcomeChannelId);
  
  if (channel) {
    // Send a welcome message to the channel
    channel.send(`${member} Welcome to the server!`);
  }
});
client.on("guildMemberRemove", (member) => {
  const channel = member.guild.channels.cache.get(leaveChannelId); // Replace 'INSERT_CHANNEL_ID_HERE' with the actual channel ID
  channel.send(`${member.user.tag} left the server.`); // Customized message to be sent in the channel
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore messages from other bots and self
  if (!message.guild) return; // Ignore DMs

  const allowedDomains = ['wiki.archlinux.org', 'wiki.artixlinux.org', 'ubuntu.com', 'fedoraproject.org', 'microsoft.com', 'freebsd.org', 'gentoo.org', 'github.com', 'gitlab.gnome.org', 'bugs.kde.org', 'kde.org', 'gnome.org', 'pop.system76.com', 'linuxmint.com', 'tenor.com', 'ix.io', 'youtube.com'];
  const hasLinkPermission = message.member.permissions.has('ADMINISTRATOR');
  const messageContent = message.content.toLowerCase(); // Convert message content to lowercase for case-insensitive matching

  const hasLink = /(http|https):\/\/(\S+)\.(\S+)/gi.test(messageContent);

  const isAllowedLink = allowedDomains.some((domain) => {
    const regex = new RegExp(`${domain.replace('.', '\\.')}`, 'gi');
    return regex.test(messageContent);
  });

  if (hasLink && !hasLinkPermission && !isAllowedLink && message.author.id !== client.user.id) {
    message.delete();
    message.reply(
      'Sorry, you are not allowed to post links in this server! Your message has been deleted.'
    )
      .then((replyMessage) => {
        setTimeout(() => {
          replyMessage.delete();
        }, 15000);
      })
      .catch(console.error);
  }
});

client.on('messageCreate', async (message) => {
  const swearWords = ['fuck', 'shit', 'wtf', 'fu`ck`', 'nigger', 'Fuxk', 'fk', 'gay', 'lesbian', 'porn', 'fuсk'];
  const ownerRoleName = 'Owner';
  const timeoutDuration = 60000; // 1 minute in milliseconds

  if (
    !message.author.bot &&
    !message.member.roles.cache.some((role) => role.name === ownerRoleName) &&
    !message.member.permissions.has('ADMINISTRATOR') &&
    swearWords.some((word) => message.content.toLowerCase().match(`\\b${word}\\b`))
  ) {
    message.delete().catch(console.error);

    const user = message.author;

    const timeoutRole = message.guild.roles.cache.get('1164585849950847036'); // Replace 'TimeoutRoleID' with the actual ID of the timeout role

    try {
      await user.roles.add(timeoutRole);
  
      message.reply(`Oops! You are not allowed to swear in this server. Your message has been deleted and you have been muted for 1 minute.`);
  
      setTimeout(() => {
        user.roles.remove(timeoutRole);
        message.channel.send(`<@${user.id}>, your mute has been lifted. You can now send messages in the server.`);
      }, timeoutDuration);
    } catch (error) {
      console.error(error);
    }
  }
});

client.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`Welcome to the server, ${member}!`);
  }
});

client.on('guildMemberRemove', (member) => {
  const guild = member.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`${member} has left the server.`);
  }
});

client.on('messageDelete', (message) => {
  const guild = message.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`A message by ${message.author.tag} was deleted in ${message.channel}: "${message.content}"`);
  }
});
// Channel update listener
client.on('channelUpdate', (oldChannel, newChannel) => {
  const guild = oldChannel.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`Channel ${oldChannel.name} has been updated to ${newChannel.name}`);
  }
});

// Channel create listener
client.on('channelCreate', (channel) => {
  const guild = channel.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`New channel created: ${channel.name}`);
  }
});

// Channel delete listener
client.on('channelDelete', (channel) => {
  const guild = channel.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`Channel deleted: ${channel.name}`);
  }
});


// User update listener
client.on('guildMemberUpdate', (oldMember, newMember) => {
  const guild = oldMember.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`User ${oldMember} has been updated to ${newMember} `);
  }
});

// Edited messages listener
client.on('messageUpdate', (oldMessage, newMessage) => {
  const guild = oldMessage.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  
  // Ignore messages edited by the bot itself
  if (oldMessage.author.bot) {
    return;
  }

  if (modLogChannel) {
    modLogChannel.send(`A message by ${oldMessage.author.tag} was edited in ${oldMessage.channel}: "${oldMessage.content}" was changed to "${newMessage.content}"`)
      .catch(console.error);
  }
});

// Role add listener
client.on('guildMemberUpdate', (oldMember, newMember) => {
  // Check if roles were added to the member
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  if (addedRoles.size > 0) {
    const guild = oldMember.guild;
    const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
    if (modLogChannel) {
      modLogChannel.send(`User ${newMember.displayName} has been given the role(s): ${addedRoles.map(role => role.name).join(', ')}`);
    }
  }
  
  // Check if roles were removed from the member
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
  if (removedRoles.size > 0) {
    const guild = oldMember.guild;
    const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
    if (modLogChannel) {
      modLogChannel.send(`User ${newMember.displayName} has had the role(s): ${removedRoles.map(role => role.name).join(', ')} removed`);
    }
  }
});
// Nickname update listener
client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.nickname !== newMember.nickname) { // check if the nickname has changed
    const guild = oldMember.guild;
    const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
    if (modLogChannel) {
      modLogChannel.send(`User ${oldMember.displayName}'s nickname has been set to ${newMember.nickname || newMember.user.username}`);
    }
  }
});

const https = require('https');
const fs = require('fs');
const path = require('path'); // <- Add this line
client.on('messageCreate', async (message) => {
  if (message.attachments.size > 0) {
    const attachment = message.attachments.first();

    // Use path.join() to create a file path containing the 'uploads' sub-folder
    const filePath = path.join('uploads', attachment.name);
    const file = fs.createWriteStream(filePath);

    https.get(attachment.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        console.log(`File ${attachment.name} saved to disk.`);
      });
    });
  }
});

client.on('messageCreate', message => {
  if (message.content.startsWith('/resones-why-to-never-upgrade-to-windows-11')) {
    const reasons = [
      'Not all programs and hardware are compatible with Windows 11.',
      'Windows 10 already works well for most users and is still supported until 2025.',
      'Windows 11 requires higher system requirements, which may not be affordable or feasible for some users.',
      'There may be bugs and issues with the initial release of Windows 11 that still need to be addressed.',
      'Some users prefer the interface and experience of Windows 10 over Windows 11.',
      'Windows 11 may introduce new or unnecessary features that some users do not want or need.',
      'Upgrading to Windows 11 may require reinstalling applications and data, which can be time-consuming and arduous for some users.'
    ];
    // Choose a random reason from the array
    const randomIndex = Math.floor(Math.random() * reasons.length);
    const randomReason = reasons[randomIndex];

    // Send the random reason as a message
    message.channel.send(`Here's a reason not to upgrade to Windows 11: ${randomReason}`);
  }
});
client.on('messageCreate', message => {
  if (message.content.toLowerCase().startsWith('<@1110480684700668024> , are you real?')) {
    const reasons = [
      'No, I am not real. I am just a bunch of code.',
      'Real as Discord JS can be.',
      'Yes, I am real in code.',
      'I am not human, but I am just a bunch of code.'
    ];
    // Choose a random reason from the array
    const randomIndex = Math.floor(Math.random() * reasons.length);
    const randomReason = reasons[randomIndex];

    // Send the random reason as a message
    message.channel.send(`${randomReason}`);
  }
});
client.on('messageCreate', message => {
  if (message.content.startsWith('<@1110480684700668024> , kys')) {
    const reasons = [
      'You kill your self.',
      'I am just bunch of code, I CANT DIE, TRUST ME.',
      'YOU DIE, I CANT DIE I AM CODE, TRUST ME.',
      'PLEASE, SWEARING is not allowed.',
      'Please leave/die, so pepole can be happy'
    ];
    // Choose a random reason from the array
    const randomIndex = Math.floor(Math.random() * reasons.length);
    const randomReason = reasons[randomIndex];

    // Send the random reason as a message
    message.channel.send(`${randomReason}`);
  }
});
client.on('messageCreate', message => {
  if (message.content.startsWith('<@1110480684700668024> , fk')) {
    const reasons = [
      'fk.',
      'Swearing is not allowed.',
      'wdym by fk? ||fuck||?.',
      'PLEASE, SWEARING is not allowed.',
      'Please leave/die, so people can be happy'
    ];
    // Choose a random reason from the array
    const randomIndex = Math.floor(Math.random() * reasons.length);
    const randomReason = reasons[randomIndex];

    // Send the random reason as a message
    message.channel.send(`${randomReason}`);
  }
});
client.on('messageCreate', message => {
  const msgContent = message.content.toLowerCase(); // Convert the message content to lowercase
  
  if (msgContent.includes('<@1110480684700668024> , will this work')) {
    // Check if message ends with a question mark
    if (msgContent.endsWith('?')) {
      message.reply('https://tryitands.ee');
    } else {
      message.reply('https://tryitands.ee');
    }
  }

  if (msgContent.includes('<@1110480684700668024> , will this linux work')) {
    // Check if message ends with a question mark
    if (msgContent.endsWith('?')) {
      message.channel.send({
        files: ['./linuxitandsee.mp4']
    });
    } else {
      message.channel.send({
        files: ['./linuxitandsee.mp4']
    });
    }
  }


  if (msgContent === 'gofy a phone') {
    message.reply('https://www.youtube.com/shorts/i2--25-N3vs');
  }
});
client.on('message', (message) => {
  if (message.content.includes('@someone') && message.author !== client.user) {
    const membersArray = Array.from(message.guild.members.cache);

    if (membersArray.length === 0) {
      message.channel.send("No members found in the guild.");
      return;
    }

    let content = message.content;

    for (let i = 0; i < 5; i++) {
      if (content.includes('@someone')) {
        const randomIndex = Math.floor(Math.random() * membersArray.length);
        const randomMember = membersArray[randomIndex][1];

        const mentionString = `<@${randomMember.user.id}>`;
        content = content.replace('@someone', mentionString);
      } else {
        break;
      }
    }

    message.delete(); // Deleting the original message

    const response = `<@${message.author.id}> said: ${content}`;
    message.channel.send(response);
  }
});



client.on('message', (message) => {
  if (message.content.includes('AFK') && !message.author.bot) {
    const author = message.author;
    const content = message.content.replace('AFK', '');
    
    message.delete()
      .then(() => {
        let response = `Uh bruh He have went afk, ${author} said: ${content}`;
        
        message.channel.send(response);
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  }
});

client.on('message', (message) => {
  if (message.content.includes('BRB') && !message.author.bot) {
    const author = message.author;
    const content = message.content.replace('BRB', '');
    
    message.delete()
      .then(() => {
        let response = `brb? brb? BRAB BRAB, he dont do brb, because its haram, ${author} said: ${content}`;
        
        message.channel.send(response);
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  }
}); 

client.on('messageCreate', async (message) => {
  const adminPermission = message.member?.permissions.has('ADMINISTRATOR');
  
  if (message.channel.name === 'general-no-chat' && !adminPermission && message.author.id !== client.user.id) {
    message.delete();
    const userTag = `<@${message.author.id}>`;
    message.channel.send(`${userTag} said: ${message.content}`);
  }
});

client.login(process.env.TOKEN)