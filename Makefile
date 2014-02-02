export PATH := bin:node_modules/.bin:$(PATH)

.PHONY: build server test test-lint test-server clean nuke

build: node_modules components lib/server/build test/server/build

node_modules: package.json
	@npm install

components: component.json
	@component install --dev

lib/server/build:
	@component build --dev --out lib/server/build

test/server/build:
	@component build --dev --out test/server/build

server: lib/server
	@http-server lib/server

test: test-lint

test-lint:
	@jshint .

test-server: test/server
	@http-server -p 8081 test/server

clean:
	@rm -rf lib/server/build test/server/build

nuke: clean
	@rm -rf components
