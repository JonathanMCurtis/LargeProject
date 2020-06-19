## Using Github - Working Locally
Once you have a copy of the files to work on, it's time to discuss how to integrate Git into your work locally.

---

#### Terms

(If you're familiar with Git terminology, feel free to skip this section)

There are a few terms that we will use. These are important to know for the Github process and while the exact process 
may differ depending on what you are using for Git on your PC, the terminology should be consistent between platforms.

- You can think of a **commit** as a 'save point' for your code. It is a snapshot of everything you let Git keep track of,
 and details the history of the project.
- If commits are save points, a **branch** is a separate save file. A branch is simply a point where the history of your 
project diverges, and each branch tracks a different set of commits.
- A **remote** repository refers to a repository not local to your computer, usually the one you will send changes to.
- When you **check out** a branch, you're making a copy of a remote branch on your local machine.
- When you use **fetch**, you're adding changes from a remote repository to your own (*without* committing them.)
- When you use **pull**, you're adding changes from a remote repository to your own (and committing those changes.)
- (Use this carefully!) When you **rebase** your branch, you are pulling a specific commit and replaying your own changes on top of it.  

---

#### The Git Workflow

###### (Sync, Fetch, Pull)

When you are working based on a remote repository, you *might* need to do one of the following. You will have to decide 
based on your own circumstances. If you are working on your own branch, these steps might not be necessary every time you work.

You may need to [**sync**](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) 
your forked repository to the upstream repo (you should only need to do this if you are using a forked repo, and there 
is a change you need to work based off of.)

You may need to [**fetch**](https://help.github.com/en/github/using-git/getting-changes-from-a-remote-repository#fetching-changes-from-a-remote-repository)
the changes made to a remote repository, in case you want to check them before committing them to your local repository.
 
You may need to [**pull**](https://help.github.com/en/github/using-git/getting-changes-from-a-remote-repository#pulling-changes-from-a-remote-repository)
the changes made to a remote repository into yours, which will commit those changes locally.

###### (Branch)

Once you have an up-to-date commit to work from, thanks to the last step, then it is time to begin working on a new feature.

It is a good practice to attempt to create new features on a new **branch**. Before starting work on a new feature, 
creating a new branch will ensure that if something goes wrong (or you need to work on a different feature), you have a 
clean point in time to revert to where you know the application was functional. 

It is also good practice to create new branches on Github then **check out** that branch on your local machine. This will 
allow you to share your work to that branch, which will allow your team to keep track of your progress (or take over, in the event
of the proverbial bus!) 

If you are **not** working from a forked repository, it is definitely a good practice to create this branch on Github 
before pushing changes (so you are not uploading work to a branch someone else has based their work from!)

###### (Stage/Add)

Whenever you create a new file, unless something tells Git to track that file it will be ignored.

While some software automatically tracks new files, or **stage**s changes for your commit, this is something for you to keep in mind. You need to know whether 
new files are tracked by Git or will need to be **add**ed or **stage**d to be included in your branch.   

###### (Edit)

Once you are working on a new branch, Git will not change much about how you do your work. Regardless of how you edit your files, Git is only interested in 
when they change. Whenever you want, you can tell Git to remember the state of your files at this time.

###### (Commit)

Once you have a point you would like Git to remember, you need to **commit** your files.

Making a **commit** is telling Git to take a snapshot of your the files you are allowing Git to track.

When making a commit, make a point of including a commit message that explains what changes that commit includes. Many 
visual Git clients include a 'diff'-style comparison of files from your last commit to your newest, allowing you to look 
through before making your commit. 

###### (Merge)

Once you believe a branch has accomplished its goal, you may wish to **merge** that branch back into your master branch 
locally.

It is also acceptable to commit that feature branch directly to your repository, and use that for the next step.

###### (Push)

If you are working from a forked repo, it is usually good practice to **push** your changes to your repo. 
Not only does this allow your team to view your progress, it ensures you have a backup of your code available in the event 
something happens to your local copy. 

---

Whenever you have reached a point where a feature is finished, it would be a good idea to move on to the last step: 
[Sharing Your Work.](./SharingYourWork.md)