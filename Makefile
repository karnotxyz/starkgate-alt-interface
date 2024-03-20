.PHONY: install create_env build start deploy dev lint clean clean_cache up_next

install_pnpm:
	@echo "🚧 Installing pnpm..."
	npm install -g pnpm

install:
	@echo "🛠️ Installing..."
	pnpm install --merge-git-branch-lockfiles

deps: install_pnpm install

create_env:
	@echo "🚚 Creating environment variables files .env",
	@cp .env.example .env
	@echo "✅ Environment variables files created successfully!"

PORT ?= 3000

build:
	@echo "🏗️ Building..."
	pnpm build

start:
	@echo "🧜‍ Starting on port $(PORT)..."
	pnpm run start -p $(PORT)

deploy: build start

dev:
	@echo "🧑‍💻 Starting dev server on port $(PORT)..."
	pnpm run dev -p $(PORT)

lint:
	@echo "🧹 Linting..."
	pnpm lint

info:
	@echo "📝 Info..."
	pnpm dlx next info

clean:
	@echo "🗑️ Cleaning..."
	rm -rf node_modules .next
	@echo "✅ Done, start fresh with make install!"

clean_cache: clean
	@echo "🗑️ Cleaning everything..."
	pnpm cache clear --all
	@echo "✅ Done, start fresh with make install (this will take longer)!"

up_next:
	@echo "▲ Updating next..."
	pnpm up next react react-dom eslint-config-next --latest
	@echo "✅ Done, you've updated your next.js version!"
