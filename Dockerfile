FROM node:20-bullseye

# Firebase CLIのインストール
RUN apt-get update && apt-get install -y curl
