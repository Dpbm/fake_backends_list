import os
import importlib.util
import warnings

warnings.filterwarnings("ignore")

providers = importlib.import_module('qiskit_ibm_runtime.fake_provider')

providers_data = dir(providers)
fake_providers = list(filter(lambda x: 'Fake' in x, providers_data))
callable_list = list(map(lambda x: getattr(providers, x), fake_providers))

if(os.path.exists('index.html')):
    os.system('rm index.html')

with open("index.html", 'a') as file:
    file.write("<h1>Fake Backends</h1>")
    file.write("<table>")
    file.write("<tr>")

    file.write("<th>")
    file.write("Name")
    file.write("</th>")

    file.write("<th>")
    file.write("Backend Version")
    file.write("</th>")

    file.write("<th>")
    file.write("Version(V)")
    file.write("</th>")

    file.write("<th>")
    file.write("Total Qubits")
    file.write("</th>")

    file.write("<th>")
    file.write("Gates")
    file.write("</th>")

    file.write("<th>")
    file.write("Dynamic Circuits")
    file.write("</th>")

    file.write("</tr>")

    for provider in callable_list:
        
        if('configuration' in dir(provider)):
            data = provider().configuration().to_dict()
            name = data['backend_name']
            backend_version = str(data['backend_version'])
            version = str(provider.version if 'version' in dir(provider) else 1)
            n_qubits = str(data['n_qubits'])
            instructions = " ".join(data['basis_gates'])

            print(dir(provider))

            dynamic = str(data['conditional'])
            if('_supports_dynamic_circuits' in dir(provider)):
                dynamic = str(provider()._supports_dynamic_circuits())

            print(name, " ", version, " ", instructions, " ", dynamic)

            file.write("<tr>")

            file.write("<td>")
            file.write(name)
            file.write("</td>")

            file.write("<td>")
            file.write(backend_version)
            file.write("</td>")

            file.write("<td>")
            file.write(version)
            file.write("</td>")

            file.write("<td>")
            file.write(n_qubits)
            file.write("</td>")

            file.write("<td>")
            file.write(instructions)
            file.write("</td>")

            file.write("<td>")
            file.write(dynamic)
            file.write("</td>")



            file.write("</tr>")



  
