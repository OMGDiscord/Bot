const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "what happend to arab craft minecraft server"){
        message.reply("We had to Close it sadly for hardware resones")
    }
    if (message.content == "What happend to arab craft minecraft server"){
        message.reply("We had to Close it sadly for hardware resones")
    }
    if (message.content == "What happend to Arab Craft Minecraft Server"){
        message.reply("We had to Close it sadly for hardware resones")
    }
    if (message.content == "Fuck you"){
        message.reply("Fuck you, Friena!, Go LEAVE , GO AWAY")
    }
    if (message.content == "fuck you"){
        message.reply("Fuck you, Friena!, Go LEAVE , GO AWAY")
    }
    if (message.content == "hi"){
        message.reply("Hi, Friena!")
    }
    if (message.content == "hello"){
        message.reply("Hello, Friena!")
    }
    if (message.content == "hey"){
        message.reply("Hey Friena!")
    }
    if (message.content == "harm"){
        message.reply("Harm on you Friena!")
    }
    if (message.content == "Hi"){
        message.reply("Hi, Friena!")
    }
    if (message.content == "Hello"){
        message.reply("Hello, Friena!")
    }
    if (message.content == "Hey"){
        message.reply("Hey Friena!")
    }
    if (message.content == "Harm"){
        message.reply("Harm on you Friena!")
    }
    if (message.content == "nah"){
        message.reply("okay as you see")
    }
    if (message.content == "yeah good bot"){
        message.reply("ok, thanks its good from you")
    }
    if (message.content == "$help"){
        message.reply("Nothing yet + this Very Basic Bot")
    }
    if (message.content == "hey it works"){
        message.reply("what works frineda?")
    }
    if (message.content == "it works"){
        message.reply("what works frineda?")
    }
    if (message.content == "SHIT"){
        message.reply("everyone is shit just leave the server frineda")
    }
    if (message.content == "shit"){
        message.reply("everyone is shit just leave the server frineda")
    }
})

const welcomeChannelId = "1063001410360324166"

client.on("guildMemberAdd", (member) =>{
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}>  Welcome to the server!`)
})

client.login(process.env.TOKEN)