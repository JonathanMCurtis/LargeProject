## Using Github - Getting Started
There are a few ways to submit work for the project. 
While it is possible to simply clone a repo, I would suggest starting with step #1, as if you are unfamiliar with Github 
it is a great way to get familiar with the process.

---
#### Step #1: Working from a forked repository
> A **[fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)** is a copy of a repository. 
Forking a repository allows you to freely experiment with changes without affecting the original project.

There are two main benefits to using a forked repository (in the context of our project): 

1. **You have your own repository.** Not only do you have a copy of the project when you are done, you gain all of the 
benefits mentioned above from using Git for version control.
2. **Your repository is linked to the main repository, but not dependent on it.** This means that any changes made on 
the main repository can be brought to your fork, but that is not required before submitting work.

The process of forking a repo on Github is simple. When you are logged into Github, simply find the repository and click 
the 'Fork' button. A clone of that repository is added to your account, and linked to the main repo as a 'fork.'

![Fork](./images/Github1.png) 

It will be up to you to ensure that your forked repository stays [in-sync](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#keep-your-fork-synced)
with the original repository, but that is no different than working from a cloned repository (and needing to pull changes.)

You will still need to following option #2 to start working, but the process of forking a repo is commonplace in 
open-source projects. (As far as professional use of Github goes, versioning differs between companies.)

---
#### Step #2: Working on a cloned repository
> A **clone** is a copy of a repository that lives on your computer instead of on a website's server somewhere, 
> or the act of making that copy. When you make a clone, you can edit the files in your preferred editor and use Git to
> keep track of your changes without having to be online. The repository you cloned is still connected to the remote 
> version so that you can push your local changes to the remote to keep them synced when you're online.

Once you have a repository set up (or forked), you will still need a version of the files to edit on your local computer.

The process of making a **clone**  of a repository brings those files to your local computer, and allows you to edit them 
as you like (rather than having to edit them directly on Github.)

Cloning the project has the added benefit (assuming everyone uses Github) of having the entire project available to you.
This means that regardless of your role, you can still see how your changes affect the project as a whole.

For example: Say that you are working on the front-end, and you want to try and display a list of recipes. If the API has 
been completed for that endpoint, you can edit the front-end and see the results of your API calls on your local computer 
(rather than having to build and upload your files to the website to make changes.)

The process of cloning a repo on Github is also simple. When you are logged into Github, simply find the repository and 
click the 'Clone or download' button. This will provide you with a link you can use to clone the repository using your 
method of choice.

![Clone](./images/Github2.png)

Now that you have a copy of the files available, it's time to talk about [Working Locally.](./WorkingLocally.md)