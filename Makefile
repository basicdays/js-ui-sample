export PATH := bin:node_modules/.bin:$(PATH)

build: node_modules lib/client/components test/client/components lib/server/build test/server/build

node_modules: package.json
	@npm install

lib/client/components: lib/client/component.json
	@cd lib/client && component install --dev

test/client/components: test/client/component.json
	@cd test/client && component install --dev

lib/server/build: lib/client/components
	@echo "Building"
	@cd lib/client && component build --dev --out ../server/build

test/server/build: test/client/components
	@echo "Building tests"
	@cd test/client && component build --dev --out ../server/build

watch:
	@component watch

server: lib/server
	@http-server -p 8080 lib/server

lint:
	@jshint .

test: lint
	mocha

test-server: test/server/build
	@http-server -p 8081 test/server

clean:
	@rm -rf lib/server/build test/server/build

nuke: clean
	@rm -rf lib/client/components test/client/components

.PHONY: test
