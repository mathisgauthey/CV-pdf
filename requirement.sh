# Install NVM globally on your computer
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# Install NPM and Node
nvm install --lts
# Install resume-cli globally on your computer
npm install -g resume-cli
# Install puppeteer in your project
PUPPETEER_PRODUCT=firefox npm install puppeteer
# Install the jsonresume theme on the local project
npm install jsonresume-theme-onepage-fr
# WSL specific
sudo apt install libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2