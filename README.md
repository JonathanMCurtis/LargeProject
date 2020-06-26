# Recipes

A shared repository for Group 21's "Large Project"

---

##### Current jobs:

- Alex: Front-End
- Curtis: PM / API
- Dannah: Front-End
- Idel: Front-End / API
- Liderma: ~~Back-End~~ -> Front-End
- Mehrob: ~~Back-End~~ -> Front-End

---

### Welcome to Week 3 (6/29 - 7/5)

Our [Projects Board](https://github.com/JonathanMCurtis/LargeProject/projects/2) will not be terribly useful, as the 
front-end expectations are a little more vague. The current plan is to create issues for week 3 that focus on creating 
the pages of our applications, while week 4 will be focused on connecting those pages to the API endpoints.

I would not be surprised to see some week 3 issues run over into week 4, or to see pages require structural revision 
once you connect them to the API endpoints.

##### Week #3 Expectations (from Dr. Leinecker): 

> - [ ] Complete the API. ( #13 )
> - [ ] Make sure you get swagger done too so that the front end people will know how to call the API endpoints. ( #14 ) 
> - [ ] Make sure that the webapp and mobile UIs are taking shape. ( #15 #16 #17 #18 )

##### Week #3 Plan:

Each link below connects to a more in-depth document.

[**All Jobs**](./.job-specific/all-jobs.md)
- Currently, proceed as if we are writing a basic recipe website.
    - API will be implementing specific functions to recreate the functionality of a basic website
    - Front-End will be focused on implementing the structure of pages while the API is completed.    
- We'll continue looking for unique takes for functionality, and expect the styling to fit our 'college student'-tailored app.

[**API**](./.job-specific/api.md)
- Implement API functions to specifically meet the fields added by the Database team in week 2
- Create API documentation on SwaggerHub for the front-end team to utilize.

[**Front-End (Web)**](./.job-specific/front-end.md)
- Create specific and functional pages to meet the needs of our application.
    - Integration with API endpoints is not yet required.

[**Front-End (Mobile)**](./.job-specific/front-end.md)
- Create specific and functional pages to meet the needs of our application.
    - Integration with API endpoints is not yet required.

---

### Intro

This repo has been set up with a few resources that might help you get started on the project:
1. While I am against requiring anything that is not in our grading rubric, I would highly recommend using **Git** and **Github** 
for this project.
    - If you are not familiar with Git or Github, I have prepared (and will continue working on) [a guide to using Github](./.tutorials/UsingGithub.md)
2. While a Gantt chart will be added later, most of our tasks will be tracked via the [Projects Board](https://github.com/JonathanMCurtis/LargeProject/projects/2),
   with more information provided on the [issues](https://github.com/JonathanMCurtis/LargeProject/issues) associated with each card on the board.
3. The current folder structure should allow us to easily collaborate on the project, while also being able to deploy this repo directly to heroku!
    - **/** (The root of the project) Will contain the API and code for Express routing.
    - **/.tutorials/** includes the tutorial files, intended for viewing on Github
    - **/recipes_mobile/** will contain the source code for the mobile application.
    - **/recipes_web/** will contain the source code for the web application.
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

### ~~Week 1 (6/15 - 6/21)~~
- [x] ~~Plan and get your ideas down.~~
- [x] ~~Also maybe learn technologies such as ReactNative and/or Flutter.~~

### Week 2 (6/22 - 6/28)
- [x] ~~Set up the database and start the API.~~
- [x] ~~Also webapp front end should begin to do the UI.~~
- [x] ~~Mobile app people should start on the UI.~~

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
