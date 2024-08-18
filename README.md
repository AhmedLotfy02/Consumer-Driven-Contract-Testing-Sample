# Consumer-Driven-Contract-Testing-Sample
<p>This project consists of three microservices that interact with each other to handle an OTP (One Time Password) generation and notification system. The three services are:</p>
<ul>
    <li><strong>OTP Service</strong> (<code>otp-svc</code>)</li>
    <li><strong>User Service</strong> (<code>user-svc</code>)</li>
    <li><strong>Notification Service</strong> (<code>notify-svc</code>)</li>
</ul>

<h2>1. OTP Service (<code>otp-svc</code>)</h2>
<p>This service is responsible for generating and serving OTPs, as well as providing the status of the OTP process.</p>

<h3>Endpoints:</h3>
<ul>
    <li><code>POST /otp</code>:
        <ul>
            <li><strong>Purpose</strong>: Generates an OTP and logs the request body received.</li>
            <li><strong>Response</strong>: Returns a JSON object containing the message "OTP generated" and the request body.</li>
        </ul>
        <pre>
{
"message": "OTP generated",
"explanation": "OTP is generated and sent to user",
"requestBody": { ... }
}
</pre>
</li>

<li><code>GET /otp</code>:
<ul>
    <li><strong>Purpose</strong>: Retrieves a hardcoded OTP for simplicity.</li>
    <li><strong>Response</strong>: Returns a JSON object with the OTP and its validity status.</li>
</ul>
<pre>
{
"otp": "123456",
"valid": true
}
</pre>
</li>

<li><code>GET /otp-status</code>:
<ul>
    <li><strong>Purpose</strong>: Provides the status of the OTP process.</li>
    <li><strong>Response</strong>: Returns the status of OTP delivery.</li>
</ul>
<pre>
{
"status": "OTP sent"
}
</pre>
</li>
</ul>

<h3>How it interacts:</h3>
<p>This service acts as the OTP provider. Other services request an OTP from here or check the OTP status.</p>

<h2>2. User Service (<code>user-svc</code>)</h2>
<p>This service interacts with the OTP service to request and retrieve OTPs, as well as with the Notification service to check the notification status.</p>

<h3>Endpoints:</h3>
<ul>
<li><code>POST /request-otp</code>:
<ul>
    <li><strong>Purpose</strong>: Sends a request to the OTP service to generate an OTP.</li>
    <li><strong>Interaction</strong>: Makes a <code>POST</code> request to <code>otp-svc</code>'s <code>/otp</code> endpoint with the body received from the client.</li>
    <li><strong>Response</strong>: Returns a confirmation that the OTP request was sent, along with the response from <code>otp-svc</code>.</li>
</ul>
<pre>
{
"message": "OTP requested",
"otpResponse": { ... }
}
</pre>
</li>

<li><code>GET /get-otp</code>:
<ul>
    <li><strong>Purpose</strong>: Retrieves the generated OTP from <code>otp-svc</code>.</li>
    <li><strong>Interaction</strong>: Makes a <code>GET</code> request to <code>otp-svc</code>'s <code>/otp</code> endpoint.</li>
    <li><strong>Response</strong>: Returns the retrieved OTP and its status.</li>
</ul>
<pre>
{
"message": "OTP retrieved",
"otp": { "otp": "123456", "valid": true }
}
</pre>
</li>

<li><code>GET /notification-status</code>:
<ul>
    <li><strong>Purpose</strong>: Checks the status of the notification from the <code>notify-svc</code>.</li>
    <li><strong>Interaction</strong>: Makes a <code>GET</code> request to <code>notify-svc</code>'s <code>/notification-status</code> endpoint.</li>
    <li><strong>Response</strong>: Returns the notification status from <code>notify-svc</code>.</li>
</ul>
<pre>
{
"message": "Notification status retrieved",
"notifyStatus": { "status": "Notification service is running" }
}
</pre>
</li>
</ul>

<h3>How it interacts:</h3>
<p>This service communicates with the OTP service to request and retrieve OTPs, and with the Notification service to check the status of notifications.</p>

<h2>3. Notification Service (<code>notify-svc</code>)</h2>
<p>This service is responsible for sending notifications about the OTP status.</p>

