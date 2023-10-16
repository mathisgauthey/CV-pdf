# Install NVM globally on your computer
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# Install NPM and Node
nvm install --lts
# Install resume-cli globally on your computer
npm install -g resume-cli
# Install puppeteer globally on your computer
PUPPETEER_PRODUCT=firefox npm install puppeteer
# Install the jsonresume theme on the local project
npm install jsonresume-theme-onepage-fr