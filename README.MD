Unfortunately I underestimated the amount of time needed to accomplish the task. The task itself is easy, but since I need to for on the frontend backend simultaneously it's simply too much work to accomplish in one sitting.

<b>My focus was to create good architecture that can be easily extendable. I used as much types as possible, so should be relatevely easy to read the code.</b>

To run the project, it should be sufficient to just execute:
`docker-compose up`

1. For the frontend I used NextJS since it works great with React and Typescript.

2. For the backend I used Express as it was prescribed in the task.

For authorization token I chose JWT, since it gives a lot of flexibility. At first, I planned to add capability to logout from all devices, but unfortunately I had no time left to accomplish it.
I also added extra endpoint `/users`, which returns raw data (Including passwords) for users. This endpoint is needed because JWT in such small scale
draws authentication useless since username can be encoded into JWT itself. I wanted to have at least one endpoint that authorizes the user.