<h3>Endpoints:</h3>
<ul>
<li><code>GET /notify</code>:
<ul>
    <li><strong>Purpose</strong>: Requests the OTP status from the <code>otp-svc</code> and sends a notification.</li>
    <li><strong>Interaction</strong>: Makes a <code>GET</code> request to <code>otp-svc</code>'s <code>/otp-status</code> endpoint to retrieve the OTP status.</li>
    <li><strong>Response</strong>: Returns the OTP status received from <code>otp-svc</code>.</li>
</ul>
<pre>
{
"message": "Notification sent",
"otpStatus": { "status": "OTP sent" }
}
</pre>
</li>

<li><code>GET /notification-status</code>:
<ul>
    <li><strong>Purpose</strong>: Provides the status of the Notification service.</li>
    <li><strong>Response</strong>: Returns a message indicating that the Notification service is running.</li>
</ul>
<pre>
{
"status": "Notification service is running"
}
</pre>
</li>
</ul>

<h3>How it interacts:</h3>
<p>This service requests OTP status from the <code>otp-svc</code> and notifies the user about the OTP status. It also provides a status check for the notification system.</p>

<h2>Interaction Workflow</h2>
<ol>
<li>The <strong>User Service</strong> (<code>user-svc</code>) receives a request to generate an OTP via <code>/request-otp</code> and forwards this request to the <strong>OTP Service</strong> (<code>otp-svc</code>).</li>
<li>The <strong>OTP Service</strong> (<code>otp-svc</code>) processes the request, generates an OTP, and returns a response.</li>
<li>The <strong>User Service</strong> (<code>user-svc</code>) can retrieve the OTP from the <strong>OTP Service</strong> (<code>otp-svc</code>) via the <code>/get-otp</code> endpoint.</li>
<li>The <strong>User Service</strong> can also check the status of the <strong>Notification Service</strong> by calling <code>/notification-status</code> on the <strong>Notification Service</strong> (<code>notify-svc</code>).</li>
<li>The <strong>Notification Service</strong> (<code>notify-svc</code>) interacts with the <strong>OTP Service</strong> (<code>otp-svc</code>) to retrieve the OTP status via <code>/notify</code> and sends a notification.</li>
</ol>

<h2>Running the Services</h2>
<ul>
<li>Start the <strong>OTP Service</strong> on port <code>3001</code>.</li>
<li>Start the <strong>Notification Service</strong> on port <code>3002</code>.</li>
<li>Start the <strong>User Service</strong> on port <code>3000</code>.</li>
</ul>

<p>Each service runs independently but interacts with each other to complete the OTP and notification workflow.</p>
<h2>Recording Test Cases and Mocks with Keploy</h2>
<p>You can record test cases and mocks for these services using the <code>keploy</code> command. To record test cases and mocks, follow these steps:</p>
<ol>
  <li>Install <strong>Keploy</strong> on your machine if you haven't already.</li>
  <li>Run the <code>keploy record</code> command to record interactions of the otp service go to otp-svc and write:
      <pre><code>keploy record -c "node index.js"</code></pre>
  </li>
  <li>Send the requests of it from the curls file in VirtualCPR folder</li>
  <li>Test cases will be recorded and be put inside otp-svc</li>
  <li>Do the same for notify-svc and user-svc</li>
 </ol>
<p><b>If you don't want to record new test cases and mocks, there are already existing recorded test cases and mocks available in the repository, which can be used directly without re-recording.</b></p>
<h2>Generating OpenAPI schemas of Test cases and Mocks with Keploy</h2>
<ol>
  <li>Run the <code>keploy contract</code> command to generate OpenAPI Schemas for each service of the three:
      <pre><code>keploy contract generate </code></pre>
  </li>
  
 </ol>
<h2>Consumer Driven Testing</h2>
<ol>
  <li>Run the <code>keploy contract test</code> command to run consumer driven contract testing:
      <pre><code>keploy contract test --driven "consumer" --download "true" </code></pre>
  </li>
  <li>You can use --generate and --download  flags to generate and download the OpenAPI schemas without using generate command separatly: 
        <pre><code>keploy contract test --driven "consumer" --download "true" --generate "true" </code></pre>

  </li>
  
 </ol>
<h2>Differences & Summary</h2>
<ol>
  <li>Now you will see the differences between each mock and it's ideal test case.
      
  </li>
<a href="https://ibb.co/ftKmbnf"><img src="https://i.ibb.co/HYMm0x6/image.png" alt="image" border="0"></a>
<a href="https://ibb.co/jwKqnrF"><img src="https://i.ibb.co/B6Dv0CR/image.png" alt="image" border="0"></a>
 </ol>
