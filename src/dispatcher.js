const Discord = require('discord.js') // eslint-disable-line
const { commands } = require(__dirname + '/commands/admin/')

async function runCommand(command, msg, lang, client, ...args) {
  if (!command.enabled) throw new Error(`${command.name} is disabled.`)
  await command.start(msg, lang, client, owner,  ...args)
}

/**
 * @param {Discord.Message} msg
 * @param {Object} lang
 * @param {string} prefix
 * @returns {Promise<void>}
 */
const fu = async (msg, lang, client, ...args) => {
  if (msg.author.bot || msg.system) return
  const [cmd] = msg.content.replace(prefix, '').replace(/\s{1,}/gm, ' ').split(' ')
  if (commands[cmd]) await runCommand(commands[cmd], msg, lang, client, ...args)
}

module.exports = fu
