import apiService from './api';

export interface UploadDocumentRequest {
  file: File;
  applicationId: string;
  documentType: string;
  uploadedBy: string;
}

class DocumentService {
  async uploadDocument({ file, applicationId, documentType, uploadedBy }: UploadDocumentRequest) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('applicationId', applicationId);
    formData.append('documentType', documentType);
    formData.append('uploadedBy', uploadedBy);
    return apiService.upload('/documents/upload', formData);
  }
}

export default new DocumentService();
