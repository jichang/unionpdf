all: dev

MT_FLAGS := -sUSE_PTHREADS -pthread

DEV_ARGS := --progress=plain

DEV_CFLAGS := $(MT_FLAGS)
PROD_CFLAGS := -O3 -msimd128 $(MT_FLAGS)

clean:
	rm -rf ./src/pdfium.js ./src/pdifum.wasm

.PHONY: build
build:
	make clean
	EXTRA_CFLAGS="$(EXTRA_CFLAGS)" \
	EXTRA_LDFLAGS="$(EXTRA_LDFLAGS)" \
	docker buildx build \
		--build-arg EXTRA_CFLAGS \
		--build-arg EXTRA_LDFLAGS \
		-o ./docker \
		$(EXTRA_ARGS) \
		.

dev:
	make build EXTRA_CFLAGS="$(DEV_CFLAGS)" EXTRA_ARGS="$(DEV_ARGS)"

prd:
	make build EXTRA_CFLAGS="$(PROD_CFLAGS)"