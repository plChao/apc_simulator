module.exports = {
  cron: {
    measurePeriod: 10000,
    paramsPeriod: 15000,
  },
  nats: {
    connection: '127.0.0.1:4222',
    name: 'testbed',
    stream: 'testbed_stream',
    subject: 'testbed.subject',
    consumer: 'testbed_consumer',
  },
  domainService: {
    apc: {
      endpoint: 'http://127.0.0.1:3031',
      port: 3031,
    },
    params: {
      endpoint: 'http://127.0.0.1:3032',
      port: 3032,
    },
  },
  db: {
    // url: 'mongodb://localhost:27017/',
    url: 'mongodb+srv://sandy:sandy0123@cluster0.s6fz0.mongodb.net/?retryWrites=true&w=majority',
    // url: process.env.DB_SERVER,
    dbName: 'apcDB',
    initValue: {
      FACTOR_THICKNESS: 0.5,
      FACTOR_MOISTURE: 0.5,
    },
  },
};
