
let DB

module.exports = (injectedDbClient) => {

    DB = injectedDbClient

    return {
        get,
        store,
    };
};

async function get() {

}

async function store() {
    
}