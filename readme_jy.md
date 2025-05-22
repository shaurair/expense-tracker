https://www.youtube.com/watch?v=_ycD0d7skdQ

// **\*** START **\*** //
npx create-react-app .

/src
remain only App.css, App.js, index.js
delete others

index.js
remove sth

App.js
remove sth

npm start
npm install react-router-dom firebase
npm install -g firebase-tools
npm install

https://firebase.google.com/
create project
build authentication

...

if npm error code EACCES -> sudo npm ...

// **\*** Run localhost **\*** //
(if change dev environment) npm install
npm start
ctrl + C to Stop

//*********************************//
//    Deploy without github        //
//*********************************//
(first time)
npm install -g firebase-tools
firebase login 
firebase init

Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
✔ What do you want to use as your public directory? build
✔ Configure as a single-page app (rewrite all urls to /index.html)? Yes
✔ Set up automatic builds and deploys with GitHub? No
✔ File build/index.html already exists. Overwrite? Yes


Modify firebase.json


//*********************************//
// after that, while code changing //
//*********************************//
npm run build
(verify build result: npx serve -s build)
firebase deploy
