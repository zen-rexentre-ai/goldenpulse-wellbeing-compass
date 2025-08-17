import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { volunteeringService } from '@/services/volunteeringService';
import { useLanguage } from '@/components/LanguageProvider';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ExcelUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess: () => void;
}

const ExcelUploadDialog: React.FC<ExcelUploadDialogProps> = ({
  open,
  onOpenChange,
  onUploadSuccess
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.includes('spreadsheet') || selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
        setResults(null);
      } else {
        toast({
          title: t("Invalid File Type"),
          description: t("Please select a valid Excel file (.xlsx or .xls)"),
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const result = await volunteeringService.processExcelUpload(file);
      setResults(result);
      
      if (result.processed > 0) {
        toast({
          title: t("Upload Successful"),
          description: t(`${result.processed} opportunities processed successfully`),
        });
        onUploadSuccess();
      }
    } catch (error: any) {
      toast({
        title: t("Upload Failed"),
        description: error.message || t("An error occurred during upload"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setResults(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            {t("Upload Volunteering Opportunities")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t("Excel file should contain columns: title, organization, category, coordinator_name, coordinator_email, date, time, location, total_spots")}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="excel-file">{t("Select Excel File")}</Label>
            <Input
              id="excel-file"
              type="file"
              accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={handleFileChange}
            />
          </div>

          {file && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round(file.size / 1024)} KB)
                </span>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-2">{t("Upload Results")}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-green-600">{t("Processed")}: {results.processed}</p>
                  {results.errors.length > 0 && (
                    <p className="text-red-600">{t("Errors")}: {results.errors.length}</p>
                  )}
                </div>
              </div>

              {results.successful.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-green-600">{t("Successfully Added")}:</h5>
                  <div className="max-h-32 overflow-y-auto text-xs space-y-1">
                    {results.successful.map((item: string, index: number) => (
                      <div key={index} className="text-green-600">• {item}</div>
                    ))}
                  </div>
                </div>
              )}

              {results.errors.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-red-600">{t("Errors")}:</h5>
                  <div className="max-h-32 overflow-y-auto text-xs space-y-1">
                    {results.errors.map((error: string, index: number) => (
                      <div key={index} className="text-red-600">• {error}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              {t("Close")}
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  {t("Uploading...")}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {t("Upload")}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelUploadDialog;