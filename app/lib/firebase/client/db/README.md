# Firestore Client Side CRUD Operations

These files are for functions which perform CRUD operations on Firestore
These operations can be called from the client OR THE SERVER.

> ⚠️ 
> 
> Note that using client code on the server will require that it meets the firestore rules!
> Whereas using the admin sdk or in our case the code in `server/db/` will not.
