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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter } from 'react-feather';

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
const sortingOptions = ['default order', 'ascending qubits number', 'descending qubits number'];


function ascending(backend1:Backend, backend2:Backend){
  if(backend1.n_qubits < backend2.n_qubits)
    return -1;
  else if(backend1.n_qubits > backend2.n_qubits)
      return 1;
  return 0;
}

function descending(backend1:Backend, backend2:Backend){
  if(backend1.n_qubits < backend2.n_qubits)
    return 1;
  else if(backend1.n_qubits > backend2.n_qubits)
      return -1;
  return 0;
}

export default function Home() {
  const [selectedVersion, setSelectedVersion] = useState(versionsOptions[0]);
  const [selectedDynamic, setSelectedDynamic] = useState(dynamicOptions[0]);
  const [selectedNumQubits, setSelectedNumQubits] = useState(data.max_qubits);
  const [selectedInstructions, setSelectedInstructions] = useState([...data.all_instructions]);
  const [sortingOrder, setSortingOrder] = useState(sortingOptions[0]);

  let backends_data = [...data.backends];

  switch(sortingOrder){
    case sortingOptions[1]:
      backends_data.sort(ascending);
      break;
    case sortingOptions[2]:
      backends_data.sort(descending);
      break;
    default:
      break;
  }
  backends_data = backends_data.filter((backend:Backend) => selectedVersion == 'all' || parseInt(selectedVersion[1]) == backend.version);
  backends_data = backends_data.filter((backend:Backend) => selectedDynamic == 'all' || (selectedDynamic == 'yes') == backend.is_dynamic);
  backends_data = backends_data.filter((backend:Backend) => backend.n_qubits <= selectedNumQubits);
  backends_data = backends_data.filter((backend:Backend) => (new Set(selectedInstructions)).intersection(new Set(backend.instructions)).size > 0);
  
  return (
    <div className="w-full flex flex-col items-center jutify-center">
      <h1 className="text-4xl font-bold text-center p-10">Qiskit Runtime Fake Backends</h1>

      <div className="w-full flex justify-end items-end p-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="mx-5">
              Filter<Filter/>
            </Button>

          </PopoverTrigger>
          <PopoverContent>
            <div className="flex my-2">
              <Label htmlFor="versions" className="m-2">Version</Label>
              <Select onValueChange={setSelectedVersion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      versionsOptions.map((version:string)=><SelectItem key={version} value={version}>{version}</SelectItem>)
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex my-2">
              <Label htmlFor="dyanmic" className="m-2">Is Dynamic</Label>
              <Select onValueChange={setSelectedDynamic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the dynamic Backend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      dynamicOptions.map((dynamic:string)=><SelectItem key={dynamic} value={dynamic}>{dynamic}</SelectItem>)
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex my-2">
              <Label htmlFor="qubits" className="m-2">Max Number of Qubits</Label>
              <Input 
                type="number" 
                id="qubits" 
                min="1" 
                max={String(data.max_qubits)} 
                defaultValue={String(selectedNumQubits)}
                placeholder="Max Number of qubits" 
                onChange={(event) => setSelectedNumQubits(parseInt(event.target.value) || data.max_qubits)}/>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="instructions">Select Instructions</Label>
              <ToggleGroup type="multiple" onValueChange={setSelectedInstructions} defaultValue={selectedInstructions} className="w-full flex justify-start flex-wrap mt-2">
                {
                  [...data.all_instructions].map((instruction:string) => <ToggleGroupItem key={instruction} value={instruction}>{instruction.toUpperCase()}</ToggleGroupItem>)
                }
              </ToggleGroup>
            </div>
          </PopoverContent>
        </Popover>
        <Select onValueChange={setSortingOrder}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Sorting Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                sortingOptions.map((option:string)=><SelectItem key={option} value={option}>{option}</SelectItem>)
              }                                                     
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Table className="w-11/12" >
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
                <TableCell>{backend.is_dynamic ? "Yes" : "No"}</TableCell>
                <TableCell>{backend.instructions.join(" ")}</TableCell>
              </TableRow>
            ))
          }

        </TableBody>
        <TableCaption>Fake Backends List Data. Check <a href="https://docs.quantum.ibm.com/api/qiskit-ibm-runtime/fake_provider" target="_blank">Qiskit Runtime Providers</a></TableCaption>
      </Table>

    </div>
  );
}
