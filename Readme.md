# Blog API - Documentation

## Resources

- App Base Url
    - http://localhost:4000

- Admin User
    - email: "admin@mail.com"
    - password: "admin123"

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "username": "sample",
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```
      
### Movies

#### [POST] - "/blogs/addMovie"

- Sample Request Body
- Must Be Verified User

    ```json

    {
        "title": "Me and You",
        "content": "Me and You and You and Me",
        "authorInfo": "Mae Ann Yu"
    }

    ```

#### [GET] - "/blogs/getBlogs"

- No Request Body
- Must Be Verified User

#### [GET] - "/blogs/getBlogs/:id"

- No Request Body
- Must Be Verified User

#### [PATCH] - "/blogs/updateBlog/:id"

- Sample Request Body
- Must Be Verified User

    ```json

    {
        "title": "Me and You - Updated",
        "content": "Me and You and You and Me and Me and You and You and Me",
        "authorInfo": "Mae Ann Yoo"
    }

    ```

#### [DELETE] - "/blogs/deleteBlog/:id"

- No Request Body
- Must Be Admin User

#### [POST] - "/blogs/addComment/:id"

- Sample Request Body
- Must Be Verified User

    ```json

    {
        "comment": "WOW, what a nice",
    }

    ```
#### [GET] - "/blogs/getComments/:id"

- No Request Body
- Must Be Verified User

#### [DELETE] - "/blogs/deleteComment/:id/:id"

- No Request Body
- Must Be Admin User