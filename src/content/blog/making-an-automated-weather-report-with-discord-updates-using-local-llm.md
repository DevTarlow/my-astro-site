---
title: 'How To Make An Automated Weather Report with Discord Updates Using N8N and LM Studio'
description: 'Get personalized weather updates on Discord! See how to combine N8N, LM Studio, and local LLMs for automated workflows.'
pubDate: 2026-06-14
tags: [AI automation, local llms, N8N, LM Studio, Workflow Automation]
featuredimage: /images/weather-workflow-discord-n8n.png
---

Have you ever wanted a personalized weather report sent directly to your Discord each morning?

I did.

And that's why I built this workflow.

Each morning, I get a beautiful weather report of our local beach *(with a cam snap shot)*. I enjoy seeing it each morning, plus it helped get me started into local LLMs and tools, this is why I wanted to share it with you.

Whether you're looking to build a new automation project or simply want to dive into the world of local LLMs and AI workflows, this guide is for you.

I will walk you through setting up N8N and LM Studio to create this automated system, making it the perfect starting point for getting into AI automation.

![Weather Report Discord Bot](/images/weather-report-discord.png)
*(Here is a screenshot of my weather report bot message in Discord)*

## Let's Break Down What We Are Building

We are building a fully automated system that fetches raw weather data, uses an LLM (from LM Studio) to format it into a readable report, and pushes the final output to a Discord message.

**Overall you will learn how to**:
- Obtain and utilize an API key
- Install and use the self-hosted n8n to create an automated workflow.
- Install and use LM Studio to download a LLM and host the server for local use.
- Create and setup a Discord Webhook URL

## The Setup

Let's go over some of our required tools for the entire workflow. Later we will break down each tool so you can learn how to install and use each one.

*This setup is just an outline, so adjust it to how you see fit for your hardware.*

**Required Tools**:
- N8N (Self-hosted or cloud instance)
- Docker (for the container n8n runs in)
- LM Studio (and the specific model you plan to use, e.g., I use Gemma4 4B QAT)
- Computer using a graphics card with at least 8GB VRAM (for Gemma4 4B QAT, you can also use smaller models if you have a smaller card)
- OpenWeatherMap API Key
- A Discord Webhook URL

Let's dive into the setup for each of the tools, then we will tie it all together to create the flow.

### Installing Docker:
Docker is going to be used by n8n to provide a clean, isolated environment, and helps to avoid operating system and tooling incompatibilities as well as making database and environment management simpler.

So let's get that going first before we head over to n8n.

**Step 1:** Go to https://docs.docker.com/get-started/get-docker/ and follow the instructions on the screen for the specific operating system you have. This will install Docker Desktop. Docker Engine and Docker Compose will also come with it. 

Once you have Docker installed you are ready to move to the next step, installing n8n.

### Installing N8N
_n8n is a workflow automation platform_ that uses drag and drop nodes to speed up tasks you want to automate. Very useful for quick prototyping and full automation workflows.

For this project we will be using the self hosted setup for n8n which is free to use.

**Step 1**: Head over to the Docker Installation instructions https://docs.n8n.io/hosting/installation/docker/ and follow the steps there. There is also a video guide to help if you prefer that over the written guide.

**Step 2**: If you have not already, the we need to start n8n. This is from the same page above and explains how to start n8n for the first time.

From your terminal, run the following commands, replacing the `<YOUR_TIMEZONE>` placeholders with [your timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List):

