# boilerplate
An out-of-the-box M(ySQL)EVN-ready environment.

# Installation
* Clone the repo<br>
`git clone https://github.com/emilianomaccaferri/boilerplate`<br>
* Install everything needed
```
npm install -g typescript sass pm2
npm install 
```
* Create a `.env` file<br>
Create a `.env` file and put the minimum required config fields<br>
e.g:
```
PORT=8080
URI=http://localhost:8080
```
* Start!<br>
`npm run app` &mdash; start without `pm2`<br>
`npm run daemonized` &mdash; start with `pm2`<br>

* Enjoy!<br>
I will change stuff every now and then (for example, I'll try to add TypeScript support in .vue files) so stay tuned!
