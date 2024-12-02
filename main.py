import os
import json
import importlib.util
import warnings

warnings.filterwarnings("ignore")

TARGET_JSON_FILE = "providers.json"

providers = importlib.import_module('qiskit_ibm_runtime.fake_provider')

providers_data = dir(providers)
fake_providers = list(filter(lambda x: 'Fake' in x, providers_data))
callable_list = list(map(lambda x: getattr(providers, x), fake_providers))

with open(TARGET_JSON_FILE, 'w', encoding='utf-8') as file:
    backends_data = []
    for provider in callable_list:
        
        if('configuration' in dir(provider)):
            data = provider().configuration().to_dict()
            name = data['backend_name']
            version = provider.version if 'version' in dir(provider) else 1
            n_qubits = data['n_qubits']
            instructions = data['basis_gates']

            dynamic = data['conditional']
            if('_supports_dynamic_circuits' in dir(provider)):
                dynamic = provider()._supports_dynamic_circuits()
            
            backend_data = {
              "name":name,
              "version":version,
              "n_qubits":n_qubits,
              "instructions":instructions,
              "is_dynamic":dynamic
            }

            backends_data.append(backend_data)
    json.dump(backends_data, file, ensure_ascii=False, indent=4)
             
