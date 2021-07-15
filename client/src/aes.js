
import { roomKey } from './App';
const aes256 = require('aes256')
// const key = "obvwoqcbv21801f19d0zibcoavwpnq"

// const users = require('../../server/users')

export const DoEncrypt = (text) => { 
  console.log("text: ", text, " roomKey: ", roomKey)
    // key = users.getRoomKey(roomname);
    var encrypted = aes256.encrypt(roomKey, text);
    return encrypted;
  };
  export const DoDecrypt = (cipher, username) => {
    console.log("cipher: ", cipher, " username: ", username, " roomKey: ", roomKey)
    // key = users.getRoomKey(roomname);
    if (cipher.startsWith("Welcome")) {
      return cipher;
    }
  
    if (cipher.startsWith(username)) {
      return cipher;
    }
    console.log("ROOM KEY AES", roomKey)
    var decrypted = aes256.decrypt(roomKey, cipher);
    return decrypted;
  };