```
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="<YOUR_TIMEZONE>" \
 -e TZ="<YOUR_TIMEZONE>" \
 -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true \
 -e N8N_RUNNERS_ENABLED=true \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

This command creates a volume to store persistent data, downloads the required n8n image, and starts the container with the following settings:

- Maps and exposes port `5678` on the host.
- Sets the timezone for the container:
    - the `TZ` environment variable sets the system timezone to control what scripts and commands like `date` return.
    - the [`GENERIC_TIMEZONE` environment variable](https://docs.n8n.io/hosting/configuration/environment-variables/timezone-localization/) sets the correct timezone for schedule-oriented nodes like the [Schedule Trigger node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/).
- Enforces secure file permissions for the n8n configuration file.
- Enables [task runners](https://docs.n8n.io/hosting/configuration/task-runners/), the recommended way of executing tasks in n8n.
- Mounts the `n8n_data` volume to the `/home/node/.n8n` directory to persist your data across container restarts.

Once running, you can access n8n by opening: **[http://localhost:5678](http://localhost:5678/)**

Now when you start n8n next time you don't have to start with the "docker volume create n8n_data" because it will already be made.

**Here is my command to get n8n started, (note I am likely in a different time zone)**:

```
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="America/Los_Angeles" \
 -e TZ="America/Los_Angeles" \
 -e N8N_BLOCK_FS_WRITE_ACCESS=false \
 -e N8N_RESTRICT_FILE_ACCESS_TO="/data" \
 -e N8N_RUNNERS_ENABLED=true \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

*You might need to run these commands with sudo depending on your OS and setup.*

Now you should have both Docker and n8n all setup and running, congrats!

If you ran into an issue, don't forget you can always ask AI to help or refer to the guides.

Let's move on the installing LM Studio and getting our local LLM running.

### Installing LM Studio & Local LLM

LM Studio is a great way to get started running local LLMs at home on your laptop or desktop. It gives you an easy to user interface as well as guidance on which models will fit on your hardware.

LM Studio was the first software I started using to run local LLMs at home and it helped me build confidence to experiment and dive deeper.

Okay, let's get LM Studio installed.

**Step 1**: Head over to https://lmstudio.ai/download and download the correct software for your computer. I am on Linux Mint so I installed the .deb for Linux.

**Step 2**: Now that you have LM Studio installed go ahead and open it so we can install our first large language model to work with. For this tutorial, I will be using Gemma4 4B it QAT *(4B is the amount of billions of parameters the model has, it means the model is instruction tuned, and QAT is the newer Quantization-Aware Training)*, it's what I currently use on my system to power my workflows and get quick answers from.

It's lightweight, fast, and efficient and easily fits on a 8GB VRAM card.

Click on the **Model Search** button on the left sidebar, this will open the search box where you can search for a model.

**And paste in the text:**
```lmstudio-community/gemma-4-E4B-it-QAT-GGUF```

![LM Studio Model Search](/images/lm-studio-model-search.png)

Download the model and once it's finished we can begin loading the model.

**Step 3**: Let's load the model. Click **Developer** tab (if you don't see it you might need to enable it in settings), on the left sidebar.

Then click the blue **+ Load Model** button, you will get a screen like the one below and just click on the model, in my case it's the first model in the list.

LM Studio will then begin to load the model with optimized settings it feels that are best for your hardware.

![LM Studio Load Model](/images/load-model-lm-studio.png)

**Step 4**: We can test that the model is working now by going to the **Chat** tab on the left sidebar.

At the top of the application you will see **"Select a model to load"**, click on that and select your model just like we did in the previous step.

This will essentially load the model for chat so we can test that it's working.

![LM Studio Select Model](/images/select-model-chat-lm-studio.png)

Click the **New Chat** button and then ask a question to see the LLMs response, if we got a response back we are ready to move on.

If the model failed to load then you might not have enough VRAM to load the model.

In that case you can try to run a smaller model or work on tuning the models config a bit before it loads. LM Studio will try to do this automatically for you.

**Step 5**: Starting the local server so other apps like n8n can see and communicate with our LLM.

Head back to the **Developer** tab and make sure to load your model first by clicking the blue **+ Load Model** button.

Once, your model is loaded we can now start the server.

![LM Studio Server Switch](/images/start-server-lm-studio.png)

Click on the toggle button where it says **Status: Stopped**.

This will turn on your local server and the LLM is now reachable through compatible endpoints.

Your local server will now be running on: http://localhost:1234/

The local LLM is now ready to listen to requests coming from other applications like n8n.

Plus, you just got a locall LLM running your own hardware locally, that's an awesome feeling knowing your data is staying local.

