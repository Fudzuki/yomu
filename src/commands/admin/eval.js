const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    const opts = {
      args: ['<Code>'],
      requiredOwner: true,
    }
    super('eval', opts)
  }

  async run(msg, lang, args) {
    if (!args[1]) return msg.channel.send(':x: Invalid args.')
    args[1] = args[1].toString()
    !(async () => {
      if (args[1].includes('async:')) {
        args[1] = args[1].replace(/async:/g, '')
        return await eval(`(async () => {${args.slice(1).join(' ')}})()`)
      } else return await eval(args.slice(1).join(' '))
    })().then(data => {
      msg.channel.send(`:ok_hand: (${data})`)
    }).catch(e => {
      msg.channel.send(`:x: (${e.message})`)
    })
  }
}
