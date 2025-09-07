## Mind Sprint – International 48-Hour Hackathon
-   **Hector Gonzalez (Guatemala 🇬🇹)**
-  Satyam Bharti (India)
- Sujal Agarwal (India)
- Heet Shah (India)
- Anirudh Madas (India)
- Aayushi Patel (India)

# Echo AI
## Live Demo:
echoai-qleh.onrender.com

## Getting Started with Docker

This project uses Docker to create a self-contained environment. Follow the steps below to build and run the application.

### 1. Environment Variables

Before you begin, you need to create a `.env` file in the root directory of this project. 

Your `.env` file should contain the following variables:

MONGO=mongourl
JWT=jwtpassword
MISTRAL_TOKEN=<your_mistral_api_key>
PORT=port


### 2. Build the Docker Image

Open your terminal, navigate to the project directory, and run the following command to build the Docker image.

docker build -t echoai .


### 3. Run the Docker Container

Once the image is built, you can run the container using the command below. You can choose a different port or use the detached (-d) mode.

docker run --env-file ./.env -p 3000:3000 echoai
