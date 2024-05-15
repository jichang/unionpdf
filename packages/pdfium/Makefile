all: dev

clean:
	rm -rf ./src/pdfium.js ./src/pdifum.wasm

.PHONY: build
build:
	make clean
	docker buildx build -o ./docker .
