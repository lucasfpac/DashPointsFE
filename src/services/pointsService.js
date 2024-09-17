import axios from 'axios';

const API_URL = 'https://lucasfortunato.com.br/api';

// Fetch all points
export const getPoints = () => {
  return axios.get(`${API_URL}/points/`);
};

// Add a new point
export const addPoint = (pointData) => {
  return axios.post(`${API_URL}/points/`, pointData);
};

// Download voucher PDF by voucher ID
export const downloadVoucher = async (voucherId) => {
  try {
    const response = await axios.get(`${API_URL}/voucher/pdf/${voucherId}/`, {
      responseType: 'blob', // Ensures the response is a Blob (binary data for the PDF)
    });

    // Create a URL for the downloaded PDF file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `voucher_${voucherId}.pdf`); // Set filename
    document.body.appendChild(link);
    link.click(); // Trigger the download
    link.remove(); // Clean up the DOM after download

  } catch (error) {
    console.error('Error downloading voucher:', error);
    throw error;
  }
};
