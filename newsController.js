
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

async function store(req, res) {
    const c = DB.collection('news')
    c.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        if (err) {
            console.error(err)
        }

        console.log("Inserted 3 documents into the collection");
        console.log(JSON.stringify(result))
        res.end()
    });
}