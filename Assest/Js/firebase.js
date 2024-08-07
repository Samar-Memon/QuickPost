  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
//   AUTH
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  // STORAGE
  import { getStorage,ref,uploadBytes,getDownloadURL,deleteObject } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
  // FIRESTORE DB
  import { getFirestore,collection, addDoc,getDocs,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAcWDK_GwDqn1TRxgv_Cg-y_AgbPNHP2Eg",
    authDomain: "quickpost-bb26a.firebaseapp.com",
    projectId: "quickpost-bb26a",
    storageBucket: "quickpost-bb26a.appspot.com",
    messagingSenderId: "4876738965",
    appId: "1:4876738965:web:14a798451524cda5da169c",
    measurementId: "G-9GJ38RDH4C"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(app);
  const db = getFirestore(app);



// Export Auth

export {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
     auth,
     GoogleAuthProvider,
     provider,
     signInWithPopup
}

// Export Storage

export {
  getStorage,
  storage,
  ref,
  uploadBytes ,
  getDownloadURL,
  deleteObject
}

// Export FireStore

export {
  getFirestore,
  collection,
   addDoc,
   db,
   getDocs ,
   doc,
   deleteDoc
}