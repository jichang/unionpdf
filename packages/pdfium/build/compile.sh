em++ wasm.cpp \
  /build/pdfium/out/prod/obj/libpdfium.a \
  -O2 \
  -sEXPORT_ES6=1 \
  -sENVIRONMENT=worker \
  -sWASM_BIGINT \
  -sMODULARIZE=1 \
  -sWASM=1 \
  -sALLOW_MEMORY_GROWTH=1 \
  -sEXPORT_NAME=createPdfium \
  -sUSE_ZLIB=1 \
  -sUSE_LIBJPEG=1 \
  -sASSERTIONS=1 \
  -sEXPORTED_RUNTIME_METHODS=$(cat /build/exported-runtime-methods.txt) \
  -sEXPORTED_FUNCTIONS=$(cat /build/exported-functions.txt) \
  -I/build/pdfium/public \
  -L/build/pdfium/out/prod/obj \
  -std=c++11 \
  -Wall \
  --no-entry \
  -o \
  ./pdfium.js
