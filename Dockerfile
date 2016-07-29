FROM ubuntu:14.04

MAINTAINER HuyTrinh trinhphandinhhuy@gmail.com

RUN apt-get update && apt-get install -y nodejs npm

COPY . /src

RUN cd /src; npm install

EXPOSE 3001

CMD cd /src/server/bin && nodejs ./www