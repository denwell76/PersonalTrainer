import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from 'ag-grid-community';
import { Customer } from './types';
import { fetchCustomers, deleteCustomer } from './api';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import AddTraining from './components/AddTraining';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCustomers = async () => {
    try {
      const data = await fetchCustomers();
      if (data._embedded && data._embedded.customers) {
        setCustomers(data._embedded.customers);
      } else {
        console.error('Unexpected API response structure:', data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (params: ICellRendererParams) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(params.data._links.self.href);
        refreshCustomers();
      } catch (err) {
        console.error('Error deleting customer:', err);
      }
    }
  };

  useEffect(() => {
    refreshCustomers();
  }, []);

  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: 'firstname', headerName: 'First Name', filter: true, width: 140 },
    { field: 'lastname', headerName: 'Last Name', filter: true, width: 150 },
    { field: 'streetaddress', headerName: 'Address', filter: true, width: 150 },
    { field: 'postcode', headerName: 'Postcode', filter: true, width: 150 },
    { field: 'city', headerName: 'City', filter: true, width: 150 },
    { field: 'email', headerName: 'Email', filter: true, width: 150 },
    { field: 'phone', headerName: 'Phone', filter: true, width: 150 },
    {
      headerName: 'Edit',
      width: 90,
      cellRenderer: (params: ICellRendererParams) => (
        <EditCustomer data={params.data} fetchCustomers={refreshCustomers} />
      ),
    },
    {
      headerName: 'Delete',
      width: 110,
      cellRenderer: (params: ICellRendererParams) => (
        <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params)}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      headerName: 'Add',
      width: 150,
      cellRenderer: (params: ICellRendererParams) => (
        <AddTraining customerLink={params.data._links.self.href} fetchTrainings={refreshCustomers} />
      ),
    },
  ]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer List</h1>
      <AddCustomer fetchCustomers={refreshCustomers} />
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}