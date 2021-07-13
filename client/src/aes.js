const aes256 = require('aes256')
const crypto = require('crypto')
const key = "obvwoqcbv21801f19d0zibcoavwpnq"
// const users = require('../../server/users')

export const DoEncrypt = (text, roomname) => { 
    // key = users.getRoomKey(roomname);
    var encrypted = aes256.encrypt(key, text);
    return encrypted;
  };
  export const DoDecrypt = (cipher, username, roomname) => {
    // key = users.getRoomKey(roomname);
    if (cipher.startsWith("Welcome")) {
      return cipher;
    }
  
    if (cipher.startsWith(username)) {
      return cipher;
    }
    
    var decrypted = aes256.decrypt(key, cipher);
    return decrypted;
  };