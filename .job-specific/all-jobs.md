### All Jobs

Our current plan is to implement a recipe website that caters to low-budget, low-skill, or college students. This is likely
still up for discussion.

As we are searching for ways to make our application stand out from every other recipe app, but currently have none, we 
will not be able to wait for that idea to become more unique before starting.

Thus, we will simply have to proceed with the intention of creating a 'basic' recipe website and adjust our design and 
presentation as we progress (or as new ideas come into focus.) 

---

**Entity design:**

We likely have two entities we need to consider in our design process:

**Users** represent the person using the application. 
- They must:
    - Be able to be uniquely identified
    - Be able to provide login information (which we verify)
    - Be registered with a verified email
    - Be able to submit recipes, which we will associate with them
- They may:
    - Have favorited recipes
    - Have account preferences
    - Have other information (depending on new ideas and time)

**Recipes** represent the main content of the website.
- They must: 
    - Have a way to be uniquely identified, regardless of the recipe name
    - Have a name to be presented
    - Have ingredients
    - Have instructions
- They may: 
    - Have a description
    - Have a recipe type
    - Have a cost
    - Have a submission date
    - Have a "favorite count" 
    - Have other information (depending on new ideas and time)

---