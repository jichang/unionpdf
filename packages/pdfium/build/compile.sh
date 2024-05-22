em++ $(ls *.cpp) \
  /build/pdfium/out/prod/obj/libpdfium.a \
  -g \
  -v \
  -sEXPORT_ES6=1 \
  -sENVIRONMENT=worker \
  -sMODULARIZE=1 \
  -sWASM=1 \
  -sALLOW_MEMORY_GROWTH=1 \
  -sEXPORT_NAME=createPdfium \
  -sUSE_ZLIB=1 \
  -sUSE_LIBJPEG=1 \
  -sASSERTIONS=1 \
  -sEXPORTED_RUNTIME_METHODS=$(cat ./exported-runtime-methods.txt) \
  -sEXPORTED_FUNCTIONS=$(cat ./exported-functions.txt) \
  -lpdfium \
  -L/build/pdfium/out/prod/obj \
  -I/build/pdfium/public \
  -std=c++11 \
  -Wall \
  --no-entry \
  -o \
  ./pdfium.js
