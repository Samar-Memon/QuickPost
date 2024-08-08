import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
     auth,
     GoogleAuthProvider,
     provider,
     signInWithPopup
} from './firebase.js'

import {
  getStorage,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from './firebase.js'

import {
  getFirestore,
  collection,
   addDoc,
   db,
   getDocs ,
   doc,
   deleteDoc
} from './firebase.js'


// get inputs

// Get SignUp Inpus

let userNameInp = document.getElementById('userNameInp');
let signupEmailInp = document.getElementById('signupEmailInp');
let signupPasswordInp = document.getElementById('signupPasswordInp');

let add_profile_image = document.getElementById('add_profile_image');

// Get LogIn Inpus

let loginEmailInp = document.getElementById('loginEmailInp');
let loginPasswordInp = document.getElementById('loginPasswordInp');


// Get Form Buttons

let signup_btn = document.getElementById('signup_btn');
let login_btn = document.getElementById('login_btn');

// Get Areas

let signupArea = document.querySelector('.signupArea');
let loginArea = document.querySelector('.loginArea');

// Get Loader
let loader = document.querySelector('.loader');

// Get Jumps

let loginJump = document.getElementById('loginJump');
let signupJump = document.getElementById('signupJump');


const clearInput = () => {
    document.querySelectorAll('input').forEach(input => {
        input.value = ''
    })
}

const func4GotoLogin = () => {
    signupArea.style.display = 'none'
    loginArea.style.display = 'flex'
}
const func4GotoSignUp = () => {
    loginArea.style.display = 'none'
    signupArea.style.display = 'flex'
}

loginJump.addEventListener('click', func4GotoLogin)
signupJump.addEventListener('click', func4GotoSignUp)


const func4SignUp = (e) => {

    let userNameValue = userNameInp.value.trim().toLowerCase();
    let signUpEmailValue = signupEmailInp.value
    let signUpPasswordValue = signupPasswordInp.value
    let profileImage = add_profile_image.files;

    loader.style.display = 'block'
    e.target.disalbed = true

    setTimeout(() => {
        if(userNameValue != '' && profileImage.length > 0){

            createUserWithEmailAndPassword(auth, signUpEmailValue, signUpPasswordValue)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                loader.style.display = 'none'
                const profileRef = ref(storage, `${signUpEmailValue}/Profile_Image`)
                uploadBytes(profileRef, profileImage[0]).then((snapshot) => {
                  console.log('Uploaded a blob or file!');
                  getDownloadURL(profileRef)
                  .then( async(url) => {
                    console.log(url);
                    try {
                      const docRef = await addDoc(collection(db, "users"), {
                        userName: userNameValue,
                        userEmail: signUpEmailValue,
                        url
                      });
                      console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                      console.error("Error adding document: ", e);
                    }

                    sessionStorage.setItem('get_user_image', url)
                  }).catch((err) => {
                    console.log(err);

                  })
                });
                func4GotoLogin()
                sessionStorage.setItem('get_user_name', userNameValue)
                e.target.disalbed = false
                clearInput()

                // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Swal.fire(errorMessage)
                    
                    loader.style.display = 'none'
            e.target.disalbed = false

                    // ..
                });

        }else{
            loader.style.display = 'none'
            Swal.fire('Missing UserName or Profile Image')
        }
    }, 1000)





}


const func4LoIn = (e) => {
    let loginEmailValue = loginEmailInp.value;
    let loginPasswordValue = loginPasswordInp.value;

    loader.style.display = 'block'
    e.target.disalbed = true


    setTimeout(() => {
        signInWithEmailAndPassword(auth, loginEmailValue, loginPasswordValue)
        .then( async(userCredential) => {
          // Signed in
          const user = userCredential.user;
          const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if(loginEmailValue == doc.data().userEmail){

            console.log('UserName', doc.data().userName);
            console.log('UserEmail', doc.data().userEmail);
            console.log('ImageURL', doc.data().url);

            let userName = doc.data().userName;
            let userEmail = doc.data().userEmail;
            let imageURL = doc.data().url;
            sessionStorage.setItem('get_user_name', userName)
            sessionStorage.setItem('get_user_email', userEmail)
            sessionStorage.setItem('get_user_image', imageURL);
            location.href = '/home.html' 
          }
        });
          loader.style.display = 'none'
        clearInput()
        e.target.disalbed = false
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire(errorMessage)
        loader.style.display = 'none'
        e.target.disalbed = false 
        });
    }, 1000)

}


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      func4GotoLogin()
    } else {
      func4GotoSignUp()
    }
  });




signup_btn.addEventListener('click', func4SignUp)
login_btn.addEventListener('click', func4LoIn)



const googleFunc = () => {
    
signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  location.href = '/home.html'
  sessionStorage.setItem('get_user_name', user.displayName)
  sessionStorage.setItem('get_user_email', user.email)
  sessionStorage.setItem('get_user_image', user.photoURL)
  

  // IdP data available using getAdditionalUserInfo(result)
//   sessionStorage.setItem('')

  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});
}

document.getElementById('google_btn').addEventListener('click', googleFunc)


function b() {
  sessionStorage.setItem('get_user_name', user.displayName)
  sessionStorage.setItem('get_user_email', user.email)
  sessionStorage.setItem('get_user_image', user.photoURL)

  console.log(user.displayName);
  console.log(user.email);
  console.log(user.photoURL);
}