import { container } from "tsyringe";

import "./providers";

import { IPessoasRepository, IPessoasEnderecosRepository, IPessoasTelefonesRepository } from "@/modules/pessoas/repositories";
import { PessoasRepository, PessoasEnderecosRepository, PessoasTelefonesRepository } from "@/modules/pessoas/infra/typeorm/repositories";
import { IUsersTokenRepository } from "@/modules/auth/repositories/IUsersTokenRepository";
import { UsersTokenRepository } from "@/modules/auth/infra/typeorm/repositories/UsersTokenRepository";


container.registerSingleton<IPessoasRepository>("PessoasRepository", PessoasRepository);
container.registerSingleton<IPessoasEnderecosRepository>("PessoasEnderecosRepository", PessoasEnderecosRepository);
container.registerSingleton<IPessoasTelefonesRepository>("PessoasTelefonesRepository", PessoasTelefonesRepository);

container.registerSingleton<IUsersTokenRepository>("UsersTokenRepository", UsersTokenRepository);
