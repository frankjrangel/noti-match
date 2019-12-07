
let DB

module.exports = (injectedDbClient) => {

    DB = injectedDbClient

    return {
        get,
        store,
    };
};

async function get(req, res) {
    const c = DB.collection('news')
    c.find({processed: 1}).toArray((err, docs) => {
        if (err) {
            console.error(err)
            return res.end()
        }

        res.write(JSON.stringify(docs))
        return res.end()
    })
}

async function store(req, res) {
    if (Object.keys(req.body).length <= 0) {
        console.error('empty body')
        return res.end()
    }

    const provider = req.body.provider // We get the base url
    const articlesData = req.body.articles

    const c = DB.collection('news')

    // TODO Validate data
    for (article of articlesData) {
        if (!article.url) {
            continue
        }

        article.title = article.title || ''
        article.summary = article.summary || ''
        article.body = article.body || ''
        article.title = article.title || ''
        article.provider = provider
        article.processed = article.processed || 0
        article.cluster = article.cluster || null

        if (article.body === '' && title.body === '') {
            continue
        }

        if (article.title === '') {
            article.title = article.body.subtring(0, 100)
        }

        try {
            await updateArticle(c, article)
        } catch(err) {
            console.error(err)
        }
    }

    res.end()
}

function updateArticle(c, data) {
    return new Promise((resolve, reject) => {
        
    c.update(
        {url: data.url}, 
        {
            url: data.url,
            title: data.title,
            summary: data.summary,
            body: data.body,
            provider: data.provider,
            processed: data.processed,
            cluster: data.cluster,
        },
        {upsert: true}, 
        function(err){
            if (err) {
                return reject(err)
            }
            return resolve()
        })
    })
}