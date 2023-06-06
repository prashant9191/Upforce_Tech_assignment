# Upforce_Tech_assignment
# Apis

- for getting all the users 
- method: GET
- http://localhost:4500/user/
- In this queries can also be passed for limit and page like this :-
- http://localhost:4500/user/?limit=20&page=2

<hr>

- for getting by id:
- method: GET
- http://localhost:4500/user/:id

<hr>

for exporting csv file 
- method: GET
- http://localhost:4500/user/export

<hr>

- for adding new user
- http://localhost:4500/user/register
- method: POST

<hr>

- for updating user by replacing old data
- method : PUT
- http://localhost:4500/user/:id

<hr>

- for updating user data using patch method
- method : PATCH
- http://localhost:4500/user/:id 

<hr>

- deleting user 
- method : DELETE
- http://localhost:4500/user/delete/:id

<hr>

- for searching users by name or email
-  method : GET
-  http://localhost:4500/user/search/?name=prashant
-  http://localhost:4500/user/search/?email=prashant@gmail.com



