export PATH=$PATH:$HOME/bin
export NODE_ENV='dev'

export PROMPT_COMMAND='history -a'

# If you have run proxify and or certify, load previous settings
# These belong in .bashrc because they are non-login required
test -f ~/.berkadia_certs && . ~/.berkadia_certs
test -f ~/.berkadia_proxy && . ~/.berkadia_proxy

function dmclean1 {
  if [ $(docker ps -a -q -f status=exited | wc -l) -gt 1 ] ; then
    docker rm -v $(docker ps -a -q -f status=exited);
  fi
}

function dmclean2 {
  if [ $(docker images -f 'dangling=true' -q | wc -l) -gt 1 ] ; then
    docker rmi $(docker images -f 'dangling=true' -q);
  fi
}

function dmclean3 {
  if [ $(docker volume ls -qf dangling=true | wc -l) -gt 1 ] ; then
    docker volume rm $(docker volume ls -qf dangling=true);
  fi
}

function setupfm(){
if [ -d "C:\Users\sbejugam\messageStoreEnv" ]; then
currentdirectory=${PWD};
cd "C:/Users/sbejugam/messageStoreEnv";
docker-compose down
docker-compose up -d
cd ${currentdirectory};
fi
}



function stopfm(){
if [ -d "C:\Users\sbejugam\messageStoreEnv" ]; then
currentdirectory=${PWD};
cd "C:/Users/sbejugam/messageStoreEnv";
docker-compose down
cd ${currentdirectory};
fi
}



# Aliases
alias ll="ls -al"
alias chrome='start chrome --remote-debugging-port=9222'
alias binfix='/usr/bin/find ~/bin -type f | xargs chmod +x'
alias dm=docker-machine
alias dc=docker-compose
alias dmcfg="docker-machine env default > ~/.docker_env && source ~/.docker_env"
alias dmclean="dmclean1 && dmclean2 && dmclean3"
alias devupdate="ecr-login && docker pull 287054460789.dkr.ecr.us-east-1.amazonaws.com/polaris/devenv-nodejs-polarisplatform:latest && winpty docker run --rm -it -v "//c/Users/$USERNAME/"://userhome --entrypoint=bash '287054460789.dkr.ecr.us-east-1.amazonaws.com/polaris/devenv-nodejs-polarisplatform' //app/install && binfix"
alias appupdate="ecr-login && docker pull 287054460789.dkr.ecr.us-east-1.amazonaws.com/polaris/appenv-angular2-polarisplatform:latest && winpty docker run --rm -it -v "//c/Users/$USERNAME/bin/"://hostbin --entrypoint=bash '287054460789.dkr.ecr.us-east-1.amazonaws.com/polaris/appenv-angular2-polarisplatform' //app/install && binfix"
alias dmstart="dm start && dmcfg && devupdate && appupdate && dmclean"
alias appbash="docker run -it -v '/`pwd`':'//code' -v "//c/Users/$USERNAME/.npmrc":'//root/.npmrc' --rm --volumes-from ${PWD##*/}-npm:rw --volumes-from npmcachervol:rw --entrypoint=bash 287054460789.dkr.ecr.us-east-1.amazonaws.com/polaris/appenv-angular2-polarisplatform"
alias devbash="docker run -it -v '/`pwd`':'//code' -v "//c/Users/$USERNAME/.npmrc":'//root/.npmrc' --rm --volumes-from ${PWD##*/}-npm:rw --volumes-from npmcachervol:rw --entrypoint=bash 287054460789.dkr.ecr.us-east-1.amazonaws.com/polaris/devenv-nodejs-polarisplatform"
alias mwf="cd Projects/MegaWorkFlow-angular-polarisApp"
alias all="cd Projects/fp-services-e2e"
alias cc='docker rm -f $(docker ps -aq)'
alias ecr-login='aws sso login --profile DeveloperECR-287054460789
aws ecr get-login-password --region us-east-1 | docker login -u AWS --password-stdin https://287054460789.dkr.ecr.us-east-1.amazonaws.com'
alias ultron-login='aws sso login --profile DeveloperECR-287054460789
aws ecr get-login-password --region us-east-1 | docker login -u AWS --password-stdin https://144803385057.dkr.ecr.us-east-1.amazonaws.com'
alias startfm="setupfm"
alias stopfm="stopfm"
