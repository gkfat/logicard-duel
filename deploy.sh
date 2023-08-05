#/!bin/bash

TODAY=$(date +"%Y%m%d")

npm run build
cd public
git add .
git commit -m "New gh-pages release $TODAY"
git push
cd ..