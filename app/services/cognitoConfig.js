// CognitoConfig.js
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
  } from 'amazon-cognito-identity-js';
  
  // Reemplaza estos valores con los de tu User Pool
  const poolData = {
    UserPoolId: 'eu-west-1_7scp8CGFe',  // <-- TU User Pool ID
    ClientId: '7bb8eojanc4e2s7fgpsh8lsgt6',         // <-- TU App Client ID (sin secret)
  };
  
  const userPool = new CognitoUserPool(poolData);
  
  // 1) Registrarse
  export function signUp(email, password, emailAttr) {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: emailAttr }),
      ];
  
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
  
  export function confirmSignUp(username, code) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
  
  
  // 3) Iniciar sesión
  export default function signIn(username, password) {
    return new Promise((resolve, reject) => {
      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
  
      const userData = {
        Username: username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);
  
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          // session trae los tokens (IdToken, AccessToken, RefreshToken)
          resolve({ user: cognitoUser, session });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  