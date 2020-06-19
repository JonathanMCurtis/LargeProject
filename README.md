# Recipes
A shared repository for Group 21's "Large Project"

##### Current jobs:

- Alex: Front-End
- Dannah: Front-End
- Idel: Front-End / API
- Liderma: Back-End
- Mehrob: Back-End

### Welcome!

This repo has been set up with a few resources that might help you get started on the project:
1. While I am against requiring anything that is not in our grading rubric, I would highly recommend using **Git** and **Github** 
for this project.
    - If you are not familiar with Git or Github, I have prepared (and will continue working on) [a guide to using Github](./.tutorials/UsingGithub.md)
2. While a Gantt chart will be added later, most of our tasks will be tracked via the [Projects Board](https://github.com/JonathanMCurtis/LargeProject/projects/2),
   with more information provided on the [issues](https://github.com/JonathanMCurtis/LargeProject/issues) associated with each card on the board.
3. The current folder structure should allow us to easily collaborate on the project, while also being able to deploy this repo directly to heroku!
    - **/** (The root of the project) Will contain the API and code for Express routing.
    - **/.tutorials/** includes the tutorial files, intended for viewing on Github
    - **/recipes-mobile/** will contain the source code for the mobile application.
    - **/recipes-web/** will contain the source code for the web application.
4. The web project is a copy of the one that our professor used, with a few modifications:
    - All files have been updated to meet the standards of our code linter
    - The **server.js** file has been reconfigured, and *heavily* commented (if you want to learn more about Express routing)
5. This project also includes some pre-configured files:
    - **.eslintrc.yml** and **.eslintignore** are configuration files for [esLint](https://www.npmjs.com/package/eslint), a tool used for JavaScript [linting](https://en.wikipedia.org/wiki/Lint_(software)) (helping keep our code clean and bug-free!)
    - **.gitignore** is a pre-configured git file to ignore files that should not be uploaded to the repository or Heroku (like our /node_modules/ folders, IDE folders like .idea). 
    Feel free to add your own exclusions!
    - **.env** is pre-configured with a URI that shows our MongoDB URL (as well as a test username and password.)
        - (This is a temporary option, and more secure features will be implemented as we progress!)      
    - **project.json** in the root directory includes a script to run the node locally (`npm run dev`), as well as a 
    script to run eslint to check for any code issues (`npm run pretest`)
---

##  Schedule:

### Week 1 (6/15 - 6/21)
- [x] Plan and get your ideas down. 
- [x] Also maybe learn technologies such as ReactNative and/or Flutter.

### Week 2 (6/22 - 6/28)
- [x] Set up the database and start the API.
- [ ] Also webapp front end should begin to do the UI. 
- [ ] Mobile app people should start on the UI.

### Week 3 (6/29 - 7/5)
- [ ] Complete the API. 
- [ ] Make sure you get swagger done too so that the front end people will know how to call the API endpoints. 
- [ ] Make sure that the webapp and mobile UIs are taking shape.

### Week 4 (7/6 - 7/12)
- [ ] The webapp and mobile apps should start hitting the API endpoints.

### Week 5 (7/13 - 7/19)
- [ ] Finish all functionality. 
- [ ] Testing--generate unit testing and integration testing reports. 
- [ ] Fix bugs.

### Weeks 6-7 
- 6th and 7th weeks are presentations.
- The project should always continue under the assumption that we are presenting first!
