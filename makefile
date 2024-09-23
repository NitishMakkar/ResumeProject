# Default Values (Optional)
DB_HOST ?= localhost
SQL_SCRIPT := init.sql
NODE_APP := app.js

# Commands
.PHONY: init-db start-server clean

# Initialize the MySQL database
init-db:
	@echo "Initializing MySQL Database..."
	@if [ -z "$(DB_USER)" ] || [ -z "$(DB_PASSWORD)" ]; then \
		echo "Error: DB_USER and DB_PASSWORD must be provided."; \
		exit 1; \
	fi
	mysql -u $(DB_USER) -p$(DB_PASSWORD) -h $(DB_HOST) < $(SQL_SCRIPT)

# Start the Node.js server
start-server:
	@echo "Starting Node.js server..."
	node $(NODE_APP)

# Combine both tasks
start: init-db start-server

# Clean up (optional)
clean:
	@echo "Stopping Node.js process (if needed)..."
	-pkill node || echo "No Node.js process to kill"
