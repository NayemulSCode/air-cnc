import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  };
  
  const provider = new firebase.auth.GoogleAuthProvider();

  export const handleGoogleSingIn = () => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {

          const { displayName, email, phoneNumber, photoURL } = result.user;
          const signInUser = {
              isSignIn: true,
              name: displayName,
              email: email,
              phone: phoneNumber,
              photo: photoURL,
          };
          return signInUser;
      })
      .catch((error) => {
        // Handle Errors here.
        const signInUser = {
          isSignIn: false,
          name: '',
          email: '',
          password: '',
          phone: '',
          photo: '',
        }
        signInUser.error = error.message;
        return signInUser;
      });
}
//login with emain and pass
export const logInWithEmailPassword = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
          })
      .catch((error) => {
        const newUserInfo = {}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        console.log(error.message)
        return newUserInfo;
      });
} 
export const createAccountWithEmailPassword = (email, password, name) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const newUserInfo = res.user
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch((error) => {
        console.log(error);
        const newUserInfo = {}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  };
  
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
  
    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
        console.log("user name update");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  