const { update } = require('../database')
const { bots, getAccountDetail, deals, getDealsBulk, getDealsUpdate } = require('./api');

/**
 * 
 * TODO
 * - Inspect if the lastSyncTime is set. If it is, then need to run bulk. If it's not, need to run update. This might need to go into
 * the code for threeC
 */
async function updateAPI(limit) {

  await deals(limit)
    .then(data => {
      console.log('made it back here')
      update('deals', data)
    })

  await getAccountDetail()
    .then(data => {
      update('accountData', data)
    })
}


module.exports = {
  bots,
  updateAPI,
  getAccountDetail, deals, getDealsBulk, getDealsUpdate
}