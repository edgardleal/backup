#
# Makefile
# edgardleal, 2020-03-12 09:50
#

DONE = echo ✓ $@ done
SOURCES = $(shell find src/ -type f -name '*.ts') index.ts
APP_NAME = $(shell cat package.json 2>/dev/null | $(call JSON_GET_VALUE,name))
modules = $(wildcard node_modules/*/*.js)
.PHONY: all clean help run build install lint docs

all: list

node_modules/.bin/tsc: package.json
	yarn || npm i
	touch node_modules/.bin/tsc

docs: ## docs: generate uml diagrans in docs folder
	$(MAKE) -C docs/

node_modules/.last_lint: $(SOURCES) node_modules/.bin/tsc
	yarn lint || npm run lint
	@touch node_modules/.last_lint

lint: node_modules/.last_lint

reload:
	./node_modules/.bin/pm2 reload ecosystem.config.js --update-env

status:
	./node_modules/.bin/pm2 status backup

logs:
	./node_modules/.bin/pm2 logs

list: dist/bin.sh
	DEBUG=backup* node dist/index.js list

publish: dist/bin.sh
	npm publish --access=public

dist:
	mkdir dist

dist/bin.sh: dist/index.js dist
	echo '#!/usr/bin/env node' > dist/bin.sh
	echo 'require("./index.js");' >> dist/bin.sh
	chmod +x dist/bin.sh

dist/index.js: $(SOURCES) node_modules/.last_lint coverage/index.html
	./node_modules/.bin/tsc -p tsconfig.json
	@touch dist/index.js

run: dist/bin.sh
	DEBUG=backup* node dist/index.js backup

build: dist/bin.sh

node_modules/.bin/jest: package.json
	yarn || npm i
	touch node_modules/.bin/jest

install: node_modules/.bin/jest

coverage/index.html: $(SOURCES) node_modules/.bin/jest
	DEBUG=backup* yarn test --coverage --coverageReporters html

test: coverage/index.html

compile: dist/index.js

clean: ## clean: Remove ./node_modules and call clean in all children projects
	rm -rf ./node_modules
	rm -rf ./dist

hel%: ## help: Show this help message.
	@echo "usage: make [target] ..."
	@echo ""
	@echo "targets:"
	@grep -Eh '^.+:\ ##\ .+' ${MAKEFILE_LIST} | cut -d ' ' -f '3-' | column -t -s ':'


# vim:ft=make
#
