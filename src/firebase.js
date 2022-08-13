import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBdiftdt9YhgA3Fwqi9savOM5B-FafapCM",
  authDomain: "snapchat-clone-2f483.firebaseapp.com",
  projectId: "snapchat-clone-2f483",
  storageBucket: "snapchat-clone-2f483.appspot.com",
  messagingSenderId: "890823877998",
  appId: "1:890823877998:web:29ba3d5fcb503aaf968d7f",
};

const provider = new GoogleAuthProvider();
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { provider, auth, db, storage };
