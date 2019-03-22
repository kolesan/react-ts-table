# template-webpack-dev
Template project with:
* webpack-dev-server
* css-loader and html plugin
* Jest



### Repo setup
Download zip of this repo and extract \
Do `git init` in the resulting folder \
Create new repository in GitHub and copy its ssh path \
Edit package.json or do `npm init` \
Edit README and do
```
git add .
git commit -m "Initial commit"
git remote add origin [ssh path you copied]
git push --set-upstream
```
### Npm initialization
```
npm install
```

### Running
Use `npm run dev` to start a webpack development server

Use `npm run build` to build production bundle

### Tests
Use `npm run test` to run the Jest test suite
Use `npm run testWatch` to use Jest watch mode
Use `npm run coverage` to get test coverage stats