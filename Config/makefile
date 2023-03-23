up:
	# Start containers
	docker compose build
	docker compose up -d

down:
	# Stop containers
	docker compose down

downwipe:
	# Stop containers and delete volumes
	docker compose down -v

pgshell:
	# Connect to PostgreSQL container
	docker compose exec pgdb bash

psql:
	# Start PostgreSQL command line inside container
	docker compose exec pgdb psql -h pgdb -d appdb -U postgres

phpshell:
	# Start bash inside PHP container
	docker compose exec php-fpm bash
