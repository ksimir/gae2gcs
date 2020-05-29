'use strict';

require('@google-cloud/debug-agent').start();
const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer')

// Function to upload the file to GCS
const uploadImage = require('./helpers/helpers')

const app = express();

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      // no larger than 5mb.
      fileSize: 5 * 1024 * 1024,
    },
  });

app.disable('x-powered-by')
app.use(multerMid.single('image'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send(post_form);
});

app.post('/uploads', async (req, res, next) => {
    try {
      const myFile = req.file
      const imageUrl = await uploadImage(myFile)
  
      res
        .status(200)
        .json({
          message: "Upload was successful",
          data: imageUrl
        })
    } catch (error) {
      next(error)
    }
  })

app.use((err, req, res, next) => {
    res.status(500).json({
        error: err,
        message: 'Internal server error!',
    })
    next()
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

const post_form = `
<!DOCTYPE html>
<html>
  <head>
    <title>Sample web app</title>
  </head>
  <body>
    <form action="/uploads" method="post" enctype="multipart/form-data">

      <label for="Image">Image:</label>
      <input type="file" id="image" name="image"><br><br>
      
      <input type="submit" value="Upload">
    </form>
  </body>
</html>
`

module.exports = app;