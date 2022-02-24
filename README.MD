Unfortunately I underestimated the amount of time needed to accomplish the task. The task itself is easy, but since I need to for on the frontend backend simultaneously it's simply too much work to accomplish in one sitting.
I literally had to start from scratch since I don't have any recent JS / TS projects I could copy / paste from.


<b>My focus was to create good architecture that can be easily extendable. I used as much types as possible, so should be relatevely easy to read the code.</b>

To run the project, it should be sufficient to just execute:
`docker-compose up`

<b>Note that it may take about 2-3 minutes to actually start. There's a lot of dependencies for both frontend and backend.</b>

The URLS of the servers going to be: http://localhost:3000 the frontend and http://localhost:3001 for the backend.


1. For the frontend I used NextJS since it works great with React and Typescript.

2. For the backend I used Express as it was prescribed in the task.

For authorization token I chose JWT, since it gives a lot of flexibility. At first, I planned to add capability to logout from all devices, but unfortunately I had no time left to accomplish it.
I also added extra endpoint `/users`, which returns raw data (Including passwords) for users. This endpoint is needed because JWT in such small scale
draws authentication useless since username can be encoded into JWT itself. I wanted to have at least one endpoint that authorizes the user.

<b>Don't forget to checkout the list of commits. You're going to be amazed how much code I actually pushed in the last 10 hours</b>


Things I'm unhappy about:

1. Not enough tests. I wanted to write more.
2. For a real application I would add one more DTO for the users object. At the moment password hash is exposed.
3. Some troubles with severe errors on the frontend. Like cases when backend is gone completely and doesn't respond.
