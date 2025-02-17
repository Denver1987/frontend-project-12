lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start:
	npm run start

develop:
	make start & make -C frontend dev

build:
	rm -rf frontend/dist
	make -C frontend build
