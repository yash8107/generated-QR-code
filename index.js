// Import necessary modules
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs/promises';

async function generateQRCode() {
  try {
    // Prompt user for URL input
    const { URL: url } = await inquirer.prompt([
      {
        type: 'input',
        message: 'Enter the URL to generate a QR code:',
        name: 'URL',
        validate: (input) => input.trim() !== '' || 'URL cannot be empty!',
      },
    ]);

    // Generate QR code as a PNG image
    const qrImage = qr.imageSync(url, { type: 'png' });

    // Write QR code image to a file
    await fs.writeFile('qr_img.png', qrImage);

    console.log('QR code generated successfully and saved as qr_img.png');
  } catch (error) {
    // Handle specific errors
    if (error.isTtyError) {
      console.error('Prompt could not be rendered in the current environment.');
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}

// Execute the function
generateQRCode();