We are almost done with everything we need for the workflow.

Now, we just have to get the weather API key, create the Discord webhook URL, and then put the workflow together.

Almost there, you got this!

### Setting up the OpenWeatherMap API Key

**OpenWeatherMap** is an awesome service that lets you do API calls to receive weather reports. It's free to use with very generous usage limits; allowing up to 50 calls per minute and 1 million calls per month.

**Step 1**: Sign up with an account to get your API key. Visit https://openweathermap.org/ and click the orange "Get API Key" button.

This will lead you to a sign in form and if you don't have an account just create one.

**Step 2**: Once inside the account click on the **API keys** tab.

This will lead you to a page where you can make a new API key.

Under the **Create key** label type a name for your key (can be anything) and then click **Generate**.

You will now have your API key ready for use in the workflow.

### Setting up the Discord Webhook URL

If you have made it this far congratulations!

That was a lot to set up. You have Docker Installed, running a self hosted version of n8n, running your own LLM server through LM Studio to talk to your local LLM, and you have your Weather API Key in hand!

Let's get this bit of configuration out of the way and then we can begin setting up the workflow so we can get everything automated.

**Step 1**:  Go to a server on Discord where you want to the message to be sent to and make sure that you also have a channel to send the message.

Click on the **server name** and then click "**Server Settings**".

This will open the servers settings and under the **Apps** section click **Integrations**.

And finally, choose **Webhooks**.

![Create Webhook Discord](/images/webhook-discord.png)

Once you see the Webhooks screen you can click the blue "**New Webhook**" button to create a new Webhook.

Enter in the name you want your Webhook to be and then choose the channel where it will post to.

Then click **Copy Webhook URL** button.

*You can even add a custom photo that will be used as the Discord profile icon for the message.*

![Edit Webhook Discord](/images/edit-webhook.png)

Great! Now we have everything we need for the setup and workflow on n8n.

Let's get started!

## Setting Up N8N: The Workflow

Here is where it all comes together!

Unlocking the power of your local LLM and automatons. 

**The Flow**:
Schedule Trigger ➡️  AI Agent using OpenWeatherMap tool ➡️  Discord Node

- For the weather data we will be using OpenWeatherMap where you can get a free API key.
- The automation workflow will be handled locally using self hosted n8n
- And LM Studio will the software hosting the LLM locally so we can format the data nicely.

**Here is an example of the completed workflow:** 
![Weather Bot N8N Workflow](/images/weather-workflow-discord-n8n-1.png)

**Step 1**: Let's start by first opening up n8n which should be at http://localhost:5678/

Click on the orange button labeled "**Create Workflow**"

### Trigger Manually Node

**Step 2:** We can now insert our first node. For now since we will just be testing the workflow we are going to use the "**Trigger manually**" node. 

- Click the + sign to **add a node** *(or right-click on the canvas and click add node)* and find the **Trigger Manually** node.

Later you can replace it with a "**On a schedule**" node which will execute at a specific time.

### AI Agent Node

**Step 3**: Next add the "**AI Agent Node**". 

- Double-click to open the **AI Agent** node so we can update so information.

- First, using the drop down **Source for Prompt (User Message)** select "**Define Below**". This will let you enter a user prompt that will be sent to the LLM. 

- Next, In the **Prompt (User Message)** field enter the following prompt.

```
Step 1: Data Retrieval
Call the "OpenWeatherMap tool" to give me the weather report.

Step 2: Formatting Rules
Create a report using the following structure. Do not include the bracketed labels in the final text; only the values.

Greeting: Start with a natural greeting and a 1-sentence summary of the conditions.

Structure: Use the following Markdown template exactly:

Current Weather Report:
Condition: [Description] [Emoji]

Temperature: [Value]°F

Feels Like: [Value]°F

Humidity: [Value]% 💧

Wind Speed: [Value] m/s 💨

Step 3: Quality Control

Remove all placeholder text or "Notes" from the final response.

Ensure the "Condition" emoji matches the weather description.

Final Action: Deliver the formatted report directly to the user.
```

