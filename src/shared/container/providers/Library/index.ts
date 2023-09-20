import { container } from "tsyringe";

import { LibGeral } from "./implementations/LibGeral";
import { Storage } from "./implementations/Storage";
import { Auth } from "./implementations/Auth";
import { Mail } from "./implementations/Mail";

import { IAuth, ILibGeral, IMail, IStorage } from "./Interface";

container.registerSingleton<IAuth>("Auth", Auth);
container.registerSingleton<ILibGeral>("Library", LibGeral);
container.registerSingleton<IMail>("Mail", Mail);
container.registerSingleton<IStorage>("Storage", Storage);
