# Sample web app to upload a file to GCS

# Setup dev environment
```
$ npm init --y
$ npm i express body-parser multer
$ npm i @google-cloud/storage
```

# Deployment

## Create a GCS bucket 
Follow the instrcutions here: https://cloud.google.com/storage/docs/quickstart-console
(in my example I used gcs-demo for the bucket name)

If you want to use a command line:
```
$ gsutil mb -c regional -l asia-northeast1 gs://gcs-demo/
```
## Note about service account
Since you deploy this app to App Engine (GAE), you don't need to specify a project ID or a service account.
GAE will use its default service account called <project_id>@appspot.gserviceaccount.com which already have 
all the needed persmissions to upload files to GCS.
You also don't need to specify the project ID since it runs on GAE.

# Deploy on GAE
```
$ gcloud app deploy
```

# Test the app
```
$ gcloud app browse
```