import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from 'lodash';
import { fetchTrainings } from './api';
import { Training } from './types';

export default function StatisticsPage() {
  const [chartData, setChartData] = useState<{ name: string; duration: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTrainings = async () => {
    try {
      const data = await fetchTrainings();
      if (data._embedded && data._embedded.trainings) {
        const trainings: Training[] = data._embedded.trainings;
        const groupedData = _.groupBy(trainings, 'activity');
        const aggregatedData = Object.keys(groupedData).map((activity) => ({
          name: activity,
          duration: _.sumBy(groupedData[activity], 'duration'),
        }));
        setChartData(aggregatedData);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Training Statistics</h1>
      <BarChart
        width={600}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </div>
  );
}