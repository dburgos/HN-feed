# HN-feed
Auto-fetch the Hacker News links about your favorite topic, to read later.

![http://s22.postimg.org/9jaojklip/hn_feed.jpg](http://s22.postimg.org/9jaojklip/hn_feed.jpg)

## Features
- Record the Hacker News entries via API
- Auto-fetch each hour (if the app is running)
- Custom topic, edit [in the config file](https://github.com/dburgos/HN-feed/blob/master/config/app.js#L11)
- Delete link
- API console
  - Start server
  - Manual fetch
  - Clean database collection
- MEAN stack

## Get started
Install dependencies
```
npm install
bower install
```
Set your MongoDb, [in the config file](https://github.com/dburgos/HN-feed/blob/master/config/app.js#L7)
```
config/app.js
```
Now check the API documentation
## API
#### Start the NodeJS server
```
npm run server
```
#### Force an API load
```
npm run load-api
```
#### Clean the feed collection
```
npm run clean-db
```
## License
MIT
