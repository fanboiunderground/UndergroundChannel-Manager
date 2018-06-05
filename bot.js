const botSetting = require("./config.json")
const speaker = require("./speaker.json")
const Discord = require('discord.js');
var format = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
const prefix = botSetting.prefix

const bot = new Discord.Client();

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

const protec = [434206676845985792]



app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

function protecc(cid = speaker.cid){
  bot.channels.get(cid).sendMessage("This channel is under identity protection");
}

function adminPic(cid = speaker.cid,message = speaker.message){
  bot.channels.get(cid).sendMessage({file: message});
}

function adminSpeak(cid = speaker.cid,message = speaker.message){
  bot.channels.get(cid).sendMessage(message);
}

function adminCode(cid = speaker.cid,message = speaker.message){
  bot.channels.get(cid).sendCode('CSS',message);
}

function addChannel(server,name){
    return server.createChannel(name, "text");
}

function moveChannel(server,name,parentID){
  var newChannel = server.channels.find('name', name);
  newChannel.setParent(parentID);
}

async function channelCreate(message,name,pname){
  var server = message.guild;
  var parent = server.channels.find('name',pname).id;
  var x = await(addChannel(server,name));
  var y = await(moveChannel(server,name,parent));
  var z = await(adminSpeak(bot.channels.find('name',name).id,`${name}-firstmessage`));
}

bot.on("ready", async () => {
    console.log(`Bot ready`);
    try {
      let link = await bot.generateInvite();
      console.log(`Invite link : ${link}`);
    } catch (e) {
      console.log(e.stack);
    }
  });

bot.on("guildMemberAdd",member =>{
  member.setNickname("Anonymous");
  console.log(`setNickname ${member} to Anonymous`);
});



bot.on("message", async message =>{
  if(message.member.nickname != "Anonymous"){
  message.member.setNickname("Anonymous");
  }

  //if(message.author.bot) return; //if any bot use this function, do nothing

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(command === `${prefix}test`){
      var at = (message.attachments).array();
    message.channel.send({file:at[0].url});
    message.delete()
  }

    //identity protection
    if(message.content[0] === `?`){
    var auth = message.author
    var chan = message.channel
    var m = message.content.substr(1).slice(0, message.content.length);
    var at = (message.attachments).array();
    message.delete()
    message.channel.send(m);
    message.channel.send({file:at[0].url});
    bot.channels.get('452545819175026688').sendMessage(`${auth} => ${chan}\n: ${m}`);
    bot.channels.get('452545819175026688').sendMessage({file:at[0].url});
    return 0;
  }

  if(message.channel.id == 425691882346119189){
    //message.channel.send(message.content);
    message.channel.send(message.attachments.url);
    //message.delete();
  }
  if(!command.startsWith(prefix)) return;

    if(command ===`${prefix}protect`){
    var m = args[0].slice(2, -1);
    adminCode(m,"This channel is affected by identity protection, every message hide their author name.");
    bot.channels.get(m).setTopic("Identity Protected")
  }


  //admin command
  if(command === `${prefix}aspeak` && message.channel.id == 425691882346119189){
    var m = args[0].slice(2, -1);
    var i;
    var res = "";
    for(i = 1 ; i < args.length ; i++){
      res = res.concat(args[i]);
      res = res.concat(" ");
    }
    adminSpeak(m,res);
  }


  if(command === `${prefix}acode` && message.channel.id == 425691882346119189){
    var m = args[0].slice(2, -1);
    var i;
    var res = "";
    for(i = 1 ; i < args.length ; i++){
      res = res.concat(args[i]);
      res = res.concat(" ");
    }
    adminCode(m,res);
  }

  if(command === `${prefix}apic` && message.channel.id == 425691882346119189){
    var m = args[0].slice(2, -1);
    adminPic(m,args[1]);
  }

  //user command

  if(command === `${prefix}add`){
    if(args[0] == "server"){
    message.channel.sendCode('CSS',`ไม่สามารถสร้างChannelในหมวดServer`);
    return 0;
  }else if (args[2] != null) {
    message.channel.sendCode('CSS',`ชื่อห้องเว้นวรรคไม่ได้`)
    return 0;
  }
  else if(format.test(args[1])){
    message.channel.sendCode('CSS',`ชื่อห้องมีตัวอักษรพิเศษไม่ได้`)
  }
  else{
  args[1] = args[1].toLowerCase();
  channelCreate(message,args[1],args[0]);
  message.channel.sendCode('CSS',`สร้างChannel ${args[1]} ใน ${args[0]}`);
  }
  }
  if(command === `${prefix}schan`){
    speaker.cid = args[0];
    message.reply(`Channel set "${args[0]}"`);
  }


  if(command === `${prefix}put`){
    var parent = server.channels.find('name',args[1]).id;
    moveChannel(message.guild,args[0],parent);
    //moveChannel(message.guild,args[0],parent);
  }

if(command === `${prefix}guideline`){
    bot.channels.get(args[0]).sendMessage(`**Guideline**
นี่คือห้องdiscordสำหรับพูดคุยในเรื่องที่เว็บ fanboi.ch ห้ามพูดถึง
มู้คอสเพลย์,อยากเย็ด,และอื่นๆ ยกเว้นเรื่องพิซซ่า
แต่หากต้องการพูดถึงเรื่องพิซซ่าสามารถนัดกันแล้วไปพูดคุยได้ที่เว็บ https://www.chatcrypt.com/chat.html โดยตั้งค่าดังนี้
user: ชื่อที่ต้องการให้แสดงในช่องแชท
group name: Fanboi
group password: pizza

สามารถดูวิธีการใช้บอทได้โดยการพิมพ์ !help`);
}

  if(command === `${prefix}delete`){
    bot.channels.get('425691882346119189').sendMessage(`${bot.users.get('246302771953926144')} \n${message.author} ต้องการdelete ${args[0]} -> ${args[1]} เหตุผลเพราะว่า ${args[2]}`);
  }

  if(command === `${prefix}help`){
    message.channel.sendCode('CSS',`
    !add [หมวด] [ชื่อมู้] : เอาไว้ใช้ตั้งกระทู้ในหมวดนั้นๆ โดยห้ามมีตัวอักษรพิเศษหรือเว้นวรรค
    !delete [หมวด] [ชื่อมู้] [เหตุผล] : ส่งเรื่องลบมู้/แบนคนให้แอดมิน(ถ้าแบนคนให้กดmention)
    ถ้าจะดูตั้งแต่ต้นมู้ กดsearch พิมพ์ว่า [ชื่อห้อง]-firstmessage

    ?[ข้อความ] : ส่งข้อความแบบไม่ระบุชื่อ
    >>[ลิ้งรูปภาพ] : ส่งรูปภาพแบบไม่ระบุชื่อ

    ในกรณีที่บอทตายใช้ลิ้งนี้ https://fanboimanager-release.glitch.me/ เพื่อชุบชีวิต`);
  }


});

bot.login(botSetting.token)
