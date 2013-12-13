Nodejs / Express / Mongoose

- MVC 
- Multiple environments config
- Middleware for view locals

Need following APIs from backend server:

    listing/save - payload listing json object
    listing/claim - payload listing_id
    listing/get/:id - where id is listing id
    listing/search - search by name, state, city, category. should this be url parameters or json GET
    listing/upload - upload images to S3
    category/list - returns a list of categories

Listing object has following fields:

    id
    name - name of the listing
    categories - list of category ids. Max 5
    address
    phone
    web url
    alt phone
    mobile phone
    fax phone
    hours
    payment types
    description
    images - list of images
    latitude - to show a map and the marker for the address
    longitude
    key_values - list of key values for elements not explicitly modeled

Category has following fields:

    id
    name
    parentID - id of the parent category

