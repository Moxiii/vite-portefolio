<pre>
 ________  _______   ________  ________ _________           ________  ________  ________  _________  _______   ________ ________  ___       ___  ________     
|\   __  \|\  ___ \ |\   __  \|\   ____\\___   ___\        |\   __  \|\   __  \|\   __  \|\___   ___\\  ___ \ |\  _____\\   __  \|\  \     |\  \|\   __  \    
\ \  \|\  \ \   __/|\ \  \|\  \ \  \___\|___ \  \_|        \ \  \|\  \ \  \|\  \ \  \|\  \|___ \  \_\ \   __/|\ \  \__/\ \  \|\  \ \  \    \ \  \ \  \|\  \   
 \ \   _  _\ \  \_|/_\ \   __  \ \  \       \ \  \          \ \   ____\ \  \\\  \ \   _  _\   \ \  \ \ \  \_|/_\ \   __\\ \  \\\  \ \  \    \ \  \ \  \\\  \  
  \ \  \\  \\ \  \_|\ \ \  \ \  \ \  \____   \ \  \          \ \  \___|\ \  \\\  \ \  \\  \|   \ \  \ \ \  \_|\ \ \  \_| \ \  \\\  \ \  \____\ \  \ \  \\\  \ 
   \ \__\\ _\\ \_______\ \__\ \__\ \_______\  \ \__\          \ \__\    \ \_______\ \__\\ _\    \ \__\ \ \_______\ \__\   \ \_______\ \_______\ \__\ \_______\
    \|__|\|__|\|_______|\|__|\|__|\|_______|   \|__|           \|__|     \|_______|\|__|\|__|    \|__|  \|_______|\|__|    \|_______|\|_______|\|__|\|_______|
                                                                                                                                                              
                                                                                                                                                              
  </pre>                                                                                                                                                            


## Run 
- For run locally use npm i && npm run dev

For run server 
- npm install -global nodemon or npm i -global nodemon (thrust me is useful for work on express serv)
- npm run dev
- use nodemon ./api/server.js or node ./api/server.js

## Destination 
This is for work on React + discover CI/CD on FTP server 
-> derivation on goal , I try to make a local server before the end of deployement and this is what i really work : 
- ### DEVOPS 
- - Port fowarding 
- - Github workflows
- - CI/CD
- - Docker image build for both front and server 
- - Apache Reverse Proxy for redirect trafic { ext <=> docker }
- - Nginx to serve my page to docker  
- - Multi-containers Docker App with Front cont , Back cont and DB cont (need think about DB data persistence)
- ### A bit of React with vite
-  - First time with graphical lib
- - Learn about Hooks / components / screen / store etc 
- - Error boundary class for raise error on page instead of log (will be a custom 404)
- - Learn about scss & media query for reponsive 
- - Cry on responsive 
- - Cry even more on this s***
- - Learn css animation + Loading logic + make simple but efficient WebSite
- - Unloading some parts for mobilViews 
- - next is : 
- - =>  FrameMotion on scroll 
- - =>  allow scroll on About Section but stick the CUBE on Desk view
- - =>  Make project appear / disapear on scroll on mobilViews 
- - =>  FIX THE POSITION OF ALL BLOCK && LOADER ON MOBIL
- - =>  Finally Complete the landing page for mobil && fix PDF view 
- - => :before : Complete to coherent text and make THE linkedin post 
- - => :after UX maybe work on color or some lil points for prod 
- ### SQL
- - Retrieve Project By Id and sort data for optimise SQL request 
- - Retrieve Projet on Home Page and send back Mockup / Description / Title 
- ### Work again on CRUD API 
- - CRUD routes for Projects
- - CRUD routes for User (I will be the only user but is for make admin page and update my project easily and don't push + make docker image on each push)


# IMPORTANT DON'T TRY TO ALLOW SSH PUSH ON WORKFLOWS: 
SSH connexion are not completely make , i need to configure Pfsense or buy router for redirect external ${{secrets.SSH_PORT}} to my local machine .
At least apache server and SSH connexion on local are make .
-> The last step is to redirect "A" rule from OVH FTP serv to my server for cerbot and get HTTPS super cool logo