import firebase from 'firebase';
import firebaseConfig from '../../FirebaseConfig';

export const initializeFirebaseFramework = () => {
    if (firebase.apps.length === 0) { firebase.initializeApp(firebaseConfig) }
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email } = res.user;
            const getGoogleUser = {
                name: displayName,
                email: email,
                success: true,
                error: "",
                error_email: "",
                error_password: "",
            }
            return getGoogleUser;
        })
}
const updateName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    }).then(() => { })
        .catch(error => {

        });
}

export const createAccountWithEmailAndPassword = (userName, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            const signedUser = userCredential.user;
            signedUser.success = true;
            signedUser.error = "";
            updateName(userName);
            return signedUser;

        })
        .catch((error) => {
            var errorMessage = error.message;
            const notSignedIn = {};
            notSignedIn.error = errorMessage;
            return notSignedIn;
        });
}



export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            const { displayName, email } = userCredential.user;
            const verifiedUser = {};
            verifiedUser.name = displayName;
            verifiedUser.email = email;
            verifiedUser.success = true;
            verifiedUser.error = "";

            return verifiedUser;
        })
        .catch((error) => {
            var errorMessage = error.message;
            const verifiedUser = {};
            verifiedUser.error = errorMessage;
            return verifiedUser;
        });
}