import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9W6mR29Ql7ltpuFZiMKH29dc_wxJppig",
  authDomain: "prototype-896d6.firebaseapp.com",
  projectId: "prototype-896d6",
  storageBucket: "prototype-896d6.appspot.com",
  messagingSenderId: "115912874220",
  appId: "1:115912874220:web:32e4701287d17fe9bdedc9",
  measurementId: "G-G3MPLGFQ7G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
