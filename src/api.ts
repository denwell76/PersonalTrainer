const API_BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
};

export const fetchCustomers = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

export const addCustomer = async (customer: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  return handleResponse(response);
};

export const updateCustomer = async (url: string, customer: any): Promise<any> => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  return handleResponse(response);
};

export const deleteCustomer = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};


export const fetchTrainings = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/trainings`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

export const addTraining = async (training: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/trainings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(training),
  });
  return handleResponse(response);
};


export const fetchCustomerByUrl = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};