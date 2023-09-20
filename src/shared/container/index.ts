import { container } from "tsyringe";

import "./providers/Library";

import { IPessoasRepository, IPessoasEnderecosRepository, IPessoasTelefonesRepository } from "@/modules/pessoas/repositories";
import { PessoasRepository, PessoasEnderecosRepository, PessoasTelefonesRepository } from "@/modules/pessoas/infra/typeorm/repositories";


container.registerSingleton<IPessoasRepository>("PessoasRepository", PessoasRepository);
container.registerSingleton<IPessoasEnderecosRepository>("PessoasEnderecosRepository", PessoasEnderecosRepository);
container.registerSingleton<IPessoasTelefonesRepository>("PessoasTelefonesRepository", PessoasTelefonesRepository);
