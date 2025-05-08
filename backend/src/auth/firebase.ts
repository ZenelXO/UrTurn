import admin from 'firebase-admin';


var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://urturn-9ff90-default-rtdb.europe-west1.firebasedatabase.app"
});

export const firebaseAuth = admin.auth();
