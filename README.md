<img align="left" width="200" height="200" src="https://cdn.discordapp.com/avatars/837299792396156928/64d256b1d8ce6084f47b9a74656ce192.png">

## VoiceLogger
Just a bot that remembers users from Discord voice channels and outputs statistics.<br>
Made to order M1NTR#6350.<br><br>
<img src="https://img.shields.io/badge/made%20by-Lokilife-blue.svg" >
<img src="https://img.shields.io/github/stars/Lokilife/VoiceLogger.svg?style=flat">
<img src="https://img.shields.io/github/languages/top/Lokilife/VoiceLogger.svg">

<br><br><br><br>
### Config
For the bot to work, a special config was created that stores secret information about your bot and database, which can harm you if it falls into the wrong hands.
Here is one example.<br>
Path: `/.env`.
```
# Discord bot token
TOKEN=Nzc4OTc0NzY0OTE5Njg1MTQx.X7ZyyA.IPlgl-AipsfJyAc22zVqNY_5xRY

# A list of owners (need for owner only command)
OWNERS=590941225096314880, 837299792396156928
# Voices To log (leave it null for all)
VOICES=769184862933876766, 769961566761779290

# Commands prefix
PREFIX=!

# A MongoDB URI for connecting to database
# mongodb://username:password@host.port?options...
MONGO_URI=mongodb://Bot:Qwerty@127.0.0.1.27017/LoggerData
```

<hr>

**(The data about the author and the customer could be outdated!)**