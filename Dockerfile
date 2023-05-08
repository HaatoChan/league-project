FROM node:18.8.0

# Install dependencies
RUN apt-get update && apt-get install -y xvfb libgtk2.0-0 libnotify4 libgconf-2-4 libnss3 libxss1 libasound2

# Create working directory
RUN mkdir /app
WORKDIR /app

# Copy app files
COPY . /app

# Install app dependencies
RUN npm install

# Set environment variable
ENV DISPLAY=:99.0

# Start Xvfb and launch the Electron app
CMD Xvfb :99 -screen 0 1024x768x16 & npm run wdio && tail -f /dev/null
