
#include <string>
#include <emscripten.h>
#include <string.h>
#include "fpdf_save.h"
#include "filewriter.h"

PDFiumExtFileWriter::PDFiumExtFileWriter()
{
  FPDF_FILEWRITE::version = 1;
  FPDF_FILEWRITE::WriteBlock = WriteBlockCallback;
}

PDFiumExtFileWriter::~PDFiumExtFileWriter()
{
}

int PDFiumExtFileWriter::WriteBlockCallback(FPDF_FILEWRITE *pFileWrite,
                                            const void *data,
                                            unsigned long size)
{
  PDFiumExtFileWriter *pThis = static_cast<PDFiumExtFileWriter *>(pFileWrite);

  pThis->data.append(static_cast<const char *>(data), size);

  return size;
}
