# WD-workoutLog

### Please see below for images of endpoint & tokens, etc.

**Endpoints:**
Endpoint | Verb | Description
-------- | ---- | -----------

**1.** /user/register |	POST | Allows a new user to be created with a username and password.
![](images/logRegister.jpg)

**2.** /user/login |POST |Allows log in with an existing user.
![](images/logUserLogin.jpg)

**3.** /log/ | POST |	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
![](images/logCreate.jpg)

**4.** /log/ | GET |	Gets all logs for an individual user.
![](images/getMyLogEntries.jpg)

**5.** /log/:id	| GET |	Gets individual logs by id for an individual user.
![](images/getLogsByUserId.jpg)

**6.** /log/:id |	PUT |	Allows individual logs to be updated by a user.
![](images/putLogByLogId.jpg)

**7.** /log/:id |	DELETE |	Allows individual logs to be deleted by a user.
![](images/DelLogByLogId.jpg)
