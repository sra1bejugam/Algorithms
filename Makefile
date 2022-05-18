

default: build

build:
	docker-compose build

dc-build:
	docker-compose up -d --build
	
start-all: dc-build
	docker-compose exec -d normalization npm start
	docker-compose exec -d classification npm start
	docker-compose exec -d subscription npm start
	docker-compose exec -d aggregator npm start
	docker-compose exec -d leasecontract npm start
	docker-compose exec -d application npm start
	docker-compose exec -d app npm start
	docker-compose exec -d cashflow npm start
	docker-compose exec -d templatetuning npm start

start-lease-sh: dc-build
	docker-compose exec -d normalization npm start
	docker-compose exec -d templatetuning npm start
	docker-compose exec -d classification npm start	
	docker-compose exec -d aggregator npm start	
	docker-compose exec -d application npm start
	#docker-compose exec -d app npm start
	docker-compose exec leasecontract sh

# run all services to test e2e flow
start:
	docker-compose -f docker-compose-run-all.yaml up --build app aggregator cashflow

# run all services in detached mode to test e2e flow
start-d:
	docker-compose -f docker-compose-run-all.yaml up -d --build app application classification normalization aggregator cashflow templatetuning subscription

start-app: dc-build
	docker-compose exec app npm start

start-api: dc-build
	docker-compose exec application npm start

start-dn: dc-build	
	docker-compose exec -d application npm start
	docker-compose exec -d templatetuning npm start
	docker-compose exec normalization npm start

start-dc: dc-build	
	#docker-compose exec -d application npm start
	#docker-compose exec -d normalization npm start
	docker-compose exec classification npm start

start-agg: dc-build	
	#docker-compose exec -d application npm start
	#docker-compose exec -d normalization npm start
	#docker-compose exec -d classification npm start
	docker-compose exec aggregator npm start

#runs react app in shell
sh-app: dc-build
	docker-compose exec app sh

#runs api in shell
sh-api: dc-build
	docker-compose exec application sh

#runs normalization service in shell
sh-ns: dc-build
	docker-compose exec normalization sh

#runs classification service in shell
sh-cs: dc-build
	docker-compose exec classification sh

#runs aggregator service in shell
sh-agg: dc-build
	docker-compose exec aggregator sh

#runs leasecontract service in shell
sh-lc: dc-build
	docker-compose exec leasecontract sh

stop: 
	docker-compose down

#initializes the submodules
git-init:
	git submodule update --init --recursive

git-pull:
	git submodule update --recursive --remote
	
#checks out master branch on all submodules and pulls the latest
git-pull-checkout:
	git submodule foreach git pull

git-status:
	git config status.submoduleSummary true
	git status

git-test:
	#git submodule foreach -q --recursive 'current=$$path; [$(current)='fp-template-tuning-service'] && echo true || echo false'
	git submodule foreach -q --recursive echo $$name
	