const Blog = require("../models/Blog");

module.exports.addBlog = (req, res) => {

    let newBlog = new Blog({
        userId : req.user.id,
        title : req.body.title,
        content : req.body.content,
        authorInfo : req.body.authorInfo
    });


    Blog.findOne({ title : req.body.title })
    .then(existingBlog => {
        if (existingBlog) {
            
            return res.status(409).send({ message: 'Blog already exists' });
        } else{
            return newBlog.save()
           
            .then(result => res.status(201).send({ 
                    success: true,
                    message: 'Blog added successfully', 
                    result: result 
                }))
            .catch(err => {
            		console.error("Error in adding a blog : ", err)
            		return res.status(500).send({ error: 'Error in adding a blog.' });
            	});
        }
    }).catch(err => {
		console.error("Error in adding a blog : ", err)
		return res.status(500).send({ error: 'Error in deleting an blog.' });
	});
};

module.exports.getBlog = (req, res) => {
    return Blog.find({})
    .then(result => {
        if(result.length > 0){
            return res.status(200).send({blog: result});
        }
        else{
            return res.status(404).send({ message: 'No movies found' });
        }
    })
    .catch(err => {
		console.error("Error in finding a movie : ", err)
		return res.status(500).send({ error: 'Error in finding a movie.' });
	});
};

module.exports.getBlogById = (req, res) => {
    Blog.findById(req.params.blogId)
    .then(blog => {
        if (blog) {
           
            return res.status(200).send(blog);
        } else {
           
            return res.status(404).send({ message: 'Blog not found' });
        }
    })
    .catch(err => {
		console.error("Error in finding a blog : ", err)
		return res.status(500).send({ error: 'Error in finding a blog' });
	});
};

module.exports.getUserBlog = (req, res) => {
    return Blog.find({userId : req.user.id})
        .then(blogs => {
            if (blogs.length > 0) {
                return res.status(200).send(blogs);
            }
            return res.status(404).send({error: "Blog not found"});
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.updateBlog = (req, res)=>{

    let updatedBlog = {
        title : req.body.title,
        content : req.body.content,
        authorInfo : req.body.authorInfo
    }
    return Blog.findByIdAndUpdate(req.params.blogId, updatedBlog)
    .then(blog => {
        if (blog) {
           
            res.status(200).send({ success: true, message: 'Blog updated successfully', updatedBlog: blog });
        } else {
           
            res.status(404).send({ message: 'Blog not found' });
        }
    })
    .catch(err => {
		console.error("Error in updating a blog : ", err)
		return res.status(500).send({ error: 'Error in updating a blog' });
	});
};

module.exports.deleteBlog = (req, res) => {
    return Blog.deleteOne({ _id: req.params.blogId })
        .then(deletedResult => {
            if (deletedResult.deletedCount < 1) {
                return res.status(400).send({ error: 'No blog deleted' });
            }

            return res.status(200).send({ 
                message: 'Blog deleted successfully' 
            });
        })
        .catch(err => {
            console.error("Error in deleting a blog: ", err);
            return res.status(500).send({ error: 'Error in deleting a blog.' });
        });
};

module.exports.addComment = async (req, res) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;  

  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { 
        $push: { 
          comments: { userId, comment } 
        } 
      },
      { new: true } // Return updated document
    );

    if (blog) {
      return res.status(200).json({ 
        success: true, 
        message: 'Comment added successfully',
        comments: blog.comments
      });
    } else {
      return res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 

module.exports.getComments = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).select('comments');

    if (!blog) {
      return res.status(404).send({ message: 'Blog not found.' });
    }

    if (blog.comments.length === 0) {
      return res.status(404).send({ message: 'No comments found for this movie.' });
    }

    return res.status(200).send({ 
      success: true, 
      comments: blog.comments 
    });
  } catch (err) {
    console.error('Error finding comments:', err);
    return res.status(500).send({ error: 'Error finding comments.' });
  }
};

module.exports.deleteComment = (req, res) => {
    Blog.updateOne(
        { _id: req.params.blogId },
        { $pull: { comments: { _id: req.params.commentId } } }
    )
    .then(updateResult => {
        if (updateResult.modifiedCount < 1) {
            return res.status(400).json({ error: 'No comment deleted' });
        }

        return res.status(200).json({ message: 'Comment deleted successfully' });
    })
    .catch(err => {
        console.error("Error in deleting a comment: ", err);
        return res.status(500).json({ error: 'Error in deleting a comment.' });
    });
};



