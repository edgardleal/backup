#
# Makefile
# edgardleal, 2021-01-08 11:19
#

DONE = echo ✓ $@ done
SOURCES := $(shell find ./ -maxdepth 3 -type f -name '*.puml')
IMAGES := $(addsuffix .png,$(basename $(SOURCES)))
.PHONY: all clean help

all: $(IMAGES)

%.png: %.puml lib/plantuml.jar
	java -jar ./lib/plantuml.jar $<

main.png: $(IMAGES) lib/plantuml.jar
	java -jar ./lib/plantuml.jar main.puml

lib:
	mkdir lib

lib/plantuml.jar: lib
	curl -L https://megalink.dl.sourceforge.net/project/plantuml/plantuml.jar > lib/plantuml.jar

clean: ## clean: Remove ./node_modules and call clean in all children projects
	rm -rf $(IMAGES)

hel%: ## help: Show this help message.
	@echo "usage: make [target] ..."
	@echo ""
	@echo "targets:"
	@grep -Eh '^.+:\ ##\ .+' ${MAKEFILE_LIST} | cut -d ' ' -f '3-' | column -t -s ':'


# vim:ft=make
#

