const express = require('express');

const { defaultStrategy, sharonStrategy, ribeyesStrategy, stripStrategy } = require('../../utilities/strategyUtil');

const logger = require('../../../utilities/logger')('APC_SERVICE');

const router = express.Router();

const db = require('../../../utilities/mongodb');

router.post('/api/v1/process', async (req, res) => {
  const { id, type, thickness, moisture } = req.body;

  const handle = logger.begin({
    id,
    type,
    thickness,
    moisture,
  });

  try {
    if (db != null) {
      // logger.info('MongoDB not exist!');
      return;
    }
    const factors = db.getCollection('factors');
    if (!factors) {
      throw new Error('the db factors is not existed');
    }
    const tFactor = factors.get('FACTOR_THICKNESS');
    const mFactor = factors.get('FACTOR_MOISTURE');

    let data = null;
    if (type === 'SHARON') {
      data = sharonStrategy(thickness, tFactor);
    } else if (type === 'RIB_EYE') {
      data = ribeyeStrategy(thickness, tFactor);
    } else if (type === 'STRIP') {
      data = stripStrategy(thickness, tFactor);
    } else {
      data = defaultStrategy(moisture, mFactor);
    }

    logger.end(handle, { tFactor, mFactor, ...data }, `process (${id}) of APC has completed`);

    return res.status(200).send({ ok: true, data: { ...data, tFactor, mFactor } });
  } catch (err) {
    logger.fail(handle, { tFactor, mFactor }, err.message);

    return res.status(500).send({ ok: false, message: err.message });
  }
});

module.exports = router;
