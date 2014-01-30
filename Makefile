export PATH := bin:node_modules/.bin:$(PATH)

.PHONY: all server test test-lint test-server clean nuke

all: node_modules components client/site/build test/site/build

node_modules: package.json
	@npm install

components: component.json
	@component install --dev

client/site/build:
	@component build --dev --out client/site/build

test/site/build:
	@component build --dev --out test/site/build

server: client/site
	@http-server client/site

test: test-lint

test-lint:
	@jshint .

test-server: test/site
	@http-server -p 8081 test/site

clean:
	@rm -rf client/site/build test/site/build

nuke: clean
	@rm -rf node_modules components
