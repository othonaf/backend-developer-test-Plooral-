# Backend Developer Technical Assessment

## Description:

This was a selection test I participated in for Plooral. My challenge was to create a backend application that served some endpoints: consultation, registration, deletion and posting of job advertisements.

Furthermore, the test required me to create an AWS lambda function that queries a database where information about vacancies with the status "published" is stored and generates a JSON file to be stored in an S3 bucket. This JSON would serve as a caching tool to handle high requests. Job vacancy information should be consulted in this JSON and not in the database directly.

The project consists of eight endpoints that are in separate files for better organization and readability, they are called through the ExpressJS "router" feature in the 'index.ts' file. In addition to these, in the "src" folder I also have the files "app.ts" (which contains the server settings), "connection.ts" (which contains the connection settings to the PostgreSQL database) and "fetchAndStore.ts " (which contains the code to be used in the lambda function in AWS).

This test was particularly challenging because as an optional (not required) feature, I was required to use OpenAI's free moderation tool to assess whether posts contained harmful content.
The challenge consisted of this:
**"Every time a user requests a job post (PUT /job/:job_id/publish), the API must successfully respond to the user, but the job must not be published immediately. It must be queued using AWS SQS, feeding the job to a Lambda component. Using OpenAI's free moderation API, create a Lambda component that will evaluate the job title and description and test the hamrful content. If the content passes the evaluation, the component should change status from work to published, otherwise change it to rejected and add the OpenAI API response to the notes column."**

### Bonus Questions

1. Discuss scalability solutions for the job moderation feature under high load conditions. Consider that over time the system usage grows significantly, to the point where we will have thousands of jobs published every hour. Consider the API will be able to handle the requests, but the serverless component will be overwhelmed with requests to moderate the jobs. This will affect the database connections and calls to the OpenAI API. How would you handle those issues and what solutions would you implement to mitigate the issues?

    **Answer:**
         - Scalability is a point that really requires a lot of attention in any application. Regarding these issues raised, we have two considerations to think about:
        1. We can use SQS message queue to avoid overloading the serverless component with moderation requests.
        2. To reduce the load on the database we can use the AWS elasticache service which implements a database cache. It would help reduce latency and improve performance when accessing frequently used data.
        There are other alternatives in the AWS context, but for now these would be useful.

2. Propose a strategy for delivering the job feed globally with sub-millisecond latency. Consider now that we need to provide a low latency endpoint that can serve the job feed content worldwide. Using AWS as a cloud provider, what technologies would you need to use to implement this feature and how would you do it?
    
    **Answer:**
        - In this case, the Amazon CloudFront service would be a good option as it delivers data, videos, applications and APIs to your viewers securely, with low latency, high transfer speed and on a global scale. We could configure CloudFront to serve the job feed from the S3 bucket.

## Configuration and execution instructions:

1. You can clone (or fork) this repository and get the project by a 'git pull' command.
2. Install the necessary libs for the project (axios, express, aws-sdk); I always use 'npm install'.
3. You can run the project using the command 'npm run start' to validate this project and test in a client 'http' tool like 'Postman'. This project is configured to run on localhost port '3003'.



## A Note on the Use of AI Tools:

I usually use artificial intelligence as a "teacher". I don't really like simply "copying and pasting", as I believe it would hinder my development as a professional. I use it as a high-level research tool.

Whenever I have a question, or am unfamiliar with a subject, I ask it via the command _"I need a tutorial on how to do this"_, or _"Explain to me the logic behind how technology 'X' works"._

In this case, of this specific challenge, I used it by asking him to explain to me how the OpenAi moderation tool works (which I had never used before). I also asked for help with some AWS SQS configurations and Lambda functions.

