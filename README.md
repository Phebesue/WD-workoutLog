# WD-workoutLog

## Please see below for images of endpoint & tokens, etc.

### Endpoints:
Endpoint | Verb | Description
-------- | ---- | -----------

#### 1. /user/register |	POST | Allows a new user to be created with a username and password.
<img src= "images/logRegister2.jpg" width = 80%>

#### 2. /user/login | POST |Allows log in with an existing user.
<img src= "images/logUserLogin.jpg" width = 80%>

#### 3. /log/ | POST |	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
<img src= "images/logCreate2.jpg" width = 80%>

#### 4. /log/ | GET |	Gets all logs for an individual user.
<img src= "images/getMyLogEntries.jpg" width = 80%>

#### 5. /log/:id	| GET |	Gets individual logs by id for an individual user.
<img src= "images/getLogsByUserId.jpg" width = 80%>

#### 6. /log/:id |	PUT |	Allows individual logs to be updated by a user.
<img src= "images/putLogByLogId.jpg" width = 80%>

#### 7. /log/:id |	DELETE |	Allows individual logs to be deleted by a user.
<img src= "images/DelLogByLogId2.jpg" width = 80%>
