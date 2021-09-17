# ShopifyChallenge

## Imageify
 
The new revolutionary way to buy images from other users!

This is my submission for the 2021 summer Shopify internship challenge.

Want to try it out?

1. Go register at https://deepokshopifychallenge.herokuapp.com/register
2. Login and enjoy! https://deepokshopifychallenge.herokuapp.com/shop

## Dev Setup

1. Create a MongoDB database. This [link](https://www.mongodb.com/basics/create-database) can help you.
2. Create a Cloudinary account
3. Set the following environment variables
   * API_KEY: <YOUR CLOUDINARY API KEY>
   * API_SECRET: <YOUR CLOUDINARY API SECRET>
   * CLOUD_NAME: <YOUR CLOUDINARY CLOUD NAME>
   * MONGO_URI: <YOUR MONGODB URI>

## Tech Stack

These are the technologies I used for this project.

Backend
 - NodeJS
 - MongoDB
 - Express
 - Javascript
 
Frontend
 - React
 - Javascript
 
## Image Storage

How do I store images?

For a given image, I used Cloudinary, a cloud storing service, to store the uploaded image file. I then saved the Cloudinary CDN url of the image to my mongoDB database. When a user goes to the `Shop` section which contains all of the for-sale images, the frontend requests the backend for these CDN urls to display the images.

## Imageify Features

Imageify allows users to register accounts, upload images to their own store and view a selection of awesome pictures for-sale. 

I focused on the buy/sell aspect of the website where we implemented buyable/sellable images, a shopping cart, discounts, inventory management, pricing and money.

- Every user that creates an account has a shopping cart, an empty image store and 0 credits. A user can add credits by pressing the `Add Credits` button. For simplicity's sake, this button freely gives credits.
- A user can look at the main store and add images to their cart. Once a user finishes shopping, they can checkout and pay for these images with their credits.
- A user can also set the prices, discounts and inventory of their images by going to `My Shop`. 

## Small Features

- A user cannot send a negative inventory, discount and price value. In fact, the frontend takes care of that, but we also have checks in the backend.
- Editing the discount or price of an image changes the actual price of the product.
- A user cannot add an item with 0 inventory into their shopping cart. This is mostly done in the frontend where the `add to cart` button is disabled.
- Checking out a product with 0 inventory will not process that individual image. 
This can happen when a user adds a product to their shopping cart that is still in inventory and the owner of that image sets the inventory of that image to 0 before the user checks out.
- An owner of an image cannot purchase their own image. This is taken care in both the frontend.
- An owner cannot set the inventory, discount or price of an image to a negative value.
- The inventory value can only be set to an integer while prices and discounts can be floats.

## Security

- Every user that registers an account has their password hashed via the `bcrypt` library. 

- Our mongoDB schemas are all well-typed, hence, a malicious user cannot commit NoSQL injection attacks. 
  - Why? For example, someone that wishes to add `$ne 0` onto a string field of a schema send "$ne 0" where Mongoose will only read it as a normal string.
  
## Challenge Postmortem

I really enjoyed the project and learnt a lot more about MongoDB and React Hooks. I took the time to dwelve into both MongoDB's and React documentation to better understand concepts that I had ignored in the past.

I will most probably add another features, such as search very soon because I found the few days of coding really fun! 
 
