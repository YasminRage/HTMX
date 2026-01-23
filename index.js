import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

async function main () {
    dotenv.config()

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000

    try {
        //Connnect to MongoDB Cluster
        await client.connect()

        app.listen(port, () =>{
            console.log('server is runing on port:'+port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error);