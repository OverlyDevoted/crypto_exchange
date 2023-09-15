# Proccess of dockerizing this application #
## Docker setup ##
0. In my case I had to install WSL. So just google how to enable on windows, I already have it enabled. In microsoft store installed ubuntu 18 lts and then ran `wsl --set-version Ubuntu-18.04 2` because that linux disto was not WSL 2. Then in the desktop app in settings chose the WSL 
1. Getting a docker image `docker pull <any image in hub.docker.com>` in this case I ran `docker pull node:17-alpine` for more consistent version. This node image acts like a parent image for the image we will create in the future. 
2. To run the installed image `docker run -d -it node:17-alpine`. Trying to launch from the app immediately exits. 
3. Docker images to see all images ur local system has.
4. An example custom image can be seen in the `./crypto-back/Dockerfile`
5. To build a custom image use command `docker build -t back .`. -t specifies the tag, so in this case its *back* and the . specifies the location of the docker file
6. It's possible to run the image through the desktop app, but also from the command line `docker run --name <custom namme> -d -p <port that maps to the container>:<container exposed port number> <image name>`. So *-p* specifies the port, *-d* container detaches itself from the terminal. There's also *--rm* option, that deletes the container once it's stopped
## Controlling images and containers ## 
7. To view current docker processes `docker ps` or add -a to see inactive containers
8. You can stop a docker container through the app or through the command line. Command for stopping the container `docker stop <id or name of the container>`
9. To start running existing container `docker start <container name>` and it will not do the whole setting up of layers
10. To remove images `docker image rm <name>`. Add -f to delete in-use images. To avoid -f you can delete the containers that are using the image
11. To delete containers `docker container rm <name>`
12. To delete all images and containers and volumes `docker system prune -a`
13. You can add tags to images when building them `docker build -t <image name>:<custom tag> .`
## Volumes ##
14. Volumes can be used to map folders on local machine to those of docker container and whenever a changes occurs in the specified local folder those changes would be propogated in the container  
15. To add volumes you add tag *-v* to the `build` command. So the command looks something like that:
 `docker run --name <custom namme> -p <port that maps to the container>:<container exposed port number> -v <absolute path to the folder>:<folder in the container> <image name>`
16. You can add multiple volumes. In our case it would be nice if node_modules was not mapped to our local node_modules folder, so we can create an anonymous volume which detaches a folder inside the container from change propogation.
## Docker compose ##
17. Writing out docker commands is tedious so docker compose files help to specify multiple images, containers for them and let's us to specify volumes, ports, names for those containers too.
18. After creating compose file, run `docker-compose up` to create images and containers
19. To stop container `docker-compose down`, but to also remove container and image and volumes `docker-compose up --rmi all -v`
