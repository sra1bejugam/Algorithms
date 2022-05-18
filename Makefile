
include .env

# The release agent just runs 'make' and expects a built docker image from it.
default: build

dc-build:
	docker-compose build app
# ---------- Development ----------
start: dc-build
	docker-compose run -p $(PORT):$(PORT) -p $(DEBUG_PORT):$(DEBUG_PORT) -e NODE_ENV=development --entrypoint=npm app run dev

# ---------- Testing ----------
test: dc-build
	docker-compose run -e DISABLE_WRITE_TO_MESSAGE_STORE=true -e NODE_ENV=test --entrypoint=npm app run test

coverage: dc-build
	docker-compose run -e NODE_ENV=test --entrypoint=npm app run coverage

# ---------- Release Agent ----------
#Server statup: createApp should create an express app
build:
	docker build -t $(DOCKER_REG)$(SERVICE_NAME) .

# ---------- Build Agent ----------
build-agent:
	- docker-compose down
	docker-compose -f docker-compose-ba.yml build app
	docker-compose -f docker-compose-ba.yml run --name $(SERVICE_NAME) --entrypoint=npm -e DISABLE_WRITE_TO_MESSAGE_STORE=true -e PINO_ENABLED=false -e NODE_ENV=test app run coverage
	docker cp $(SERVICE_NAME):/code/test-results .
	docker cp $(SERVICE_NAME):/code/coverage .
	docker-compose down