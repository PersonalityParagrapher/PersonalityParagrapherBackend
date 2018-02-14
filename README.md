# Personality Paragrapher

Personality Paragrapher is an application that defines personality traits of a playlist created by a user. The user must create an account and add to a playlist by typing in the artist and song title. When the user performs a `GET` request for their playlist personality, it will return an object with percentages of how the playlist matched on 5 characteristics.

---

## Installing and Getting Started

### Installing
Fork and git clone this repository to your local computer, navigate to the root directory of the repository and run `npm i` in the command line, this will install all necessary packages.

### Getting Started

To sign up:

```http
http://<>/signup username=<username> password=<password> email=<email>
```

To sign in:
```http
http://<>/signin username=<username> password=<password>
```

To add music to your playlist:
```http
http://<>/song artist=<artist name> title=<song title>
```

To get playlist personality:
```http
http://<>/personality userId=<userId>
```

---

## Data Structures

### Routes
* `route-auth` 
  * `POST` request for user sign up
  * `GET` request for user sign in
* `route-song` 
  * `POST` request to add song to playlist once run through `lyric-fetcher` middleware
  * `DELETE` request to delete a song from a playlist and remove its relationship to the user

### Models
* `auth` - creates a user, hashes the password, stores songs to a 'playlist' array
* `song` - creates a song object with an artist name, song title and lyrics, then related to a user

### Library
* `server` - establishes app setup, hooks up middleware, start and stop server methods
* `watson` - 
* `error-handler` - generates error messages based on error object text
* `basic-auth-middleware` - determines if user is authentic when signing in
* `bearer-auth-middleware` - determines if user is authorized to perform http requests once signed in, returns a token if user is authorized

---

## Tests
<!-- All appropriate 200's and 400's status codes -->

---

## Collaberators
Daniel Logerstedt
* [GitHub](https://github.com/daniellogerstedt) / [Linked In](https://www.linkedin.com/in/logerstedt/)

Melanie Downing
* [GitHub](https://github.com/sayanything830) / [Linked In](https://www.linkedin.com/in/melanie-downing/)

Yohanes Demissie
* [GitHub](https://github.com/YohanesDemissie) / [Linked In](https://www.linkedin.com/in/yohanes-demissie-11024a155/)

Steven Carpenter
* [GitHub](https://github.com/stevegcarpenter) / [Linked In](https://www.linkedin.com/in/carpentersteven/)

