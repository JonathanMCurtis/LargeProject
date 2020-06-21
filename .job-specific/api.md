### API

***

### Week 2

The week 2 expectation (from Dr. Leinecker) is to **'Start the API'**

Working from that expectation, here are my recommendations for Week 2

(Both are relayed in [Issue #6](https://github.com/JonathanMCurtis/LargeProject/issues/6))

#### Task 1: Move API out to a separate file with exports

Currently, the API is implemented as a series of explicit calls in server.js

As our API grows, this will lead to a serious problem with readability as the file well exceeds its purpose.

**Please make a commit that moves API functions out to a seperate API file (or files) to be imported.**

#### Task 2: Begin work on a set of flexible API endpoints (to be specialized as functionality becomes clear)

While we might not have finalized the API needs, that does not stop us from getting ready for the needs our API might 
come into. 

This would include functions that:

- Create a document in a specific collection
- Read out a collection of documents based on a filter
- Read out a specific document 
- Read out the value of a field in a specific document
- Update all documents based on a filter
- Update a specific document
- Update a single field in a specific document
- Delete a specific document

Having this collection of API functions would easily allow us to alter small pieces of the functions to suit our needs.

**Please make commits that implement these generic-form API functions.**
