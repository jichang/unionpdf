#include <string>
#include "fpdf_save.h"

class PDFiumFileWriter : public FPDF_FILEWRITE
{
public:
  PDFiumFileWriter();
  ~PDFiumFileWriter();

private:
  static int WriteBlockCallback(FPDF_FILEWRITE *pFileWrite,
                                const void *data,
                                unsigned long size);

public:
  std::string data;
};
