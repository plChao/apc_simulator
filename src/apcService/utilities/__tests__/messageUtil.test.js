const { natsMessageHandler } = require('../messageUtil');
const db = require('../../../utilities/mongodb')

beforeAll(async () => {
  db.connect();
  await new Promise(r => setTimeout(r, 3000));
});

describe('Module messageUtil', () => {
  const fakeType = 'FACTOR_THICKNESS';
  const fakeType2 = 'FACTOR_MOISTURE';
  // defined at default.js
  const fakeFactor = 0.5;
  const fakeFactor2 = 0.5;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Method natsMessageHandler for success', async () => {
    const factors = db.getCollection('factors');
    natsMessageHandler(
      JSON.stringify({
        type: fakeType,
        factor: fakeFactor,
      })
    );
    expect((await factors.findOne({name: fakeType})).value).toBe(fakeFactor);
  });

  it('Method natsMessageHandler for success2', async () => {
    const factors = db.getCollection('factors');
    natsMessageHandler(
      JSON.stringify({
        type: fakeType2,
        factor: fakeFactor,
      })
    );
    // wont call the logger.js, which will call is factor.js
    expect((await factors.findOne({name: fakeType2})).value).toBe(fakeFactor2);
  });

  it('Method natsMessageHandler for failed', async () => {
    const factors = db.getCollection('factors');
    natsMessageHandler(
      JSON.stringify({
        type: 'FAKE_TYPE',
        factor: fakeFactor,
      })
    );
    
    expect((await factors.findOne({name: 'FAKE_TYPE'}))).toBe(null);
  });

  it('Factors to be null', async ()=> {
    db.getCollection = jest.fn().mockReturnValue(null);
    let result = natsMessageHandler();
    expect(result).toBeUndefined();
  });
  
});

afterAll(done => {
  db.disconnect();
  done();
});