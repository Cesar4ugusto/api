import { container } from "tsyringe";

import { Auth, LibGeral, Mail, Storage } from "./Libraries";
import { IAuth, ILibGeral, IMail, IStorage } from "./Interface";

container.registerSingleton<IAuth>("Auth", Auth);
container.registerSingleton<ILibGeral>("Library", LibGeral);
container.registerSingleton<IMail>("Mail", Mail);
container.registerSingleton<IStorage>("Storage", Storage);
