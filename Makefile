dev-run:
	docker-compose up midia-dev

dev-build:
	docker-compose up --build midia-dev

debug-build:
	docker-compose up --build midia-debug

debug-run:
	docker-compose up midia-debug