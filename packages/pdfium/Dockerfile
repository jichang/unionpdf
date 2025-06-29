# syntax=docker/dockerfile-upstream:master-labs

# Base emsdk image with environment variables.
FROM emscripten/emsdk:4.0.10 AS emsdk-base

ARG DEBIAN_FRONTEND=noninteractive

ARG EXTRA_CFLAGS
ARG EXTRA_LDFLAGS
ENV INSTALL_DIR=/opt
ENV CFLAGS="-I$INSTALL_DIR/include $CFLAGS $EXTRA_CFLAGS"
ENV CXXFLAGS="$CFLAGS"
ENV LDFLAGS="-L$INSTALL_DIR/lib $LDFLAGS $CFLAGS $EXTRA_LDFLAGS"
ENV EM_PKG_CONFIG_PATH=$INSTALL_DIR/lib/pkgconfig:/emsdk/upstream/emscripten/system/lib/pkgconfig
ENV EM_TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake
ENV PKG_CONFIG_PATH=$PKG_CONFIG_PATH:$EM_PKG_CONFIG_PATH
RUN apt-get update && \
      apt-get install -y pkg-config autoconf automake libtool ragel git yasm subversion lsb-release tzdata

RUN echo "America/Sao_Paulo" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
RUN /bin/echo -e "LANG=\"en_US.UTF-8\"" > /etc/default/local

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y keyboard-configuration

FROM emsdk-base AS node-setup
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

FROM node-setup AS depot-tools
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git -b main /opt/depot-tools
ENV PATH=${PATH}:/opt/depot-tools

FROM depot-tools AS pdfium-src
WORKDIR /build
RUN gclient config --unmanaged https://pdfium.googlesource.com/pdfium.git
RUN gclient sync -r origin/chromium/7267 --no-history --shallow

FROM pdfium-src AS pdfium-deps
RUN bash -x ./pdfium/build/install-build-deps.sh --no-prompt

FROM pdfium-deps AS pdfium-patch
COPY build/patch/BUILD.gn /build/pdfium/BUILD.gn
COPY build/patch/build/config/BUILDCONFIG.gn /build/pdfium/build/config/BUILDCONFIG.gn
# Update the emscripten_path in pdfium/build/toolchain/wasm/BUILD.gn
RUN sed -i "s|emscripten_path = \"//third_party/emsdk/upstream/emscripten/\"|emscripten_path = \"$EMSDK/upstream/emscripten/\"|g" /build/pdfium/build/toolchain/wasm/BUILD.gn
# Add extra compiler flags right before toolchain_args
RUN sed -i '/toolchain_args = {/i\  extra_cflags = "-fno-stack-protector -Wno-unknown-warning-option -D_POSIX_C_SOURCE=200112"\n  extra_cxxflags = "-fno-stack-protector -Wno-unknown-warning-option -D_POSIX_C_SOURCE=200112"' /build/pdfium/build/toolchain/wasm/BUILD.gn

COPY build/patch/core/fxge/BUILD.gn /build/pdfium/core/fxge/BUILD.gn

FROM pdfium-patch AS pdfium-compile
WORKDIR /build/pdfium
RUN rm -rf out/prod
RUN gn gen out/prod --args='is_debug=false treat_warnings_as_errors=false pdf_use_skia=false pdf_enable_xfa=false pdf_enable_v8=false is_component_build=false clang_use_chrome_plugins=false pdf_is_standalone=true use_debug_fission=false use_custom_libcxx=false use_sysroot=false pdf_is_complete_lib=true pdf_use_partition_alloc=false is_clang=false symbol_level=0'
RUN echo 'target_os="emscripten"' >> out/prod/args.gn
RUN echo 'target_cpu="wasm"' >> out/prod/args.gn
RUN ninja -C out/prod pdfium -v

FROM pdfium-compile AS pdfium-wasm
RUN mkdir /build/wasm
COPY build/code/cpp/*.h /build/wasm/
COPY build/code/cpp/*.cpp /build/wasm/
COPY build/compile.sh /build/wasm/compile.sh
COPY build/exported-runtime-methods.txt /build/wasm/exported-runtime-methods.txt
COPY build/exported-functions.txt /build/wasm/exported-functions.txt
WORKDIR /build/wasm
RUN bash -E /build/wasm/compile.sh

FROM scratch AS exportor
COPY --from=pdfium-wasm /build/wasm /dist
COPY --from=pdfium-wasm /build/pdfium/public /dist/pdifum
COPY --from=pdfium-wasm /emsdk/upstream/emscripten/cache/sysroot/include /dist/emscripten
