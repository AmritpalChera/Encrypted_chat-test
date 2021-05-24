//can add multiple fucntions here
const process = (encrypt, text, cypher) => {
    return {
        type: 'PROCESS',
        payload: {
            encrypt,
            text,
            cypher
        }
    }
}

export default process