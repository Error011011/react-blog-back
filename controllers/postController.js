    import Post from "../models/Post.js"



export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').exec();

        res.json(posts);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        Post.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: {viewsCount: 1}, 
        }, {
            returnDocument: 'after',
        }).populate('user').then(doc => {

            if(!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }
            
            res.json(doc)
            
        });


    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
} 


export const createPost = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
        
    }
}


export const removePost = async (req, res) => {
    try {
        const postId = req.params.id;
        
        Post.findOneAndDelete({
            _id: postId,
        }).then((doc) => {
            if(!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }

            res.json({
                success: true
            })
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
} 

export const updatePost  =  async (req, res) => {
 try {
    const postId = req.params.id;
    
    await Post.updateOne({
        _id: postId,
    }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId
    })

    res.json({
        success: true
    })
 } catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Не удалось обновить статью'
    })
    
 }
}

