const fs = require('fs')
const commands = {}

if (!fs.existsSync('./commands/admin')) fs.mkdirSync('./commands/admin')
if (!fs.existsSync('./commands/admin/eval.js'))
  fs.writeFileSync('./commands/admin/eval.js', fs.readFileSync(`${__dirname}/commands/admin/eval.js`))

const commandsdir = require('path').resolve('./commands/admin/')+'/'
const files = fs.readdirSync(commandsdir)
function setCommand(file, reload) {
  if (reload) delete require.cache[require.resolve(`./commands/admin/${file.replace(/\.\./gm, '')}`)]
  const rawcommand = require(`${commandsdir}${file}`)
  if (typeof rawcommand != 'function') return
  const command = new rawcommand()
  if (rawcommand.constructor.name === 'Command') return
  commands[command.name] = command
  for (const alias of command.alias) {
    if (commands[alias] && !reload)
      throw new ReferenceError(`The ${command.name} alias ${alias} is already used.`)
    commands[alias] = command
  }
}

for (const file of files) if (file.endsWith('.js')) setCommand(file)

module.exports = {
  commands,
  reloadAll() {
    const newfiles = fs.readdirSync('./commands/admin/')
    for (const file of newfiles) if (file.endsWith('.js')) setCommand(file, true)
  },
}
