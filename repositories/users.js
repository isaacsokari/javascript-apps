const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    // attach random id using crypto
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const buff = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const secureRecord = {
      ...attrs,
      password: `${buff.toString('hex')}.${salt}`,
    };
    records.push(secureRecord);

    // write the updated records to the file.
    await this.writeAll(records);
    return secureRecord;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split('.');

    const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuffer.toString('hex');
  }
}

module.exports = new UsersRepository('users.json');
