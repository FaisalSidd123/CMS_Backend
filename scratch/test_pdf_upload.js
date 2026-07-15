import { uploadToCloudinary } from '../src/utils/cloudinaryUpload.js';
import fs from 'fs';

async function testPdfUpload() {
  // Let's create a minimal valid PDF base64 string
  // This is a standard 1-page blank PDF structure
  const pdfBase64 = "data:application/pdf;base64,JVBERi0xLjMKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUgODQyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA4Cj4+CnN0cmVhbQoKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1NiAwMDAwMCBuIAowMDAwMDAwMTExIDAwMDAwIG4gCjAwMDAwMDAyMDIgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA1Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoyNTkKJSVFT0Y=";

  console.log('--- Testing resource_type: "image" ---');
  const resImage = await uploadToCloudinary(pdfBase64, 'test_invoices', 'image');
  console.log('Result (image):', resImage);

  console.log('--- Testing resource_type: "raw" ---');
  const resRaw = await uploadToCloudinary(pdfBase64, 'test_invoices', 'raw');
  console.log('Result (raw):', resRaw);

  console.log('--- Testing resource_type: "auto" ---');
  const resAuto = await uploadToCloudinary(pdfBase64, 'test_invoices', 'auto');
  console.log('Result (auto):', resAuto);
}

testPdfUpload();
