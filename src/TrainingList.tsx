import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import { Training } from './types';
import { fetchTrainings, fetchCustomerByUrl } from './api';
import dayjs from 'dayjs';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTrainings = async () => {
    try {
      const data = await fetchTrainings();
      if (data._embedded && data._embedded.trainings) {
        const trainingData = data._embedded.trainings;
        const syncData = await Promise.all(
          trainingData.map(async (training: any) => {
            if (training._links && training._links.customer) {
              const customer = await fetchCustomerByUrl(training._links.customer.href);
              return { ...training, customer };
            }
            return { ...training, customer: null };
          })
        );
        setTrainings(syncData);
      } else {
        console.error('Unexpected API response:', data);
      }
    } catch (error) {
      console.error('Error fetching trainings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTrainings();
  }, []);

  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: 'activity', headerName: 'Activity', filter: true },
    {
      field: 'date',
      headerName: 'Date',
      filter: true,
      valueGetter: (params) =>
        params.data?.date ? dayjs(params.data.date).format('YYYY-MM-DD--HH:mm') : 'N/A',
    },
    { field: 'duration', headerName: 'Duration (minutes)', filter: true },
    {
      headerName: 'Customer',
      valueGetter: (params) =>
        params.data?.customer
          ? `${params.data.customer.firstname} ${params.data.customer.lastname}`
          : 'N/A',
    },
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Training List</h1>
      <div className="ag-theme-alpine" style={{ height: 500, width: '90%' }}>
        <AgGridReact rowData={trainings} columnDefs={columnDefs} domLayout="autoHeight" />
      </div>
    </div>
  );
}