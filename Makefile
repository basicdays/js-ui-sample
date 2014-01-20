export PATH := bin:node_modules/.bin:$(PATH)

.PHONY: all build server test test-lint test-server clean

all: build

build: node_modules components
	@component build       --out client/site/build
	@component build --dev --out test/site/build

node_modules:
	@npm install

components: component.json
	@component install --dev

server: client/site
	@http-server client/site

test: test-lint

test-lint:
	@jshint .

test-server: test/site
	@http-server -p 8081 test/site

clean:
	@rm -rf components client/site/build
