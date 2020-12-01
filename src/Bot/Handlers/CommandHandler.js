const fs = require('fs');

function CommandHandler(Bumper) {
  fs.readdir('./src/Bot/Commands/', (err, files) => {
    if (err) {
     return console.log(`(Bot) Found an error while loading Bumper's Commands.\n${err.stack}`);
    };
    
	  let jsfiles = files.filter(f => f.split('.').pop() == 'js');
  
	  if (jsfiles.length <= 0) {
      console.log('(Bot) No Commands to load.');
    };
  
    jsfiles.forEach(f => {
		  let props = require(`../Commands/${f}`);
      
		  Bumper.Commands.set(props.help.name, props);
		  props.conf.Aliases.forEach((Alias) => {
          Bumper.Aliases.set(Alias, props.help.name);
          
		  });
	  });
  });
}

module.exports = CommandHandler;