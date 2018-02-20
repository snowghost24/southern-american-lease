import * as firebase from 'firebase';

require('dotenv').config()

console.log(process.env);

const prodConfig = {
   apiKey: "AIzaSyDqxNPcshpc_7qAfA6ATS0iFpo2q8vnt6E",
   authDomain: "canam-app.firebaseapp.com",
   databaseURL: "https://canam-app.firebaseio.com",
   projectId: "canam-app",
   storageBucket: "canam-app.appspot.com",
   messagingSenderId: "62380078761"
};

const devConfig = {
   apiKey: "AIzaSyDqxNPcshpc_7qAfA6ATS0iFpo2q8vnt6E",
    authDomain: "canam-app.firebaseapp.com",
    databaseURL: "https://canam-app.firebaseio.com",
    projectId: "canam-app",
    storageBucket: "canam-app.appspot.com",
    messagingSenderId: "62380078761"
};
// const prodConfig = {
//    apiKey: process.env.API_KEY ,
//    authDomain: process.env.AUTH_DOMAIN,
//    databaseURL: process.env.DATABASE_URL,
//    projectId: process.env.PROJECT_ID ,
//    storageBucket: process.env.STORAGE_BUCKET,
//    messagingSenderId: process.env.MESSAGING_SENDER_ID,
// };

// const devConfig = {
//   apiKey: process.env.API_KEY ,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID ,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
// };

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
