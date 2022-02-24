Unfortunately I underestimated the amount of time needed to accomplish the task. The task itself is easy, but since I need to work on the frontend backend simultaneously it's simply too much work to accomplish in one sitting. I literally had to start from scratch since I don't have any recent JS / TS projects I could copy / paste from.

I wonder, have you actually tried this project yourself? It was a surprisingly challenging exercise to see how much decent code I could write in 10 hours. I strongly advise you to try it yourself and attempt to do it from scratch without relying on any code you used in previous projects. It's quite interesting to see that you need to really bend your mind and evaluate trade-offs in to accomplish the task in a limited time. With each decision to make code better you're facing the risk to simply not deliver everything in the given timeframe. 
(I know that probably the task doesn't have time limit, it's just happened that it had it for me)

<b>My focus was to create good architecture that can be easily extendable. I used as much types as possible, so should be relatively easy to read the code.</b>

<b>I wanted to accomplish the task in such manner that it would be possible to build a completely functioning project on top of this. With that in mind, I separated Model into DTOs and Services, added some validation and notification components on the frontend and backend.</b>

<b>The trade-off of this approach is relatevily weak backend and the lack of testing. If you judge the project only by its backend and business requirements, it doesn't seem very good. But if you judge it as the first day of work on a real project, it's not half bad at all!</b>

To run the project, it should be sufficient to just execute:
`docker-compose up`

<b>NOTE: it may take about 2-3 minutes to actually start. There's a lot of dependencies for both frontend and backend.</b>

The URLS of the servers going to be: http://localhost:3000 the frontend and http://localhost:3001 for the backend.

1. For the frontend I used NextJS since it works great with React and Typescript.

2. For the backend I used Express as it was prescribed in the task.

For authorization token I chose JWT, since it gives a lot of flexibility. At first, I planned to add capability to logout from all devices, but unfortunately I had no time left to accomplish it. I also added extra endpoint `/users`, which returns raw data (Including passwords) for users. This endpoint is needed because JWT in such small scale draws authentication useless since username can be encoded into JWT itself. I wanted to have at least one endpoint that authorizes the user.

<b>Don't forget to checkout the list of commits. You're going to be amazed how much code I actually pushed in the last 10 hours</b>

Things I'm unhappy about:

1. Not enough tests. I wanted to write more.
2. For a real application I would add one more DTO for the users. At the moment password hash is exposed in authenticated requests. There's no business requirements on what our users are, so let's assume it's an internal CRM. 
3. Some troubles with severe serverside errors on the frontend. Like cases when backend is gone completely and doesn't respond. The frontend doesn't always show proper error messages. I'm not sure if I'm supposed to account for such situations in this task.
