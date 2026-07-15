import { supabase } from '../src/config/db.js';
import cloudinary from '../src/config/cloudinary.js';

async function testRawPdfExtension() {
  const pdfBase64 = "data:application/pdf;base64,JVBERi0xLjMKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUgODQyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA4Cj4+CnN0cmVhbQoKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1NiAwMDAwMCBuIAowMDAwMDAwMTExIDAwMDAwIG4gCjAwMDAwMDAyMDIgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA1Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoyNTkKJSVFT0Y=";

  try {
    const result = await cloudinary.uploader.upload(pdfBase64, {
      folder: 'test_invoices_ext',
      resource_type: 'raw',
      public_id: `Vanguard_Invoice_Test_${Date.now()}.pdf`
    });
    console.log('Upload success! URL:', result.secure_url);
  } catch (err) {
    console.error('Upload failed:', err.message);
  }
}

testRawPdfExtension();
