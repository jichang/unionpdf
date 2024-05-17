all: dev

clean:
	rm -rf ./src/pdfium.js ./src/pdfium.wasm

.PHONY: build
build:
	make clean
	docker buildx build -o docker .
