# Introduction 
to test end to end of the fp app

# Getting Started

## Quick start

in you make-equipped console of choice:

`make git-init` will initilize all the submodules and pull the code

`make git-pull-checkout` will checkout master branch of all the submodules and also pulls the latest commits and code base will be uptodate

`make start` to start it all

ui will be available at http://localhost:3000

## Dbs
All of this configuration is available in .env as well
- message store:
  - postgres
  - localhost:5432
  - db: message_store
  - username: message_store

- service / aggregator data
  - mysql
  - localhost:3306
  - db: financialprocessing
  - username: financialprocessing_user pwd: password
  - can also connect as root with password password

# steps
1. Adding submdule
git submodule add https://berkadiadevops.visualstudio.com/Polaris/_git/fp-submission-Application fp-submission-Application

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 
