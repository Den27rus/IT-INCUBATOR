import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000


let videos: [
    {id: 1, title: 'About - 01', author: 'it-incubator'},
    {id: 2, title: 'About - 02', author: 'it-incubator'},
    {id: 3, title: 'About - 03', author: 'it-incubator'},
    {id: 4, title: 'About - 04', author: 'it-incubator'}
]

app.get('/', (req:Request, res:Response) => {
    res.send("Hello it-incubator")
})

app.post('/videos',(req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim()) {
        res.status(404).send({
            errorsMessages: [{
                "message": "Incorrect title",
                "field": "title"
            }]
        })
        return;
    }
    const newVideo = {
        id: +(new Date()),
        title: title,
        author: 'it-incubator'
    }

    res.status(201).send(newVideo)
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(404).send({
            errorMessages: [{
                message: 'The page could not be found',
                field: 'title'
            }],
            resultCode: 1
        })
        return
    }
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        video.title = req.body.title;
        res.status(204).send(video)
    } else {
        res.send(404)
    }
})
app.get('/videos/:videoId',(req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})
app.delete('videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const newVideos = videos.filter(v => v.id !== id)
    if (newVideos.length < videos.length) {
        res.send(204)
    } else {
        res.send(404)
    }
})



app.listen(port, () =>{
console.log(`Example app listening on port: ${port}`)
})