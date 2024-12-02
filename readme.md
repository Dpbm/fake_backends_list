# Qiskit Fake Backends List

Since I started using Qiskit for my quantum projects, I'd always struggled when choosing which fake backend should I use for my case.

To solve that, I mapped all fake backends available on qiskit runtime and created this table listing everything you may want to know.

## Building

If you want to build this project by your own you'll need:

* python 3.10
* nodejs 23.0.0 

Then you need to follow these two steps:

1. get data from Qiskit

This part, you'll build the database for the application, so install all python dependencies and run the python script:

```bash
# install
# pip
pip install -r requirements.txt
# or mamba/conda
mamba env create -f environment.yml
mamba activate providers
# or conda-lock
conda-lock install -n providers conda-lock.yml
mamba activate providers

# run the script
python main.py
```

2. run the web application

After retrieving the data from Qiskit, you're ready to run the nextjs website. To do that, go to the `backends-list` directory and run:

```bash
cd backends-list
pnpm install

# for dev
pnpm dev

# for production
pnpm build && pnpm start
```
