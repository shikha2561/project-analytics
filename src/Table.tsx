// src/Table.tsx
import React from 'react';
import {Table}  from '@mantine/core';
import { data } from './data';

interface DataEntry {
    Year: string;
    'Crop Name': string;
    'Crop Production (UOM:t(Tonnes))': string | number;
    'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string | number;
    'Area Under Cultivation (UOM:Ha(Hectares))': string | number;
  }

interface TableProps {
  type: 'production' | 'average';
}

const AgricultureTable: React.FC<TableProps> = ({ type }) => {
  const renderProductionTable = () => {
    const productionData: { [year: string]: { maxCrop: string; minCrop: string } } = {};

    data.forEach((entry:DataEntry) => {
        const year = entry['Year'].split(',')[1].trim();
        if (!productionData[year]) {
          productionData[year] = { maxCrop: '', minCrop: '' };
        }
  
        if (!productionData[year].maxCrop || entry['Crop Production (UOM:t(Tonnes))'] > productionData[year].maxCrop) {
          productionData[year].maxCrop = entry['Crop Name'];
        }
  
        if (!productionData[year].minCrop || entry['Crop Production (UOM:t(Tonnes))'] < productionData[year].minCrop) {
          productionData[year].minCrop = entry['Crop Name'];
        }
      });

    return (
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production</Table.Th>
            <Table.Th>Crop with Minimum Production</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.keys(productionData).map((year) => (
            <Table.Tr key={year}>
              <Table.Td>{year}</Table.Td>
              <Table.Td>{productionData[year].maxCrop}</Table.Td>
              <Table.Td>{productionData[year].minCrop}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  };

  const renderAverageTable = () => {
    const cropData: { [crop: string]: { yieldSum: number; areaSum: number; count: number } } = {};

    data.forEach((entry:DataEntry) => {
        if (!entry['Crop Production (UOM:t(Tonnes))']) return;
  
        if (!cropData[entry['Crop Name']]) {
          cropData[entry['Crop Name']] = { yieldSum: 0, areaSum: 0, count: 0 };
        }
  
        cropData[entry['Crop Name']].yieldSum += parseFloat(entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] as string);
        cropData[entry['Crop Name']].areaSum += parseFloat(entry['Area Under Cultivation (UOM:Ha(Hectares))'] as string);
        cropData[entry['Crop Name']].count++;
      });

    return (
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield</Table.Th>
            <Table.Th>Average Cultivation Area</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.keys(cropData).map((crop) => (
            <Table.Tr key={crop}>
              <Table.Td>{crop}</Table.Td>
              <Table.Td>{(cropData[crop].yieldSum / cropData[crop].count).toFixed(3)}</Table.Td>
              <Table.Td>{(cropData[crop].areaSum / cropData[crop].count).toFixed(3)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  };

  return type === 'production' ? renderProductionTable() : renderAverageTable();
};

export { AgricultureTable};
