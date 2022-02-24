import {getApp} from "./bootstrap/app";

// Start and bootstrap is divided because I want to establish DB connection first
// The app is also needed in tests (I use integration testing for APIs)
(async () => {
    const app = await getApp();
    app.listen(process.env.PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
    });
})()
