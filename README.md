# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###
* Quick summary
This repository is for holding the version of the ICB that is intended to be migrated to the new ICB server.
Initially it will hold a clone of the current ICB service that is hosted on the health.utas.edu.au/templates virtual webhost.

Changes to this master product will be pushed out to a test enviromnent and then to a production environment.

Prior to this master being pushed out, changes will be implemented to introduce consistency in the organisation of resources
 -- removal of references to dementia.health.utas.edu.au
 -- redirection via symbolic link from resources that point to /templates/common  to point to resources in /templates/v3-at/common
 -- merging of the wicking and v3-at versions of the ICB via symbolically linking references in /wicking to resources in /v3-at.

* Version
  v3-at


* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

Watch this space

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###
Watch this space

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

Jeremy O'Reilly: [Jeremy.OReilly@utas.edu.au](mailto:Jeremy.OReilly@utas.edu.au)

* Repo owner or admin
* Other community or team contact