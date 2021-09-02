#!/bin/bash

# Stop following command execution if command before failed
set -e

# Remove previous bucket if exists
delete_previous_version_if_exists() {
  # We either delete local folder and bucket object or just a bucket
  rm -r ./socii-firestore-backup &&
  gsutil -m rm -r gs://socii-development.appspot.com/socii-firestore-backup 
}

export_production_firebase_to_emulator() {
  # Export production firebase to emulator bucket
  gcloud firestore export gs://socii-development.appspot.com/socii-firestore-backup
  
  # Copy to local folder
  gsutil -m cp -r gs://socii-development.appspot.com/socii-firestore-backup .
}

# Run bash functions, either delete previous bucket and local folder if exists 
# for update or just export clean way
delete_previous_version_if_exists && export_production_firebase_to_emulator ||
export_production_firebase_to_emulator