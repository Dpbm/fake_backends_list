'use client';

import {useState} from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import data from './providers.json';

type Backend = {
  name:string;
  version:number;
  n_qubits:number;
  is_dynamic:boolean;
  instructions: string[];
}

const versionsOptions = ['all', 'v1', 'v2'];
const dynamicOptions = ['all', 'yes', 'no'];

export default function Home() {
  const [selectedVersion, setSelectedVersion] = useState(versionsOptions[0]);
  const [selectedDynamic, setSelectedDynamic] = useState(dynamicOptions[0]);

  let backends_data = data;
  backends_data = backends_data.filter((backend:Backend) => selectedVersion == 'all' || parseInt(selectedVersion[1]) == backend.version);
  backends_data = backends_data.filter((backend:Backend) => selectedDynamic == 'all' || (selectedDynamic == 'yes') == backend.is_dynamic);

  return (
    <>
      <h1>Qiskit Runtime Fake Backends</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>version</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            versionsOptions.map((option:string) => 
              <DropdownMenuCheckboxItem 
                key={option} 
                checked={option == selectedVersion} 
                onCheckedChange={() => setSelectedVersion(option)}>
                {option}
              </DropdownMenuCheckboxItem>
            )
          }
        </DropdownMenuContent>
      </DropdownMenu>      

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>dynamic?</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            dynamicOptions.map((option:string) => 
              <DropdownMenuCheckboxItem 
                key={option} 
                checked={option == selectedDynamic} 
                onCheckedChange={() => setSelectedDynamic(option)}>
                {option}
              </DropdownMenuCheckboxItem>
            )
          }
        </DropdownMenuContent>
      </DropdownMenu>      

      <Table>
        <TableCaption>Fake Backends List Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Num Qubits</TableHead>
            <TableHead>Is Dynamic</TableHead>
            <TableHead>Instructions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            backends_data.map((backend:Backend, index:number) => (
              <TableRow key={index}>
                <TableCell>{backend.name}</TableCell>
                <TableCell>{backend.version}</TableCell>
                <TableCell>{backend.n_qubits}</TableCell>
                <TableCell>{String(backend.is_dynamic)}</TableCell>
                <TableCell>{backend.instructions.join(" ")}</TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>

    </>
  );
}
