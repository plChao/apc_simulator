const { natsMessageHandler } = require('../messageUtil');

describe('Module messageUtil', () => {
  const fakeType = 'FACTOR_THICKNESS';
  const fakeType2 = 'FACTOR_MOISTURE';
  const fakeFactor = 0.5;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Method natsMessageHandler for success', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: fakeType,
        factor: fakeFactor,
      })
    );
  
    expect(global.cache.set).toHaveBeenCalledWith(fakeType, fakeFactor);
  });

  it('Method natsMessageHandler for success2', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: fakeType2,
        factor: fakeFactor,
      })
    );
  
    expect(global.cache.set).toHaveBeenCalledWith(fakeType2, fakeFactor);
  });

  it('Method natsMessageHandler for failed', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: 'FAKE_TYPE',
        factor: fakeFactor,
      })
    );
    
    expect(global.cache.set).toBeCalledTimes(0);
    // expect(global.cache.set.fakeType).toBe(fakeFactor);
    // expect(global.cache).toBe(null);
    
  });

  it('Global Cache to be null', async ()=> {
    global.cache = null;
    let result = natsMessageHandler();
    expect(result).toBeUndefined();
  });
});
