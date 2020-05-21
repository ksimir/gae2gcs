const Cloud = require('@google-cloud/storage')
const path = require('path')

// NOTE: here we don't need servicekey as well as info about project ID because we will run in GAE env
// that will use it's own service account and already know about the GCP project ID

//const serviceKey = path.join(__dirname, './keys.json')

const { Storage } = Cloud

const storage = new Storage({
  //keyFilename: serviceKey,
  //projectId: 'you-project-id',
})

module.exports = storage