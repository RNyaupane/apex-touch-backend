exports.posts = async (req,res) => {
    res.send("hello form controller");
}

exports.addPost = async(req,res) => {
    res.send( "hello this is add from controller");
}