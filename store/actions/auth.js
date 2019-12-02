import { AsyncStorage } from 'react-native';


export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    }
    // return 
}
export const signup = (email, password) => {
    return async dispatch => {
        // console.log(email, password);

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCD6odiuMsDluG7u-u7e36vPgOpHki5fqc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
        if (!response.ok) {//EMAIL_EXISTS
            const reponseError = await response.json();
            const errorId = reponseError.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Try differet email!';
            } else if (errorId === 'OPERATION_NOT_ALLOWED') {
                message = 'Operation is not allowed!';
            } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message = 'Too many attempts with thie email';
            }
            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000));
        const expirationDate = new Date(
            new Date().getTime() + parseInt(responseData.expiresIn) * 1000
        );
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
};

export const login = (email, password) => {
    return async dispatch => {
        // console.log(email, password);

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCD6odiuMsDluG7u-u7e36vPgOpHki5fqc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
        if (!response.ok) {

            const reponseError = await response.json();
            const errorId = reponseError.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000));

        const expirationDate = new Date(
            new Date().getTime() + parseInt(responseData.expiresIn) * 1000
        );
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT }
}
const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}
const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer= setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    }
}
const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
};