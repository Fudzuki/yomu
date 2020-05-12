const { Permissions } = require('discord.js')

class Command {
  constructor(name, options = {}) {
    if (!name) throw new TypeError('You must specify command name.')
    this.name = name

    this._options = Object.assign({
      alias: [],
      args: [],
      permission: 0,
      allowedIn: ['TextChannel', 'DMChannel', 'GroupDMChannel'],
      requiredOwner: false,
      enabled: true,
    }, options)

    this.allowedIn = this._options.allowedIn
    this.enabled = this._options.enabled
    this.alias = this._options.alias
    this.args = this._options.args
    this.requiredOwner = this._options.requiredOwner
    this.permission = new Permissions(this._options.permission).freeze()
  }

  get options() {
    return this._options
  }

  set options(val) {
    throw new Error(`${val} was passed but this property is read-only.`)
  }

  async run() {}

  async start(msg, lang, client, ...args) {
    if (!this.allowedIn.includes(msg.channel.constructor.name)) return msg.channel.send(`This command is only available in ${this.allowedIn.join(', ')}.`)
    return await this.run(msg, lang, client, ...args)
  }
}

module.exports = Command
