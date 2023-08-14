# T-Play

Agus Dwi Milniadi || GG3FSGP0245

T-Play is a Tokopedia play clone web-apps using MERN Stack (Mongo, Express, React and NodeJS)

## Features

- Login ('/login')
  - User Can Login with email and Password
- Register ('/register')
  - User can register with Username, Email and Password if dont have account
- Home ('/')
  - User can view the jumbotron and list of video in homepage
- Product ('/product')
  - User can see all product in T-Play
- Add Product ('/add-product')
  - User with authentication can add product to the list
- Add Video ('/video')
  - User can add Video but need login
- Comment ('/watch/:id')
  - User can watch video and comment to the side (Login Required)
  - User can click each page in T-Play description

## How To Install and Run

- Clone Project

```sh
git clone https://github.com/agusdwimilniadi/fe-tokopedia-clone.git
```

- Go To Directory

```sh
cd fe-tokopedia-clone/
```

- Install Package

```sh
npm install
```

- Setting ENV
  - add your api fetch

```
--src
---utils
----const.js
```

- Run Project

```sh
npm run dev
```

## Schema Database

Backend APPS https://github.com/agusdwimilniadi/mid-project-gigih7

### Collection: Comment

- \_id: ObjectId (Primary Key)
- username: String (Username of the commenter)
- comment: String (Content of the comment)
- createdAt: Date (Timestamp of when the comment was created)
- video: ObjectId (Foreign Key referencing the Video collection)

### Collection: Product

- \_id: ObjectId (Primary Key)
- name: String (Name of the product)
- price: Number (Price of the product)
- image: String (URL of the product image)
- productUrl: String (URL of the product details page)
- createdAt: Date (Timestamp of when the product was created)
- updatedAt: Date (Timestamp of when the product was last updated)

### Collection: User

- \_id: ObjectId (Primary Key)
- username: String (Username of the user)
- email: String (Email address of the user)
- password: String (User's hashed password)

### Collection: Video

- \_id: ObjectId (Primary Key)
- title: String (Title of the video)
- videoUrl: String (URL of the video content)
- thumbnailUrl: String (URL of the video thumbnail)
- products: Array of ObjectId (Foreign Keys referencing the Product collection)
- comments: Array of ObjectId (Foreign Keys referencing the Comment collection)
- createdAt: Date (Timestamp of when the video was created)
- updatedAt: Date (Timestamp of when the video was last updated)

### Relationships:

- The Comment collection is related to the **_Video_** collection through the video field, which references the ObjectId of the corresponding video.
- The Product collection is not directly related to other collections, but it is referenced in the Video collection through the **_products_** field, which holds an array of ObjectIds referencing the products associated with the video.
- The User collection is not directly related to other collections in this schema, but it is expected to be associated with videos, comments, or products through their respective fields.

## License

[MIT](https://choosealicense.com/licenses/mit/)
