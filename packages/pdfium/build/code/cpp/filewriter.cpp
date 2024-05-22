
#include <string>
#include <emscripten.h>
#include <string.h>
#include "fpdf_save.h"
#include "filewriter.h"

PDFiumFileWriter::PDFiumFileWriter()
{
  FPDF_FILEWRITE::version = 1;
  FPDF_FILEWRITE::WriteBlock = WriteBlockCallback;
}

PDFiumFileWriter::~PDFiumFileWriter()
{
}

int PDFiumFileWriter::WriteBlockCallback(FPDF_FILEWRITE *pFileWrite,
                                         const void *data,
                                         unsigned long size)
{
  PDFiumFileWriter *pThis = static_cast<PDFiumFileWriter *>(pFileWrite);

  pThis->data.append(static_cast<const char *>(data), size);

  debug_log(size);

  return 1;
}
