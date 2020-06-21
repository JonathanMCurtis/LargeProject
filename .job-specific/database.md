### Database

***

### Week 2

The week 2 expectation (from Dr. Leinecker) is to **'Set up the database.'**

Continuing with the assumption that we are using MongoDB (due to its ease of integration with Heroku), our database is 
technically 'set up' already.
 
With that in mind, here are my recommendations for Week 2

(Both are relayed on Github in [Issue #7](https://github.com/JonathanMCurtis/LargeProject/issues/7))

#### Task 1: Decide if you want to use [Mongoose](https://www.npmjs.com/package/mongoose)

Mongoose provides an interface that (in a sense) adds features to MongoDB. This includes things like default values, 
data validation, and getter/setter functions that change how fields are returned.

We may not have a need for those at this time, or at all. It is up to you if you would like to begin the project 
implementing Mongoose for your database.

#### Task 2: Define the expected layout of documents based on entity types.

Regardless of what you choose above, the main task of Week 2 would be to specifically define the fields that would need 
to be present on each entity we will be storing (User, Recipe)

Do not be afraid to define these entities more broadly than the current front-end/API expectations are. Use the 
[All Jobs](./all-jobs.md) document as a reference to decide what each document type (User, Recipe) *might* need as a field.

You are simply defining the standard we will utilize throughout the project. It will be up to the API to ensure 
these fields are present and populated (if and when they are used in the API.)

If you do decide to use Mongoose, you would also need to write the code defining the schema for your objects.