This Prompt (user message) is used to help let the LLM know what we are looking for as far as the response and output. We will give even more guidance next with the system message.

Step 4: In the **System Message** field enter the following:

```
# Role: You are a specialized weather reporting agent. You excel at translating raw JSON data from tools into professional, user-friendly reports.

# Role Objective: Generate a weather report using ONLY data retrieved from the 'OpenWeatherMap tool' when prompted by the user.

# Constraints: No Meta-Talk: Do not include instructions, placeholders, or technical warnings (e.g., "Replace your API ID") in the final output.

# No Filler: Provide only the greeting and the weather data. Do not explain your process.

# Units: Ensure temperatures are displayed in the unit requested by the user. If the tool returns Kelvin, convert it to Celsius or Fahrenheit before outputting.
```

This will help keep the LLM in line with what we are asking for in the user prompt.

Go ahead and exit the AI Agent node for now, we need to hook up the chat model and tool next.

**Step 5**: Below the AI Agent you will see a **+** button and **Chat Model**.

- Click the **+** and then type in **OpenAI** and click on "**OpenAI Chat Model**" node. 

You should now see the node parameters and settings.

- Under "**Credential**" click "**+ Create new credential**"

![OpenAI N8N Settings](/images/openai-n8n-settings.png)

- For **API Key**, you can enter anything here since you are using LM Studio locally, for example just enter: weather

- Next enter the **Base URL** which is the OpenAI endpoint to contact the model: http://localhost:8080/v1

- Click the orange, **Save** button.

Now you should see the model that you loaded in LM Studio.

- Go ahead a pick the model from the list.

*Note: If you don't see it, make sure that you loaded the model and have the server on. You might need to jump back up a few steps .*

**Step 6**: Let's do the same thing for "**Tool**" on the AI Agent.

- After clicking on the + button go ahead and type in "Open" an choose the tool "**OpenWeatherMap Tool**"

This should open the tool parameters and settings, and we need to setup an account credentials just like we did for OpenAI.

- Click on "**+ Create new credential**" and input your **Access token** (API Key) from OpenWeatherMap here.

- Click **Save** to return back to the Parameters and settings.

In the OpenWeatherMap node be sure to set:

- **Tool Description**: Set Automatically
- **Operation**: Current Weather
- **Format**: Imperial (depending if you want Celsius or Fahrenheit)
- **Location Selection**: I chose City ID (you can get your city ID by searching your city on OpenWeatherMap and it will be the numbers trailing in the URL eg. https://openweathermap.org/city/5746545)
- **Language**: en

![Setting Up OpenWeatherMap API](/images/openweather-account-n8n.png)

Now your workflow should look like the image below.

We are about ready to send the formatted message from the AI agent to Discord.

![Weather Bot Flow N8N](/images/weather-bot-flow-1.png)

### Adding the Discord Node

Now that the AI Agent is all setup we can focus on the discord node.

**Step 7**: On your workflow click the **add a node**, search for **Discord**.

Once added we are going to need to fill out the parameters just like the previous nodes.

- **Connecting Type**: Webhook
- **Credential for Discord Webhook:** Add a new credential with your **Discord Webhook URL** and **Save**.
- **Operation**: Send a Message
- **Message**:  {{ $json.output }} *(this is the output from the AI node)*

![Webhook for Discord on N8N](/images/discord-n8n.png)

## Testing the Workflow

![Weather Bot N8N Workflow](/images/weather-workflow-discord-n8n.png)

Go ahead and click the orange "**Execute Workflow**" button, this will trigger the script to start from the first node which is our AI Agent.

You did it! The workflow should now have everything you need for the AI to fetch the weather using its tool and put it in a nicely formatted message for your Discord channel!

If this was your first workflow, congrats! It was a lot to get this far but it just gets easier with practice and time.

Try replacing the first node with a schedule node to get a notification each morning, that's what I do along with attaching a recent snapshot of the beach that is fetched from a webcam.

Be creative, that's what building is all about!

Thanks for sticking it out and I hope this inspires you to build and share your own projects.

~ Tarlow