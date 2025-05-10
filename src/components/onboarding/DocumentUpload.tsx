
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileImage, FileText, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

const DocumentUpload: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [activeTab, setActiveTab] = useState('reports');

  const addDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: activeTab,
        date: new Date().toLocaleDateString(),
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      }));
      
      setDocuments([...documents, ...newFiles]);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Medical Documents</h2>
        <p className="text-muted-foreground mb-4">
          Upload your medical reports, test results, and other health documents.
        </p>
      </div>

      <Tabs 
        defaultValue="reports" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Medical</span> Reports
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Test</span> Results
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-1">
            <FileImage className="w-4 h-4" />
            <span>Images</span>
          </TabsTrigger>
        </TabsList>
        
        {['reports', 'results', 'images'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
              <div className="flex flex-col items-center text-center space-y-4">
                {tabValue === 'images' 
                  ? <FileImage className="h-8 w-8 text-muted-foreground" />
                  : <FileText className="h-8 w-8 text-muted-foreground" />
                }
                <div>
                  <p className="font-medium">
                    Upload {tabValue === 'reports' ? 'Medical Reports' : 
                             tabValue === 'results' ? 'Test Results' : 'Medical Images'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload
                    {tabValue === 'reports' && ' prescriptions, discharge summaries, etc.'}
                    {tabValue === 'results' && ' blood tests, lab reports, etc.'}
                    {tabValue === 'images' && ' X-rays, scans, etc.'}
                  </p>
                </div>
                <Label htmlFor={`upload-${tabValue}`} className="cursor-pointer">
                  <Button className="flex gap-2 items-center">
                    <Upload className="h-4 w-4" /> Choose Files
                  </Button>
                  <Input 
                    id={`upload-${tabValue}`} 
                    type="file" 
                    accept={tabValue === 'images' ? "image/*" : ".pdf,.doc,.docx"} 
                    multiple 
                    className="hidden"
                    onChange={addDocument}
                  />
                </Label>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {documents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Your Uploaded Documents</h3>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
                <SelectItem value="results">Results</SelectItem>
                <SelectItem value="images">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-md divide-y">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className="p-3 flex justify-between items-center hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  {doc.type === 'images' 
                    ? <FileImage className="h-5 w-5 text-primary" /> 
                    : <FileText className="h-5 w-5 text-primary" />
                  }
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-md">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.date} • {doc.size}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeDocument(doc.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
