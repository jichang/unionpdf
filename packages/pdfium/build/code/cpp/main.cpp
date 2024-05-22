#include "fpdfview.h"
#include "fpdf_formfill.h"
#include <emscripten.h>
#include "filewriter.h"
#include "string.h"

#ifdef __cplusplus
extern "C"
{
#endif

    EMSCRIPTEN_KEEPALIVE void PDFium_Init();

    EMSCRIPTEN_KEEPALIVE void *PDFium_OpenFileWriter();
    EMSCRIPTEN_KEEPALIVE int PDFium_GetFileWriterSize(void *writer);
    EMSCRIPTEN_KEEPALIVE int PDFium_GetFileWriterData(void *writer, void *buffer, int size);
    EMSCRIPTEN_KEEPALIVE void PDFium_CloseFileWriter(void *writer);

    EMSCRIPTEN_KEEPALIVE void *PDFium_OpenFormFillInfo();
    EMSCRIPTEN_KEEPALIVE void PDFium_CloseFormFillInfo(void *form_fill_info);
    EMSCRIPTEN_KEEPALIVE void *PDFium_InitFormFillEnvironment(void *document, void *form_fill_info);
    EMSCRIPTEN_KEEPALIVE void PDFium_ExitFormFillEnvironment(void *form_handle);

    EMSCRIPTEN_KEEPALIVE bool PDFium_SaveAsCopy(void *document, void *writer);

#ifdef __cplusplus
}
#endif

void PDFium_Init()
{
    FPDF_LIBRARY_CONFIG config;
    config.version = 3;
    config.m_pUserFontPaths = nullptr;
    config.m_pIsolate = nullptr;
    config.m_v8EmbedderSlot = 0;
    config.m_pPlatform = nullptr;

    FPDF_InitLibraryWithConfig(&config);
}

void *PDFium_OpenFileWriter()
{
    return new PDFiumFileWriter();
}

int PDFium_GetFileWriterSize(void *writer)
{
    return static_cast<PDFiumFileWriter *>(writer)->data.length();
}

int PDFium_GetFileWriterData(void *writer, void *buffer, int size)
{
    std::string data = static_cast<PDFiumFileWriter *>(writer)->data;
    strncpy(static_cast<char *>(buffer), data.c_str(), size);
    debug_writer(static_cast<PDFiumFileWriter *>(writer)->data.length(), size);
    return size;
}

void PDFium_CloseFileWriter(void *writer)
{
    delete static_cast<PDFiumFileWriter *>(writer);
}

void *PDFium_OpenFormFillInfo()
{
    FPDF_FORMFILLINFO *form_fill_info = new FPDF_FORMFILLINFO();
    form_fill_info->version = 1;
    form_fill_info->Release = nullptr;
    form_fill_info->m_pJsPlatform = nullptr;

    return form_fill_info;
}

void PDFium_CloseFormFillInfo(void *form_fill_info)
{
    delete static_cast<FPDF_FORMFILLINFO *>(form_fill_info);
}

void *PDFium_InitFormFillEnvironment(void *document, void *form_fill_info)
{
    return FPDFDOC_InitFormFillEnvironment(static_cast<FPDF_DOCUMENT>(document), static_cast<FPDF_FORMFILLINFO *>(form_fill_info));
}

void PDFium_ExitFormFillEnvironment(void *form_handle)
{
    FPDFDOC_ExitFormFillEnvironment(static_cast<FPDF_FORMHANDLE>(form_handle));
}

bool PDFium_SaveAsCopy(void *document, void *writer)
{
    return FPDF_SaveAsCopy(static_cast<FPDF_DOCUMENT>(document), static_cast<PDFiumFileWriter *>(writer), FPDF_INCREMENTAL);
}
