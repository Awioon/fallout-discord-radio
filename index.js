const RADIO_URL = 'https://fallout.fm:8444/falloutfm6.ogg';
require('dotenv').config();

// ------importaciones------ 
const {
    Client,
    GatewayIntentBits,
    ActivityType,
    Partials,
    Message,
    TextInputStyle,
    ConnectionService,
    Guild
} = require('discord.js');


const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
    entersState,
    VoiceConnectionStatus,
    StreamType

} = require('@discordjs/voice');


const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]

});


bot.on('ready', ()=> {
    console.log("Bot encendido")
});

const frasesDelYermo = [
    "La guerra... la guerra nunca cambia.",
    "¡Tres Dog aquí! ¿Qué tal está mi audiencia?",
    "Otra necesidad del yermo satisfecha.",
    "Recuerda: el azul es para las mentiras, el rojo para la verdad. O al revés...",
    "¡Un mutante! ¡DISPARAD!",
    "Me han puesto un cartel de 'No alimentar'... qué groseros.",
    "Podría haberme quedado en el refugio... pero qué aburrido.",
    "¿Eso es un Deathclaw o solo tengo radiacion en los ojos?",
    "Mis partes de robot dicen que necesito un descanso... mi sentido común dice que sigas disparando.",
    "Encontré un Pastelito Perfectamente Conservado. Día de suerte... supongo.",
    "¡Un Yao Guai! Corre... o prepárate para ser el almuerzo.",
    "Fallout 4: el juego donde pasas 50 horas construyendo casas y 5 en la trama principal.",
    "¡Otro asentamiento necesita tu ayuda!",
    "¡Humanooooo!",
    "Nuka-Cola: ¡Refresca lo nuclear!",
    "¡Vault-Tec, tu futuro comienza hoy!",
    "Buffout: ¡Para cuando necesitas SER más fuerte!",
    "Rad-X: Porque la radiación no es un accesorio.",
    "¿Aburrido? ¡Visite la Cúpula de la Muerte en Nuka-World!",
    "¡Sugar Bombs! Ahora con más radiación... digo, sabor.",
];



bot.on('messageCreate', (mensaje) => {
   
    if(mensaje.content === '!radio'){
        if(!mensaje.member.voice.channel){
            mensaje.reply("Tienes que estar en un canal de voz");
            return;
        }else{
            const conexion = joinVoiceChannel({
                channelId: mensaje.member.voice.channel.id, 
                guildId: mensaje.guild.id ,   
                adapterCreator: mensaje.guild.voiceAdapterCreator,
                selfDeaf: true
                })
                
            const player = createAudioPlayer();
            const radio = createAudioResource(RADIO_URL);
            player.play(radio);
            conexion.subscribe(player);
            mensaje.reply("La radio suena en el refugio");
            console.log("Conectado al servidor")
        };
        
            
        
    }   
        
    
    if(mensaje.content === '!stop'){
        const desconexion = getVoiceConnection(mensaje.guild.id) 
            if(desconexion){
            desconexion.destroy();
            mensaje.reply("Te expulso del refugio eres un mutante")
            console.log("El bot no esta en ningun canal") 
        }
    }


    if(mensaje.content === '!help'){
        mensaje.reply(`
        **Comandos disponibles:**
            **!radio**: Conectar la radio
            **!stop**: Desconectar la radio
            **!frase**: Frases miticas
        `);
    }


    if (mensaje.content === '!frase'){
        const aleatorio = Math.floor(Math.random() * frasesDelYermo.length);
        mensaje.reply(frasesDelYermo[aleatorio]);


    }



});

bot.login(process.env.DISCORD_TOKEN);