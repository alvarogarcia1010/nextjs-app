const admin = require("firebase-admin");

const serviceAccount = require("./firebase-keys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://burger-builder-app-3a30d.firebaseio.com",
  });
} catch {}

export const firestore = admin.firestore();
