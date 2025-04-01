# Chronica

Chronica is a web application to aid in running Dungeons and Dragons games, and to act as a vault for characters that can be browsed, viewed, and edited, somewhat like Facebook.

Users will be able to create an account, and then log in and create profiles for their D&D characters. These characters can then plug in to various sub systems involved in various campaigns, automating the tracking using them.

This is still in development. If you want to pull the repo down and run it yourself, make sure you install all the packages, and then run in terminal using `npm run start`. The application is Typescript and React on the front-end, with express on the backend.

## USING CHRONICA

To use Chronica, clone the repo and run npm install inside the directory.
There is a characters.json file seeded with premade characters for testing. If you want to see those, you'll have to edit the userId property in the character objects in data/characters.json with the userId and username from your own account, which can be found in users.json after you created an account. You'll have to edit it manually. The fully finished version of this app will not store these things in git, and have a mongo database instead of a flat file, but for now this is useful for prototyping.