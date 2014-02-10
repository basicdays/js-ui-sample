export PATH := bin:node_modules/.bin:$(PATH)

.PHONY: build server test test-lint test-server clean nuke

build: node_modules lib/client/components test/client/components lib/server/build test/server/build

node_modules: package.json
	@npm install

lib/client/components: lib/client/component.json
	@cd lib/client && component install --dev

test/client/components: test/client/component.json
	@cd test/client && component install --dev

lib/server/build:
	@cd lib/client && component build --dev --out ../server/build

test/server/build:
	@cd test/client && component build --dev --out ../server/build

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
	@rm -rf lib/client/components test/client/components
