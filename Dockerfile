FROM buildkite/puppeeter:latest

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install nodejs -y
RUN apt-get install yarn -y

WORKDIR /app
COPY . /app
RUN npm install
RUN yard add yt-search
RUN npm install -g forever
CMD ["forever", "index.js"]
EXPOSE 8080
