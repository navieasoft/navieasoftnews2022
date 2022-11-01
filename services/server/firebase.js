import firebase from "firebase-admin";

export async function firebaseServerInit() {
  try {
    // if (!firebase.app.length) {
    return firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
    // }
  } catch (error) {
    return;
  }
}
