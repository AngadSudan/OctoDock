FROM ubuntu:focal 

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update -y \
    && apt-get install -y nodejs

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
      https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y docker-ce docker-ce-cli containerd.io \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/app

COPY main.sh main.sh
COPY Dockerfile.node dockerfile
COPY build.js build.js
RUN chmod +x main.sh

# Remove ENV FILES because it's incorrect
CMD ls -la /

ENTRYPOINT ["/home/app/main.sh"]
