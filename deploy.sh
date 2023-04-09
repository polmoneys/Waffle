#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd docs

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git add -A
git commit -m 'docs: improve demo'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:polmoneys/Waffle.git
unicorn:gh-pages

cd -