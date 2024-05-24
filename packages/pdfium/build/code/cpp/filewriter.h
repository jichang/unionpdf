#include <string>
#include "fpdf_save.h"

class PDFiumExtFileWriter : public FPDF_FILEWRITE
{
public:
  PDFiumExtFileWriter();
  ~PDFiumExtFileWriter();

private:
  static int WriteBlockCallback(FPDF_FILEWRITE *pFileWrite,
                                const void *data,
                                unsigned long size);

public:
  std::string data;
};
